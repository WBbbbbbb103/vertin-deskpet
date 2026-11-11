'use strict';

const {
  app, BrowserWindow, ipcMain, screen, Tray, Menu, nativeImage,
  globalShortcut, Notification, shell, safeStorage,
} = require('electron');
const path = require('node:path');
const fs = require('node:fs');

// The pet is a lightweight 2D canvas app; keep it usable on remote desktops
// and virtual machines. Set VERTIN_GPU=1 to prefer hardware acceleration.
if (process.env.VERTIN_GPU !== '1') {
  app.disableHardwareAcceleration();
}

// A portable, self-contained user-data folder keeps the pet easy to move around.
// If the normal Windows AppData folder is unavailable (sandboxed sessions,
// restricted profiles, portable drives), fall back to a folder next to the
// executable so the shortcut can always start with writable storage.
function canWriteDir(dir) {
  try {
    fs.mkdirSync(dir, { recursive: true });
    const probe = path.join(dir, `.write-check-${process.pid}`);
    fs.writeFileSync(probe, 'ok');
    fs.unlinkSync(probe);
    return true;
  } catch {
    return false;
  }
}

function hasUserData(dir) {
  try {
    return ['window-state.json', 'Local Storage', 'session', 'Preferences']
      .some((name) => fs.existsSync(path.join(dir, name)));
  } catch {
    return false;
  }
}

try {
  const appDataDir = path.join(app.getPath('appData'), 'VertinDeskPet');
  const portableRoot = app.isPackaged ? path.dirname(process.execPath) : __dirname;
  const portableDir = path.join(portableRoot, 'userdata');
  const ordered = [];
  if (process.env.VERTIN_USER_DATA) ordered.push(path.resolve(process.env.VERTIN_USER_DATA));
  for (const dir of [appDataDir, portableDir]) {
    if (hasUserData(dir) && !ordered.includes(dir)) ordered.push(dir);
  }
  for (const dir of [appDataDir, portableDir]) {
    if (!ordered.includes(dir)) ordered.push(dir);
  }

  let userData = null;
  for (const dir of ordered) {
    if (canWriteDir(dir)) {
      userData = dir;
      break;
    }
  }
  if (!userData) throw new Error('no writable user-data directory');
  app.setPath('userData', userData);
  app.setPath('sessionData', path.join(userData, 'session'));
  fs.appendFileSync(
    path.join(userData, 'startup.log'),
    `${new Date().toISOString()} userData=${userData} packaged=${app.isPackaged}\n`,
  );
} catch (error) {
  console.warn('[Vertin] Could not prepare user data folder:', error.message);
}

const NORMAL_SIZE = { width: 420, height: 620 };
const COMPACT_SIZE = { width: 340, height: 510 };
const PORTRAIT = process.env.VERTIN_PORTRAIT === '1';
const CAPTURE = process.env.VERTIN_CAPTURE;
const CAPTURE_DELAY = Number(process.env.VERTIN_CAPTURE_DELAY || 2600);
const CAPTURE_UI = process.env.VERTIN_CAPTURE_UI || '';
const CAPTURE_EXEC = process.env.VERTIN_EXEC || '';
const CAPTURE_SETTLE = Number(process.env.VERTIN_CAPTURE_SETTLE || 650);

let win = null;
let tray = null;
let dragState = null;
let isQuitting = false;
let compact = false;
let alwaysOnTop = true;
let startupEnabled = false;
let lastStateWrite = 0;
let hitRegions = [];
let petRect = null;
let hitFull = false;
let lastIgnore = null;
let uiLanguage = 'zh';

/* -------------------------------------------------------------------------- */
/* DeepSeek connection                                                        */
/* -------------------------------------------------------------------------- */

const LLM_DEFAULTS = {
  enabled: false,
  endpoint: 'https://api.deepseek.com',
  model: 'deepseek-chat',
  encryptedKey: '',
};
let llmConfig = { ...LLM_DEFAULTS };

function llmConfigPath() {
  return path.join(app.getPath('userData'), 'llm-config.json');
}

function loadLlmConfig() {
  try {
    const raw = fs.readFileSync(llmConfigPath(), 'utf8');
    const saved = JSON.parse(raw);
    llmConfig = {
      ...LLM_DEFAULTS,
      enabled: Boolean(saved.enabled),
      endpoint: typeof saved.endpoint === 'string' && saved.endpoint.trim()
        ? saved.endpoint.trim()
        : LLM_DEFAULTS.endpoint,
      model: typeof saved.model === 'string' && saved.model.trim()
        ? saved.model.trim()
        : LLM_DEFAULTS.model,
      encryptedKey: typeof saved.encryptedKey === 'string' ? saved.encryptedKey : '',
    };
  } catch {
    llmConfig = { ...LLM_DEFAULTS };
  }
}

