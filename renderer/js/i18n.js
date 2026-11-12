/**
 * Tiny DOM-level Chinese → English layer.
 *
 * The Chinese strings remain the source of truth in the templates. When the
 * app is in English mode this module translates known labels, attributes and a
 * few dynamic patterns. Switching language reloads the window, so there is no
 * need to restore a previous DOM tree.
 */

const EN = {
  '维尔汀 · 雨夜书桌': 'Vertin · Rainy Night Desk',
  '维尔汀': 'Vertin',
  '正在翻开记录': 'Opening the records',
  '怀表停住了。': 'The pocket watch has stopped.',
  '场景没有成功启动。请确认后重试。': 'The scene failed to start. Please check and try again.',
  '桌面场景没有成功启动。请稍后重试。': 'The desktop scene failed to start. Please try again later.',
  '桌面场景没有成功启动。请尝试重启桌宠。': 'The desktop scene failed to start. Try restarting the pet.',
  '初始化失败。': 'Initialization failed.',
  '需要启用 JavaScript 才能见到维尔汀。': 'Enable JavaScript to meet Vertin.',
  '打开专注计时器': 'Open focus timer',
  '当前时间': 'Current time',
  '关闭时钟便笺': 'Close clock note',
  '关闭对话': 'Close dialogue',
  '关闭面板': 'Close panel',
  '桌宠功能': 'Desk pet functions',
  '和维尔汀说话': 'Talk to Vertin',
  '开始拾雨小游戏': 'Start the Raindrop game',
  '更多': 'More',
  '更多功能': 'More functions',
  '打开功能菜单': 'Open function menu',
  '功能菜单': 'Function menu',
  '收起': 'Collapse',
  '和维尔汀说点什么……': 'Say something to Vertin…',
  '发送': 'Send',
  '维尔汀。可以拖动、摸头或点击礼帽。': 'Vertin. Drag her, pat her head, or click her hat.',
  '对话 · C': 'Chat · C',
  '专注 · F': 'Focus · F',
  '拾雨 · G': 'Catch Rain · G',
  '维尔汀像素头像': 'Vertin pixel portrait',
  '本局记录': 'Round Record',
  '雨滴已经收进箱子。': 'The raindrops are in the suitcase.',
  '新的记录。两种雨滴都收进箱子了。': 'A new record. Both kinds of raindrops are in the suitcase.',
  '两种雨滴都收进箱子了。': 'Both kinds of raindrops are in the suitcase.',
  '新的记录。雨滴已经收进箱子。': 'A new record. The raindrops are in the suitcase.',
  '雨太急了。下次再试试。': 'The rain was too fast. Try again next time.',
  '纯雨滴': 'Clear Drop',
  '粹雨滴': 'Crystal Drop',
  '纯': 'Clear',
  '粹': 'Crystal',
  '纯雨滴数量': 'Clear Drop count',
  '粹雨滴数量': 'Crystal Drop count',
  '纯雨滴，琥珀金色雨滴': 'Clear Drop, an amber-gold raindrop',
  '粹雨滴，稀有的紫粉色雨滴': 'Crystal Drop, a rare violet-pink raindrop',
  '暂停游戏': 'Pause game',
  '继续游戏': 'Resume game',
  '关闭音效': 'Mute sound',
  '开启音效': 'Enable sound',
  '暂停': 'Pause',
  '继续': 'Resume',
  '音效开': 'Sound on',
  '音效关': 'Sound off',
  '已暂停': 'Paused',
  '继续接雨': 'Keep catching rain',
  '接住发亮的雨滴': 'Catch the bright raindrops',
  '再来一次': 'Again',
  '收下': 'Keep',
  '结束': 'End',
  '结束游戏': 'End game',
  '打开专注': 'Open focus',
  '音量': 'Volume',
  '桌宠大小': 'Pet size',
  '界面语言': 'Language',
  '中文': 'Chinese',
  '切换后界面与对话会重新载入。': 'The interface and dialogue reload after switching.',
  '旧日记录': 'Old Records',
  '四十位同行者': 'Forty companions',
  '全部 40 位': 'All 40',
  '返回角色资料': 'Back to profile',
  '再翻一页': 'Another page',
  '点一个名字，听她讲一段旧事。': 'Choose a name to hear an old memory.',
  '诗人的助手': "The poet's assistant",
  '海盗电台 DJ': 'Pirate-radio DJ',
  '狩勋女巫': 'Huntsworn witch',
  '专注': 'Focus',
  '小憩': 'Break',
  '暂停': 'Paused',
  '专注记录': 'Focus Record',
  '计时与专注': 'Timer & focus',
  '计时模式': 'Timer mode',
  '时长': 'Duration',
  '专注任务': 'Focus task',
  '暂停计时': 'Pause timer',
  '继续计时': 'Resume timer',
  '开始专注': 'Start focus',
  '开始小憩': 'Start break',
  '重置': 'Reset',
  '休息的时候，不必安排任务': 'No task needed during a break',
  '这一段时间要做什么？（可留空）': 'What will you do in this session? (optional)',
  '小憩五分钟。把视线从屏幕上移开，雨会替你看着时间。': 'Five-minute break. Look away from the screen; the rain will watch the time for you.',
  '完成一段专注可获得 +8 亲密与 2 枚时之雨。计时期间窗口仍可拖动。': 'Finish a focus session for +8 affection and 2 Time Rain. The window can still be dragged while the timer runs.',
  '今日专注': 'Focus today',
  '累计': 'Total',
  '记录只留在这台电脑上。': 'Records stay on this computer.',
  '记录留在这台电脑上。': 'Records stay on this computer.',
  '外观收藏': 'Wardrobe',
  '当前造型': 'Current look',
  '帽子': 'Hat',
  '当前像素造型固定保留参考图里的旧礼帽。点击卡片会合上这里，让她抬一下帽檐。': 'The pixel design keeps the old top hat from the reference. Clicking the card closes this panel and tips the brim.',
  '查看角色资料': 'View profile',
  '等级、时之雨和陪伴记录已经收进「角色资料」，需要时再打开。': 'Level, Time Rain and companionship records are in Profile. Open it whenever you need them.',
  '旧物不吵闹，只在一旁。': 'Old things do not make noise. They simply wait nearby.',
  '角色资料': 'Profile',
  '记录与陪伴': 'Records & company',
  '同行等级': 'Companion level',
  '陪伴记录': 'Companionship record',
  '亲密度': 'Affection',
  '距离下一级': 'Next level in',
  '已到达最高记录': 'Highest record reached',
  '主动发言': 'Proactive speech',
  '安静只回应；偶尔每天最多两次；正常会主动聊起近况。': 'Quiet replies only; Occasional speaks up to twice a day; Normal starts small conversations.',
  '主动发言频率': 'Proactive speech frequency',
  '安静': 'Quiet',
  '偶尔': 'Occasional',
  '正常': 'Normal',
  '记住最近话题': 'Remember recent topic',
  '只在本机保存一句最近话题，下次打开时可以接着聊。': 'Keep one recent topic locally so the next visit can continue it.',
  '清空陪伴记录': 'Clear companion notes',
  '陪伴记录已清空。': 'Companion notes cleared.',
  '照片册': 'Photo album',
  '每日签到': 'Daily check-in',
  '签到': 'Check in',
  '箱中来客': 'Guests from the case',
  '来客': 'Guests',
  '查看人物档案': 'View dossier',
  '再召见一位': 'Call another',
  '收回': 'Dismiss',
  '造型预设': 'Saved looks',
  '保存当前造型': 'Save current',
  '照片会旧，留影不会。': 'The print ages; the moment stays.',
  '记住的事': 'Remembered things',
  '要记住这件事吗？': 'Remember this?',
  '只保存在本机。可以随时在设置里删除。': 'Stored on this computer only. You can delete it in Settings.',
  '记住': 'Remember',
  '忽略': 'Ignore',
  '记录者 · 相伴第': 'Record-keeper · Day',
  '天': 'days',
  '时之雨': 'Time Rain',
  '被摸头': 'Head pats',
  '专注时间': 'Focus time',
  '拾雨局数': 'Raindrop rounds',
  '最高拾雨': 'Best raindrop score',
  '相遇天数': 'Days together',
  '滴': 'drops',
  '次': 'times',
  '分钟': 'min',
  '局': 'rounds',
  '资料只保存在本机。打开衣橱可以整理她的礼帽；专注和拾雨会继续把数字写进这一页。': 'The profile is stored on this computer only. Open the wardrobe to tidy her hat; focus and raindrop sessions keep adding numbers to this page.',
  '记录会慢慢变厚，不必急着翻完。': 'The record will thicken slowly. There is no need to finish reading it.',
  '桌面设置': 'Desk Settings',
  '安静与位置': 'Quiet & position',
  '声音': 'Sound',
  '雨声与音效': 'Rain & effects',
  '程序实时合成的雨声、钟声与互动音。': 'Rain, chimes and interaction sounds synthesized in real time.',
  '让雨声停在合适的距离。': 'Keep the rain at a comfortable distance.',
  '试听': 'Test',
  '语音朗读': 'Read aloud',
  '用系统中文语音轻轻念出对话。默认关闭。': 'Read dialogue aloud with the system voice. Off by default.',
  '桌面': 'Desktop',
  '常驻时钟便笺': 'Clock note',
  '在左上角留一张小时钟。关闭后不再占用桌面。': 'Keep a small clock in the top-left corner.',
  '像素雨': 'Pixel rain',
  '在她周围落下很淡的像素雨。默认关闭。': 'A faint pixel rain around her. Off by default.',
  '只缩放角色；面板和文字保持可读尺寸。': 'Scales the character only; panels and text stay readable.',
  '原大': 'Full',
  '总在最前': 'Always on top',
  '让维尔汀待在所有窗口之上。也可以从托盘切换。': 'Keep Vertin above other windows. Can also be toggled from the tray.',
  '迷你模式': 'Compact mode',
  '缩小为更轻的尺寸，适合小屏幕。': 'A lighter size for smaller screens.',
  '开机自动启动': 'Launch at login',
  '登录 Windows 后自动来到桌面。': 'Come to the desktop automatically after Windows login.',
  '回到右下角': 'Reset position',
  '藏进雨里': 'Hide',
  '退出桌宠': 'Quit pet',
  '再点一次退出': 'Click again to quit',
  '空白区域的鼠标会穿透到桌面；当光标移回维尔汀或界面时，互动会自动恢复。若窗口藏起来了，按': 'Empty areas pass clicks through to the desktop; interaction returns when the cursor moves back over Vertin or the UI. If the window is hidden, press',
  '召回，或从系统托盘里找她。': 'to bring her back, or find her in the system tray.',
  '用法': 'How to use',
  '拖动': 'Drag',
  '移动桌面位置（自动记住）': 'Move the desktop position (remembered automatically)',
  '左键': 'Left click',
  '点帽子、摸头或闲聊；双击抬帽': 'Click the hat, pat her head or chat; double-click to tip the hat',
  '右键 / 右下角': 'Right click / bottom-right',
  '打开功能工具条': 'Open the function bar',
  'C / F / G': 'C / F / G',
  '对话 / 专注 / 拾雨': 'Chat / Focus / Catch Rain',
  'Esc': 'Esc',
  '关闭面板、工具条或对话': 'Close panels, the toolbar or dialogue',
  '关于': 'About',
  '一个以《重返未来：1999》角色维尔汀为灵感的同人像素桌宠。角色设定与形象版权归 Bluepoch 所有；本作品为非商业同人，不含游戏内素材。像素造型、界面、雨声和音效均在本地运行。': 'A fan-made pixel desktop pet inspired by Vertin from Reverse: 1999. Character rights belong to Bluepoch. This is a non-commercial fan work with no in-game assets. The pixel art, interface, rain and sound all run locally.',
  '“时间很长。你可以慢慢来。”': '"Time is long. You can take it slowly."',
  '互动 / 查看': 'INTERACT / VIEW',
  '摸摸头': 'Pat head',
  '红茶': 'Tea',
  '衣橱': 'Closet',
  '桌面 / 其他': 'DESK / OTHER',
  '时钟便笺': 'Clock',
  '设置': 'Settings',
  '操作提示': 'Help',
  '左键摸摸 · 右键打开工具条 · 拖动移动位置': 'Left-click to pat · Right-click for the toolbar · Drag to move',
  '左键互动 · 右键打开工具条 · 拖动移动位置': 'Left-click to interact · Right-click for the toolbar · Drag to move',
  '你在听。想聊什么都可以，不一定非要是重要的事。': 'I am listening. We can talk about anything—it does not have to be important.',
  '我在听。想聊什么都可以，不一定非要是重要的事。': 'I am listening. We can talk about anything—it does not have to be important.',
  '比如：': 'e.g. ',
  '点我、摸头，或者拖动我换个位置': 'Click me, pat my head, or drag me somewhere else',
  '可以再靠近一点 · 拖住我移动位置': 'Come a little closer · Drag me to move',
  '热红茶 · 加一块方糖': 'Hot black tea · one sugar cube',
  '礼帽 · 帽檐朝西': 'Top hat · brim to the west',
  '专注期间，我会安静地待在这里': 'I will stay quiet while you focus',
  '本段': 'This session',
  '专注完成': 'Focus complete',
  '小憩结束。准备好再出发吧。': 'Break over. Start again when you are ready.',
  '计时继续。': 'Timer resumed.',
  '计时已暂停。': 'Timer paused.',
  '计时已归零。': 'Timer reset.',
  '计时还在继续。': 'The timer is still running.',
  '专注进行中。这一小段时间，先留给手头的事吧。': 'Focus is running. Leave this little stretch of time to the task at hand.',
  '新的记录。雨滴已经收进箱子。': 'A new record. The raindrops are in the suitcase.',
  '雨太急了。下次再试试。': 'The rain was too fast. Try again next time.',
  '接住发亮的时之雨': 'Catch the bright Time Rain',
  '金色的时之雨，价值三滴': 'Golden Time Rain, worth three drops',
  '位置已重置。': 'Position reset.',
  '回到屏幕右下角。': 'Back to the bottom-right corner.',
  '茶还热着。先喝完这一杯吧。': 'The tea is still hot. Finish this cup first.',
  '星锑': 'Regulus',
  '十四行诗': 'Sonetto',
  '红弩箭': 'Lilya',
  '旧礼帽': 'Old Top Hat',
  '已佩戴 · 轻点整理帽檐': 'Worn · click to tidy the brim',
  '已佩戴 · 点击取下': 'Worn · click to remove',
  '未佩戴 · 点击佩戴': 'Not worn · click to wear',
  '已佩戴': 'worn',
  '已取下': 'removed',
  '解锁': 'Unlocked',
  '已放进衣橱': 'added to the wardrobe',
  '雨夜': 'Rainy night',
  '雨声很轻': 'The rain is soft',
  '街灯还亮着': 'Streetlamps still on',
  '远处有钟声': 'A distant bell',
  '玻璃上起了雾': 'Fog on the glass',
  '雨点落在帽檐': 'Rain on the brim',
  '留声机低低转着': 'A record turns softly',
  '礼物': 'Gift',
  '好感': 'Affection',
  '旧日记录': 'Old Records',
  '诗人的助手': "The poet's assistant",
};

const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS_EN = { 周日: 'Sunday', 周一: 'Monday', 周二: 'Tuesday', 周三: 'Wednesday', 周四: 'Thursday', 周五: 'Friday', 周六: 'Saturday' };

const PATTERNS = [
  [/^(\d+) 位同行者$/, (m) => `${m[1]} companions`],
  [/^全部 (\d+) 位$/, (m) => `All ${m[1]}`],
  [/^(\d{1,2})月(\d{1,2})日 · (周[一二三四五六日])$/, (m) => `${MONTHS_EN[Number(m[1]) - 1]} ${m[2]} · ${WEEKDAYS_EN[m[3]] || m[3]}`],
  [/^记录者 · 相伴第 (\d+) 天$/, (m) => `Record-keeper · Day ${m[1]} together`],
  [/^亲密度 (\d+)$/, (m) => `Affection ${m[1]}`],
  [/^距离下一级 (\d+)$/, (m) => `Next level in ${m[1]}`],
  [/^已到达最高等级 Lv\.(\d+)$/, (m) => `Maximum level Lv.${m[1]} reached`],
  [/^第 (\d+) 天。雨还在，我也还在。(.*)$/, (m) => `Day ${m[1]}. The rain is still here, and so am I. ${m[2]}`],
  [/^Lv\.(\d+) · (.+?)　你们之间的记录又厚了一页。$/, (m) => `Lv.${m[1]} · ${m[2]} — one more page in your record.`],
  [/^解锁 · (.+?)　已放进衣橱$/, (m) => `Unlocked · ${m[1]} — added to the wardrobe`],
  [/^专注完成 · (\d+) 分钟　\+8 亲密　\+2 时之雨$/, (m) => `Focus complete · ${m[1]} min · +8 affection · +2 Time Rain`],
  [/^本段 (\d+) 分钟 · \+8 亲密 · \+2 时之雨$/, (m) => `This session: ${m[1]} min · +8 affection · +2 Time Rain`],
  [/^拾雨结束 · 获得 (\d+) 枚时之雨$/, (m) => `Raindrop round over · ${m[1]} Time Rain collected`],
  [/^拾雨结束 · 纯雨滴 (\d+) · 粹雨滴 (\d+) · 共 (\d+) 滴$/, (m) => `Raindrop round over · Clear Drop ${m[1]} · Crystal Drop ${m[2]} · ${m[3]} total`],
  [/^还差 (\d+) 枚时之雨。去拾雨吧。$/, (m) => `Still need ${m[1]} Time Rain. Go catch some rain.`],
  [/^还差 (\d+) 枚时之雨$/, (m) => `Still need ${m[1]} Time Rain`],
  [/^比如：(.+)$/, (m) => `e.g. ${m[1]}`],
  [/^(\d{2}:\d{2}) · 维尔汀$/, (m) => `${m[1]} · Vertin`],
  [/^(\d+) 分钟$/, (m) => `${m[1]} min`],
  [/^(\d+) 滴$/, (m) => `${m[1]} drops`],
  [/^(\d+) 次$/, (m) => `${m[1]} times`],
  [/^(\d+) 局$/, (m) => `${m[1]} rounds`],
  [/^(\d+) 天$/, (m) => `${m[1]} days`],
  [/^(.+) · 已佩戴$/, (m) => `${m[1]} · worn`],
  [/^(.+) · 已取下$/, (m) => `${m[1]} · removed`],
];