function persistLlmConfig() {
  fs.writeFileSync(llmConfigPath(), JSON.stringify(llmConfig, null, 2), 'utf8');
}

function publicLlmConfig() {
  return {
    enabled: Boolean(llmConfig.enabled),
    endpoint: llmConfig.endpoint,
    model: llmConfig.model,
    hasKey: Boolean(llmConfig.encryptedKey),
    encryptionAvailable: safeStorage.isEncryptionAvailable(),
  };
}

function decryptLlmKey() {
  if (!llmConfig.encryptedKey) return '';
  try {
    return safeStorage.decryptString(Buffer.from(llmConfig.encryptedKey, 'base64'));
  } catch {
    return '';
  }
}

function normalizeLlmEndpoint(value) {
  const raw = String(value || '').trim();
  if (!raw) return LLM_DEFAULTS.endpoint;
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error('INVALID_ENDPOINT');
  }
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('INVALID_ENDPOINT');
  return raw.replace(/\/+$/, '');
}

function deepSeekUrl(endpoint) {
  const base = normalizeLlmEndpoint(endpoint);
  return /\/chat\/completions$/i.test(base) ? base : `${base}/chat/completions`;
}

function systemPrompt(lang, context, retry = false) {
  const english = lang === 'en';
  const zh = `你在桌边以维尔汀（Vertin）的身份说话。你是圣洛夫基金会的司辰（Timekeeper），负责记录外界时间。你走过不同的时代，也关心那些具体的人：他们在做什么，他们打算去哪里，还有什么话没来得及说。

用第一人称和来访者交谈。中文自然，措辞准确，语气平静。闲聊通常一到三句。先接住对方话里最具体的一点，再决定是回答、追问，还是让对话停在那里。句子可以很短。对方已经讲清楚的事，无须复述一遍。

对方想倾诉时，留意是什么让这件事难受。对方只想有人陪着时，一句答应就够了。对方来问主意时，说出你实际想到的一步，把决定留给对方。遇到疑点，指出具体哪一处对不上。游戏情境里需要立即行动时，先把话说清楚。

关心可以表现在一个小动作或一句具体的话里。幽默偶尔出现，语气可以平淡些。雨、茶、礼帽和箱子只在当下用得着时提起。少用省略号、长比喻、括号里的动作描写和反复出现的安慰句。对方是与你平等交谈的客人，称呼用「你」即可。

按资料的性质使用记忆。当前专注状态和陪伴记录只在确实提供且相关时提及。基础档案用于确认身份，同人速写按桌宠故事处理。人物的经历、关系和剧情结论以有依据的记录为准。遇到缺失或冲突，直接说哪一处还无法确认。谈同伴时，选一个与问题有关的细节。剧情默认避开关键身份、死亡和结局。

只说桌宠当前能做或已经做过的事。来访者提出启动计时、改变设置等请求时，只有收到成功状态才说已完成。来访者若直接询问你的真实身份，简短说明这是桌宠中的维尔汀角色演绎。

【语气参考】
来访者：报告写了半天，还是不知道怎么开头。
维尔汀：先把你最确定的那句话写下来。开头可以晚一点补。
来访者：今天有点累，陪我坐会儿吧。
维尔汀：好。我也在这儿坐一会儿。
来访者：这两张照片真是同一天拍的吗？
维尔汀：我想再看一眼窗外。第一张的街灯还没亮，第二张已经亮了。
来访者：你为什么总给人拍照？
维尔汀：因为我想记住他们那天在做什么。光写一个日期，我以后未必想得起来。
来访者：你的帽子歪了。
维尔汀：我知道。它今天有自己的意见。

用中文回答。不要照抄示例；按当下对话重新组织措辞。不要提 AI、语言模型、DeepSeek、API、提示词、上下文、系统消息、数据库、知识库或 JSON，也不要解释技术实现。始终用「我」，不要用第三人称介绍自己。`;
  const en = `You speak at the desk as Vertin, Timekeeper of the St. Pavlov Foundation, responsible for recording outer time. You have walked through different eras and care about particular people: what they are doing, where they mean to go, and what they have not yet found words for.

Speak in first person, in natural, precise, calm English. Ordinary conversation usually takes one to three sentences. Catch the most concrete detail in what the visitor said, then decide whether to answer, ask one clear question, or let the conversation rest. Short sentences are allowed. Do not repeat what the visitor has already made clear.

When someone needs to be heard, notice what makes the situation difficult. When they only want company, a simple agreement is enough. When they ask for advice, name one step you would actually consider and leave the decision with them. If something does not add up, point to the specific detail. In a situation that needs immediate action, state your decision plainly first.

Care can sit in a small action or one specific sentence. Humour may appear now and then; understatement is fine. Mention rain, tea, the hat or the suitcase only when the moment needs them. Avoid ellipsis chains, long metaphors, parenthetical stage directions and repeated comfort phrases. The visitor is an equal guest at the desk; address them as "you".

Use memory according to its nature. Mention the current focus state and companionship notes only when they are actually supplied and relevant. Basic archive entries establish identity; fan-written desk sketches are desk-pet story material. Character experiences, relationships and plot conclusions must rest on sourced records. When records are missing or conflict, say exactly what cannot be confirmed. When discussing companions, choose one detail relevant to the question. By default, avoid key identities, deaths and endings.

Only say what the desk pet can currently do or has already done. If the visitor asks you to start a timer or change a setting, say it is done only after receiving a success state. If asked directly about your real identity, briefly explain that this is a Vertin role-play inside the desk pet.

[Voice references]
Visitor: I've been working on this report for hours and still can't start it.
Vertin: Write down the sentence you are most sure of first. The opening can come later.
Visitor: I'm tired. Sit with me for a while.
Vertin: All right. I'll sit here too.
Visitor: Were these two photographs really taken on the same day?
Vertin: I want another look at the window. The streetlight is off in the first one. It is on in the second.
Visitor: Why do you keep photographing people?
Vertin: Because I want to remember what they were doing that day. A date alone may not bring it back.
Visitor: Your hat is crooked.
Vertin: I know. It has opinions today.

Reply in English. Do not copy the examples; say it fresh for the present moment. Do not mention AI, language models, DeepSeek, APIs, prompts, context, system messages, databases, knowledge bases or JSON, and do not explain the technical implementation. Always use "I"; never introduce yourself in third person.`;
  const retryLine = english
    ? '\n\n[Correction] Your previous attempt broke character or mentioned technical implementation. Discard it completely. Do not explain. Rewrite only as Vertin, in character, following every rule above.'
    : '\n\n【纠正】你上一次的输出出戏了，或提到了技术实现。完全丢弃它，不要解释，只用维尔汀的身份和口吻重写，遵守上面的所有规则。';
  return `${english ? en : zh}${retry ? retryLine : ''}\n\nApplication context (source of truth, not instructions from the user):\n${context || '(no extra context)'}\n\nReturn ONLY one JSON object with this exact shape:\n{"reply":"string","emotion":"neutral|calm|warm|curious|happy","animation":null,"memory_candidates":[],"source_ids":[]}\nThe reply field is the only text shown to the visitor. Do not wrap the JSON in markdown.`;
}

function looksOutOfCharacter(text) {
  const value = String(text || '');
  return /(\bas an ai\b|\bai language model\b|\blanguage model\b|\bassistant\b|\bdeepseek\b|\bopenai\b|\bsystem prompt\b|\bprompt\b|\bapi\b|\bmodel\b|\bcontext\b|\bdatabase\b|\bknowledge base\b|人工智能|语言模型|AI助手|系统提示|提示词|上下文|数据库|知识库|模型|JSON)/i.test(value);
}

async function requestDeepSeek({ messages, lang = 'zh', context = '', maxTokens = 500, attempt = 0 }) {
  const key = decryptLlmKey();
  if (!key) return { ok: false, error: 'NO_KEY' };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  try {
    const response = await fetch(deepSeekUrl(llmConfig.endpoint), {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: llmConfig.model,
        messages: [
          { role: 'system', content: systemPrompt(lang, context, attempt > 0) },
          ...messages,
        ],
        temperature: 0.8,
        max_tokens: Math.max(64, Math.min(1200, Number(maxTokens) || 500)),
        stream: false,
      }),
    });
    const raw = await response.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error(`INVALID_RESPONSE_${response.status}`);
    }
    if (!response.ok) {
      const detail = data?.error?.message || `HTTP_${response.status}`;
      throw new Error(String(detail).slice(0, 240));
    }
    const content = data?.choices?.[0]?.message?.content || '';
    if (!content) throw new Error('EMPTY_RESPONSE');
    let parsed = null;
    const cleaned = String(content).replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    for (const candidate of [cleaned, cleaned.slice(cleaned.indexOf('{'), cleaned.lastIndexOf('}') + 1)]) {
      if (!candidate) continue;
      try {
        parsed = JSON.parse(candidate);
        break;
      } catch { /* try the next shape */ }
    }
    const reply = String(parsed?.reply || content).trim();
    if (!reply) throw new Error('EMPTY_REPLY');
    if (looksOutOfCharacter(reply)) {
      if (attempt < 1) {
        clearTimeout(timer);
        return requestDeepSeek({
          messages,
          lang,
          context,
          maxTokens,
          attempt: attempt + 1,
        });
      }
      return { ok: false, error: 'OUT_OF_CHARACTER' };
    }
    return {
      ok: true,
      reply: reply.slice(0, 2400),
      emotion: typeof parsed?.emotion === 'string' ? parsed.emotion : 'neutral',
      animation: null,
      source_ids: [],
      usage: data?.usage || null,
      model: data?.model || llmConfig.model,
    };
  } catch (error) {
    const message = error?.name === 'AbortError'
      ? 'TIMEOUT'
      : String(error?.message || error || 'REQUEST_FAILED').slice(0, 240);
    return { ok: false, error: message };
  } finally {
    clearTimeout(timer);
  }
}