const ATTRS = ['data-tip', 'aria-label', 'placeholder', 'title', 'alt'];
const SKIP = '#bubbleText, input, textarea, script, style, .keep-original';

let current = 'zh';
let observer = null;

function translateCore(value) {
  const raw = String(value);
  const core = raw.trim();
  if (!core) return raw;
  if (EN[core]) return raw.replace(core, EN[core]);
  for (const [pattern, replacer] of PATTERNS) {
    const match = core.match(pattern);
    if (match) return raw.replace(core, replacer(match));
  }
  return raw;
}

function translateAttributes(el) {
  for (const attr of ATTRS) {
    if (!el.hasAttribute || !el.hasAttribute(attr)) continue;
    const value = el.getAttribute(attr);
    const translated = translateCore(value);
    if (translated !== value) el.setAttribute(attr, translated);
  }
}

function localizeTextNode(node) {
  if (!node || node.nodeType !== 3) return;
  const parent = node.parentElement;
  if (!parent || parent.closest(SKIP)) return;
  const translated = translateCore(node.nodeValue);
  if (translated !== node.nodeValue) node.nodeValue = translated;
}

function localizeNode(node) {
  if (!node) return;
  if (node.nodeType === 3) {
    localizeTextNode(node);
    return;
  }
  if (node.nodeType !== 1) return;
  const el = node;
  if (el.matches(SKIP)) {
    translateAttributes(el);
    return;
  }
  translateAttributes(el);
  const descendants = el.querySelectorAll ? el.querySelectorAll('*') : [];
  for (const descendant of descendants) translateAttributes(descendant);
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode(textNode) {
      const parent = textNode.parentElement;
      return parent && !parent.closest(SKIP) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  let textNode = walker.nextNode();
  while (textNode) {
    localizeTextNode(textNode);
    textNode = walker.nextNode();
  }
}

function startObserver() {
  if (observer) return;
  observer = new MutationObserver((mutations) => {
    if (current !== 'en') return;
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) localizeNode(node);
      } else if (mutation.type === 'characterData') {
        localizeTextNode(mutation.target);
      } else if (mutation.type === 'attributes') {
        translateAttributes(mutation.target);
      }
    }
  });
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ATTRS,
  });
}

export function setLanguage(lang = 'zh') {
  current = lang === 'en' ? 'en' : 'zh';
  document.documentElement.lang = current === 'en' ? 'en' : 'zh-CN';
  if (current === 'en') {
    localizeNode(document.documentElement);
    startObserver();
  } else if (observer) {
    observer.disconnect();
    observer = null;
  }
  return current;
}

export function isEnglish() {
  return current === 'en';
}

export function translate(value) {
  return current === 'en' ? translateCore(value) : String(value);
}