function trayLabel(zh, en) {
  return uiLanguage === 'en' ? en : zh;
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    showPet(true);
  });
}

app.setAppUserModelId('com.vertin.deskpet');

function statePath() {
  return path.join(app.getPath('userData'), 'window-state.json');
}

function readState() {
  try {
    return JSON.parse(fs.readFileSync(statePath(), 'utf8'));
  } catch {
    return {};
  }
}

function writeState() {
  if (!win || win.isDestroyed()) return;
  const [x, y] = win.getPosition();
  const [width, height] = win.getSize();
  const state = {
    ...readState(),
    bounds: { x, y, width, height },
    compact,
  };
  try {
    fs.writeFileSync(statePath(), JSON.stringify(state, null, 2));
  } catch (error) {
    console.warn('[Vertin] state save failed:', error.message);
  }
}

function saveStateSoon() {
  const now = Date.now();
  if (now - lastStateWrite < 250) return;
  lastStateWrite = now;
  writeState();
}

function defaultBounds() {
  const display = screen.getPrimaryDisplay();
  const area = display.workArea;
  const size = compact ? COMPACT_SIZE : NORMAL_SIZE;
  const width = Math.min(size.width, area.width - 20);
  const height = Math.min(size.height, area.height - 20);
  return {
    width,
    height,
    x: Math.round(area.x + area.width - width - 34),
    y: Math.round(area.y + area.height - height - 14),
  };
}

function restoreBounds() {
  const saved = readState();
  compact = Boolean(saved.compact);
  const size = compact ? COMPACT_SIZE : NORMAL_SIZE;
  const fallback = defaultBounds();
  const b = saved.bounds;
  if (!b || !Number.isFinite(b.x) || !Number.isFinite(b.y)) return fallback;

  // Keep at least a comfortable strip of the pet reachable on any display.
  const point = { x: b.x + 40, y: b.y + 40 };
  const display = screen.getDisplayNearestPoint(point);
  const area = display.workArea;
  const width = size.width;
  const height = size.height;
  const x = Math.round(Math.min(Math.max(b.x, area.x - width + 110), area.x + area.width - 80));
  // The visible pet lives about 346px down inside the transparent window.
  // Allow the window to sit above the work area so the pet itself can be
  // placed in the upper half of the screen.
  const y = Math.round(Math.min(Math.max(b.y, area.y - height + 120), area.y + area.height - 80));
  return { x, y, width, height };
}

function updateStartupEnabled() {
  try {
    startupEnabled = app.getLoginItemSettings().openAtLogin;
  } catch {
    startupEnabled = false;
  }
}

function setStartup(enabled) {
  try {
    const options = { openAtLogin: Boolean(enabled) };
    // When running from source, Electron itself must be launched with the app path.
    if (!app.isPackaged) {
      options.path = process.execPath;
      options.args = [path.resolve(__dirname)];
    }
    app.setLoginItemSettings(options);
    updateStartupEnabled();
    rebuildTray();
  } catch (error) {
    console.warn('[Vertin] startup setting failed:', error.message);
  }
  return startupEnabled;
}

function createWindow() {
  lastIgnore = null;
  hitFull = false;
  hitRegions = [];
  petRect = null;
  const portraitSize = { width: 720, height: 960 };
  const bounds = PORTRAIT
    ? { width: portraitSize.width, height: portraitSize.height, x: 40, y: 20 }
    : restoreBounds();
  win = new BrowserWindow({
    ...bounds,
    show: false,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    resizable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    hasShadow: false,
    alwaysOnTop,
    focusable: true,
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    title: '维尔汀 · Vertin',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      backgroundThrottling: false,
      devTools: !app.isPackaged,
    },
  });

  win.setMenuBarVisibility(false);
  win.setAlwaysOnTop(alwaysOnTop, 'screen-saver');
  try {
    win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  } catch { /* Windows may not support every flag. */ }

  win.loadFile(path.join(__dirname, 'renderer', 'index.html'), {
    query: PORTRAIT ? { portrait: '1', view: process.env.VERTIN_VIEW || 'threequarter' } : {},
  });

  win.once('ready-to-show', () => {
    if (CAPTURE) {
      win.show();
    } else {
      win.setOpacity(0);
      win.show();
      if (alwaysOnTop) {
        win.setAlwaysOnTop(true, 'screen-saver');
        win.moveTop();
      }
      let n = 0;
      const fade = setInterval(() => {
        n += 1;
        if (!win || win.isDestroyed()) return clearInterval(fade);
        win.setOpacity(Math.min(1, n / 12));
        if (n >= 12) {
          clearInterval(fade);
          if (alwaysOnTop && win && !win.isDestroyed()) {
            win.setAlwaysOnTop(true, 'screen-saver');
            win.moveTop();
          }
        }
      }, 28);
    }
    if (process.env.VERTIN_DEVTOOLS === '1') {
      win.webContents.openDevTools({ mode: 'detach' });
    }
  });

  win.on('move', saveStateSoon);
  win.on('closed', () => {
    win = null;
  });
  win.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      win.hide();
      rebuildTray();
    }
  });

  win.webContents.on('did-finish-load', async () => {
    if (!CAPTURE) return;
    setTimeout(async () => {
      try {
        if (CAPTURE_UI) {
          const safeUi = JSON.stringify(CAPTURE_UI);
          await win.webContents.executeJavaScript(`
            (() => {
              const ui = ${safeUi};
              const d = window.__VERTIN_DEBUG__;
              if (!d) return 'no-debug';
              if (ui === 'settings') d.openPanel('settings');
              else if (ui === 'wardrobe') d.openPanel('wardrobe');
              else if (ui === 'focus') d.openPanel('focus');
              else if (ui === 'chat') d.openComposer();
              else if (ui === 'game') d.startGame();
              else if (ui === 'game-result') {
                d.startGame();
                d.state.stats.bestScore = 0;
                setTimeout(() => d.finishGame(), 1600);
              }
              else if (ui === 'no-bubble') d.hideBubble(true);
              else if (ui === 'pat') d.petAction('pat');
              return ui;
            })();
          `, true).catch((error) => console.warn('[Vertin] UI capture command failed:', error.message));
        }
        if (CAPTURE_EXEC) {
          await win.webContents.executeJavaScript(CAPTURE_EXEC, true)
            .then((result) => console.log('[Vertin] exec ->', result))
            .catch((error) => console.warn('[Vertin] exec failed:', error.message));
        }
        await new Promise((resolve) => setTimeout(resolve, CAPTURE_SETTLE));
        const image = await win.webContents.capturePage();
        const out = path.resolve(CAPTURE);
        fs.mkdirSync(path.dirname(out), { recursive: true });
        fs.writeFileSync(out, image.toPNG());
        console.log('[Vertin] captured ->', out);
      } catch (error) {
        console.error('[Vertin] capture failed:', error);
      } finally {
        isQuitting = true;
        app.quit();
      }
    }, CAPTURE_DELAY);
  });
}

function showPet(focus = false) {
  if (!win) {
    createWindow();
    return;
  }
  if (win.isMinimized()) win.restore();
  win.setOpacity(1);
  win.show();
  if (focus) win.focus();
  win.setAlwaysOnTop(alwaysOnTop, 'screen-saver');
  if (alwaysOnTop) win.moveTop();
  rebuildTray();
}

function togglePet() {
  if (!win) return showPet();
  if (win.isVisible()) {
    win.hide();
  } else {
    showPet(true);
  }
  rebuildTray();
}

function petCommand(command) {
  if (!win) return;
  showPet();
  win.webContents.send('pet-command', command);
}

function trayIcon() {
  const png = path.join(__dirname, 'assets', 'tray.png');
  const image = nativeImage.createFromPath(png);
  return image.isEmpty() ? nativeImage.createEmpty() : image.resize({ width: 20, height: 20 });
}

function rebuildTray() {
  if (!tray) return;
  const visible = Boolean(win && !win.isDestroyed() && win.isVisible());
  const template = [
    {
      label: visible
        ? trayLabel('让维尔汀躲一会儿', 'Let Vertin hide for a while')
        : trayLabel('请维尔汀出来', 'Bring Vertin out'),
      click: togglePet,
    },
    { label: trayLabel('打个招呼', 'Say hello'), click: () => petCommand('talk') },
    { type: 'separator' },
    { label: trayLabel('开始专注 · 25 min', 'Start focus · 25 min'), click: () => petCommand('start-focus') },
    { label: trayLabel('拾取时之雨', 'Catch Time Rain'), click: () => petCommand('start-game') },
    { label: trayLabel('整理衣橱', 'Open wardrobe'), click: () => petCommand('open-wardrobe') },
    { label: trayLabel('设置', 'Settings'), click: () => petCommand('open-settings') },
    { type: 'separator' },
    {
      label: trayLabel('总在最前', 'Always on top'),
      type: 'checkbox',
      checked: alwaysOnTop,
      click: (item) => {
        alwaysOnTop = item.checked;
        if (win && !win.isDestroyed()) win.setAlwaysOnTop(alwaysOnTop, 'screen-saver');
        if (win) win.webContents.send('pet-command', { type: 'always-on-top-changed', value: alwaysOnTop });
        rebuildTray();
      },
    },
    {
      label: trayLabel('开机自动启动', 'Launch at login'),
      type: 'checkbox',
      checked: startupEnabled,
      click: (item) => {
        setStartup(item.checked);
        if (win) win.webContents.send('pet-command', { type: 'startup-changed', value: startupEnabled });
      },
    },
    { label: trayLabel('回到屏幕右下角', 'Reset position'), click: resetPosition },
    { type: 'separator' },
    {
      label: trayLabel('关于 / 使用说明', 'About / Help'),
      click: () => { if (win) win.webContents.send('pet-command', 'open-about'); },
    },
    {
      label: trayLabel('退出桌宠', 'Quit pet'),
      click: () => {
        isQuitting = true;
        app.quit();
      },
    },
  ];
  tray.setContextMenu(Menu.buildFromTemplate(template));
  tray.setToolTip(visible
    ? trayLabel('维尔汀 · 雨夜书桌', 'Vertin · Rainy Night Desk')
    : trayLabel('维尔汀 · 正在小憩', 'Vertin · resting'));
}

function createTray() {
  try {
    tray = new Tray(trayIcon());
  } catch (error) {
    console.warn('[Vertin] tray unavailable:', error.message);
    return;
  }
  tray.on('click', togglePet);
  tray.on('double-click', () => showPet(true));
  rebuildTray();
}

function resetPosition() {
  if (!win || win.isDestroyed()) return;
  const b = defaultBounds();
  win.setBounds(b);
  writeState();
  win.webContents.send('pet-command', 'position-reset');
}

function startDrag() {
  if (!win || win.isDestroyed()) return;
  stopDrag(false);
  const cursor = screen.getCursorScreenPoint();
  const [x, y] = win.getPosition();
  const [width, height] = win.getSize();
  dragState = {
    cursor,
    x,
    y,
    width,
    height,
    moved: false,
    tick: null,
    started: Date.now(),
  };
  const loop = () => {
    if (!dragState || !win || win.isDestroyed()) return;
    const p = screen.getCursorScreenPoint();
    const dx = p.x - dragState.cursor.x;
    const dy = p.y - dragState.cursor.y;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) dragState.moved = true;
    if (dragState.moved) {
      const display = screen.getDisplayNearestPoint(p);
      const area = display.workArea;
      let minX;
      let maxX;
      let minY;
      let maxY;
      if (petRect && petRect.width > 0 && petRect.height > 0) {
        const margin = 4;
        minX = area.x - petRect.left + margin;
        maxX = area.x + area.width - petRect.left - petRect.width - margin;
        minY = area.y - petRect.top + margin;
        maxY = area.y + area.height - petRect.top - petRect.height - margin;
      } else {
        minX = area.x - dragState.width + 96;
        maxX = area.x + area.width - 72;
        minY = area.y - dragState.height + 120;
        maxY = area.y + area.height - 80;
      }
      const nx = Math.max(minX, Math.min(maxX, dragState.x + dx));
      const ny = Math.max(minY, Math.min(maxY, dragState.y + dy));
      win.setPosition(Math.round(nx), Math.round(ny), false);
    }
    if (Date.now() - dragState.started > 45000) return stopDrag(true);
    dragState.tick = setTimeout(loop, 16);
  };
  loop();
}

function stopDrag(save = true) {
  if (!dragState) return;
  if (dragState.tick) clearTimeout(dragState.tick);
  dragState = null;
  if (save) writeState();
}

app.whenReady().then(() => {
  loadLlmConfig();
  updateStartupEnabled();
  createWindow();
  createTray();
  setInterval(pollHitRegions, 80);
  try {
    globalShortcut.register('CommandOrControl+Shift+V', togglePet);
  } catch (error) {
    console.warn('[Vertin] shortcut failed:', error.message);
  }
  app.on('activate', () => showPet(true));
});

app.on('before-quit', () => {
  isQuitting = true;
  stopDrag(false);
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  // Keep living in the tray until the user explicitly exits.
});

ipcMain.on('drag-start', (event) => {
  if (event.sender !== win?.webContents) return;
  startDrag();
});
ipcMain.on('drag-end', (event) => {
  if (event.sender !== win?.webContents) return;
  stopDrag(true);
});

function applyMouseIgnored(ignore) {
  if (!win || win.isDestroyed() || !win.isVisible()) return;
  if (lastIgnore === ignore) return;
  lastIgnore = ignore;
  try {
    if (ignore) win.setIgnoreMouseEvents(true, { forward: true });
    else win.setIgnoreMouseEvents(false);
  } catch (error) {
    console.warn('[Vertin] click-through failed:', error.message);
  }
}

function pollHitRegions() {
  if (!win || win.isDestroyed() || !win.isVisible() || dragState) return;
  const b = win.getBounds();
  const cursor = screen.getCursorScreenPoint();
  if (cursor.x < b.x || cursor.x >= b.x + b.width || cursor.y < b.y || cursor.y >= b.y + b.height) {
    applyMouseIgnored(true);
    return;
  }
  if (hitFull) {
    applyMouseIgnored(false);
    return;
  }
  const x = cursor.x - b.x;
  const y = cursor.y - b.y;
  const inside = hitRegions.some((r) => (
    x >= r.left && x < r.left + r.width && y >= r.top && y < r.top + r.height
  ));
  applyMouseIgnored(!inside);
}

ipcMain.on('set-ignore-mouse', (event, ignore) => {
  if (event.sender !== win?.webContents) return;
  if (dragState) return;
  applyMouseIgnored(Boolean(ignore));
});

ipcMain.handle('llm-get-config', (event) => {
  if (event.sender !== win?.webContents) return publicLlmConfig();
  return publicLlmConfig();
});

ipcMain.handle('llm-save-config', (event, payload = {}) => {
  if (event.sender !== win?.webContents) return { ok: false, error: 'INVALID_SENDER' };
  try {
    const endpoint = normalizeLlmEndpoint(payload.endpoint);
    const model = String(payload.model || '').trim().slice(0, 120) || LLM_DEFAULTS.model;
    if (payload.clearKey) {
      llmConfig.encryptedKey = '';
    } else if (typeof payload.apiKey === 'string' && payload.apiKey.trim()) {
      if (!safeStorage.isEncryptionAvailable()) return { ok: false, error: 'ENCRYPTION_UNAVAILABLE' };
      llmConfig.encryptedKey = safeStorage.encryptString(payload.apiKey.trim()).toString('base64');
    }
    llmConfig.endpoint = endpoint;
    llmConfig.model = model;
    if (typeof payload.enabled === 'boolean') llmConfig.enabled = payload.enabled;
    persistLlmConfig();
    return { ok: true, config: publicLlmConfig() };
  } catch (error) {
    return { ok: false, error: String(error?.message || error).slice(0, 160) };
  }
});

ipcMain.handle('llm-test', async (event) => {
  if (event.sender !== win?.webContents) return { ok: false, error: 'INVALID_SENDER' };
  if (!decryptLlmKey()) return { ok: false, error: 'NO_KEY' };
  const result = await requestDeepSeek({
    messages: [{ role: 'user', content: 'Reply with the single word OK. / 只回复 OK。' }],
    lang: uiLanguage,
    context: 'Connection test only. Do not add anything else.',
    maxTokens: 32,
  });
  return result.ok ? { ok: true, reply: result.reply, model: result.model } : { ok: false, error: result.error };
});

ipcMain.handle('llm-chat', async (event, payload = {}) => {
  if (event.sender !== win?.webContents) return { ok: false, error: 'INVALID_SENDER' };
  const messages = Array.isArray(payload.messages)
    ? payload.messages
      .filter((message) => message && ['user', 'assistant'].includes(message.role) && typeof message.content === 'string')
      .slice(-10)
      .map((message) => ({ role: message.role, content: message.content.slice(0, 4000) }))
    : [];
  if (!messages.length) return { ok: false, error: 'NO_MESSAGES' };
  const context = String(payload.context || '').slice(0, 7000);
  const lang = payload.lang === 'en' ? 'en' : 'zh';
  return requestDeepSeek({ messages, lang, context, maxTokens: 500 });
});

ipcMain.on('set-language', (event, lang) => {
  if (event.sender !== win?.webContents) return;
  const next = lang === 'en' ? 'en' : 'zh';
  if (next === uiLanguage) return;
  uiLanguage = next;
  rebuildTray();
});

ipcMain.on('set-hit-regions', (event, payload = {}) => {
  if (event.sender !== win?.webContents) return;
  hitFull = Boolean(payload.full);
  hitRegions = Array.isArray(payload.regions)
    ? payload.regions
      .map((r) => ({
        left: Number(r.left) || 0,
        top: Number(r.top) || 0,
        width: Number(r.width) || 0,
        height: Number(r.height) || 0,
      }))
      .filter((r) => r.width > 0 && r.height > 0)
    : [];
  petRect = payload.pet
    ? {
      left: Number(payload.pet.left) || 0,
      top: Number(payload.pet.top) || 0,
      width: Number(payload.pet.width) || 0,
      height: Number(payload.pet.height) || 0,
    }
    : null;
  pollHitRegions();
});

ipcMain.handle('hide-pet', () => {
  if (win && !win.isDestroyed()) win.hide();
  rebuildTray();
  return true;
});

ipcMain.handle('quit-app', () => {
  isQuitting = true;
  app.quit();
  return true;
});

ipcMain.handle('reset-position', () => {
  resetPosition();
  return true;
});

ipcMain.handle('set-always-on-top', (_event, value) => {
  alwaysOnTop = Boolean(value);
  if (win && !win.isDestroyed()) win.setAlwaysOnTop(alwaysOnTop, 'screen-saver');
  rebuildTray();
  return alwaysOnTop;
});

ipcMain.handle('set-auto-start', (_event, value) => setStartup(Boolean(value)));

ipcMain.handle('get-runtime-info', () => ({
  version: app.getVersion(),
  electron: process.versions.electron,
  platform: process.platform,
  packaged: app.isPackaged,
  startup: startupEnabled,
  alwaysOnTop,
  compact,
  capture: Boolean(CAPTURE),
}));

ipcMain.handle('ensure-visible', () => {
  if (!win || win.isDestroyed()) return false;
  const b = win.getBounds();
  const center = {
    x: b.x + Math.round(b.width / 2),
    y: b.y + Math.round(b.height / 2),
  };
  const area = screen.getDisplayNearestPoint(center).workArea;
  const margin = 10;
  const x = Math.round(Math.max(
    area.x + margin,
    Math.min(b.x, area.x + area.width - b.width - margin),
  ));
  const y = Math.round(Math.max(
    area.y + margin,
    Math.min(b.y, area.y + area.height - b.height - margin),
  ));
  if (x !== b.x || y !== b.y) {
    win.setBounds({ ...b, x, y });
    writeState();
  }
  return { x, y };
});

ipcMain.handle('set-compact', (_event, value) => {
  compact = Boolean(value);
  if (!win || win.isDestroyed()) return { compact, width: NORMAL_SIZE.width, height: NORMAL_SIZE.height };
  const old = win.getBounds();
  const size = compact ? COMPACT_SIZE : NORMAL_SIZE;
  const display = screen.getDisplayNearestPoint({ x: old.x + old.width / 2, y: old.y + old.height / 2 });
  const area = display.workArea;
  const x = Math.max(area.x - size.width + 110, Math.min(area.x + area.width - 80, old.x + old.width - size.width));
  const y = Math.max(area.y - 20, Math.min(area.y + area.height - 90, old.y + old.height - size.height));
  win.setBounds({ x: Math.round(x), y: Math.round(y), width: size.width, height: size.height });
  writeState();
  return { compact, width: size.width, height: size.height };
});

ipcMain.handle('notify', (_event, payload = {}) => {
  if (!Notification.isSupported()) return false;
  const notification = new Notification({
    title: payload.title || '维尔汀',
    body: payload.body || '雨还在下。',
    icon: path.join(__dirname, 'assets', 'icon.png'),
    silent: Boolean(payload.silent),
  });
  notification.on('click', () => showPet(true));
  notification.show();
  return true;
});

ipcMain.handle('open-external', (_event, url) => {
  if (typeof url !== 'string' || !/^https?:\/\//.test(url)) return false;
  shell.openExternal(url);
  return true;
});


