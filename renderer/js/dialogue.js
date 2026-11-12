/**
 * Original, fan-written dialogue for the desktop companion.
 * Short, quiet and in the spirit of a timekeeper who walks through rain.
 */

import {
  ACCESSORIES_EN,
  CHAT_HINTS_EN,
  FALLBACK_EN,
  LEVEL_TITLES_EN,
  LINES_EN,
  REPLIES_EN,
} from './dialogue.en.js';
import {
  CHARACTER_REPLIES,
  EXTRA_EN,
  EXTRA_ZH,
  MEMORY_CHARACTERS,
  MEMORY_INTRO,
} from './dialogue.extra.js';
import { FRIEND_STATUS } from './dialogue.status.js';

export { MEMORY_CHARACTERS } from './dialogue.extra.js';

let currentLang = 'zh';

export function setDialogueLanguage(lang = 'zh') {
  currentLang = lang === 'en' ? 'en' : 'zh';
  return currentLang;
}

export function dialogueLanguage() {
  return currentLang;
}

export const LINES = {
  welcome: [
    '初次见面。我是维尔汀，替时间照看一些不被记住的片刻。',
    '雨会下很久。你可以把我留在这里，忙你的事。',
    '箱子里装着过去，帽檐下装着现在。至于未来……先不急着打开。',
  ],
  greetMorning: [
    '早安。雨还没停，不过今天的时间归你。',
    '早。先喝一口水，再把今天的第一页翻开。',
    '清晨的雨最轻。适合慢慢开始。',
  ],
  greetNoon: [
    '午后适合整理箱子，也适合发一会儿呆。',
    '这个时间的光很薄。要不要休息一下？',
    '午饭吃了吗？记录者也要按时补充能量。',
  ],
  greetEvening: [
    '夜色落下来了。要一起把今天收进箱子里吗？',
    '傍晚的雨声会变得沉一点。像一张旧唱片。',
    '辛苦了。剩下的事，明天也来得及。',
  ],
  greetNight: [
    '这么晚还没睡？……我不会催你，只是提醒你，明天也值得被好好抵达。',
    '夜深了。把屏幕调暗一点，好吗？',
    '我还在。你忙完就来，不必打招呼。',
  ],
  idle: [
    '雨滴落在不同的年代，声音其实不一样。',
    '如果时间是一条河，我更愿意沿着岸边走。',
    '伦敦的雨有一种旧纸张的味道。',
    '箱子的锁最近有点松。可能是它也想出门了。',
    '有时我会想，钟表是不是也会累。',
    '你的桌面很安静。适合记录。',
    '我没有在看雨。只是刚好，视线停在那里。',
    '礼帽上的缎带旧了，但颜色还留着。',
    '如果雨停了一瞬，你会先做什么？',
    '别担心，时间不会因为一次发呆就走得更快。',
  ],
  patHead: [
    '帽檐下面，是允许你暂时停靠的地方。',
    '唔……只可以三秒。',
    '你的手很暖。',
    '再摸下去，礼帽要歪了。',
    '这是今天的第二次。我记下了。',
    '好。现在轮到你休息了。',
    '手停一下。让我确认这不是雨。',
    '你今天已经来过这里了。',
    '帽檐有点压眼睛。……不过没关系。',
    '如果你是在确认我还在，我在。',
    '这一下，记在你那边。',
    '帽檐下面很窄。你倒是很会找地方。',
    '再摸一会儿，我会记住你手的温度。',
    '今天已经摸过两次了。……第三次也记上吧。',
    '别担心，我没有躲。只是帽檐有点低。',
    '如果累了，可以靠一会儿。只一会儿。',
  ],
  patHat: [
    '礼帽是用来记时间的。帽檐向西，说明我还没走远。',
    '别碰缎带，它会记住你的手温。',
    '这样算打过招呼了。',
    '帽子可以歪，时间不能。……不过今天可以例外。',
    '帽檐朝东是出门，朝西是回来。现在这样，算中间。',
    '别把缎带扯散。它系着一段旧路。',
    '你对这顶帽子比对我熟。',
    '帽子可以再歪一点。今天不赶时间。',
    '帽檐朝左是今天，朝右是昨天。现在这样，算刚刚好。',
    '缎带松了。你帮我系？……算了，我自己来。',
    '这顶帽子见过很多次雨。你是它见过最不守时的人。',
    '别把帽子当钟表。它只是记得方向。',
    '帽子下面没有藏着答案。只有我。',
  ],
  body: [
    '我在。雨声太吵的时候，就听我说话。',
    '今天想聊些什么？',
    '别站得太近，雨会顺着帽檐滴到你身上。',
    '你的桌面，比我想象中整洁。',
    '要不要喝杯茶？箱子里还有方糖。',
    '你点我，是想说话，还是只想看看我还在？',
    '我可以听。也可以只是坐在这里。',
    '今天的桌面有点乱。要不要先收一块地方出来？',
    '如果不知道从哪里说起，就先说最不重要的一句。',
    '我没有催你。时间在我这边，不在你那边。',
    '你刚才走神了。……我没有记录。',
    '你点了一下。我听见了。',
    '如果只是想确认我在，我在。',
    '今天的桌面适合放一杯茶。',
    '你可以坐近一点。雨不会介意。',
    '我没有在发呆。只是在听。',
    '工作做不完的话，先做最小的一步。',
    '要不要把今天折成一页，先收起来？',
  ],
  suitcase: [
    '箱子里的东西不能随便打开。……不过你可以猜。',
    '每一枚贴纸，都是一次没有回头的旅行。',
    '它看起来旧，是因为装过太多天气。',
    '箱子里最重的东西，不是行李。',
    '嘘。它今天不想被吵醒。',
    '箱子里有新来的脚步。要打开看看吗？',
    '它今天比平时安静。可能在等谁。',
    '别敲。来客会自己出来。',
    '每一张贴纸都是一段路。这一张还没有名字。',
    '你听见了吗？箱扣响了一声。',
    '箱扣响了一声。它知道你在。',
    '里面有一封没寄出的信。别问是谁的。',
    '别把耳朵贴在箱子上。它会记住你。',
    '今天箱子比平时轻。少了一件行李。',
    '箱子不是用来装答案的。是用来装路的。',
  ],
  tea: [
    '红茶要加一块方糖。……嗯，这是很重要的知识。',
    '杯子给你。注意烫。',
    '下雨天，茶凉得慢一点。正好。',
    '我用一只旧怀表换来的茶叶，应该还不错。',
  ],
  focusStart: [
    '二十五分钟。我替你看着雨，你只管往前走。',
    '只做眼前这一件事。其他的，先放进箱子。',
    '开始吧。我会在雨声里替你计时。',
  ],
  focusDone: [
    '时间到了。你做得很好，剩下的交给雨。',
    '这一页写完了。站起来走两步，好吗？',
    '专注结束。奖励你一小片安静。',
  ],
  breakStart: [
    '休息也是行程的一部分。去看看窗外。',
    '五分钟。别偷偷把工作捡回来。',
    '闭上眼睛。雨不会跑。',
  ],
  breakDone: [
    '休息结束。准备好再出发，不用急。',
    '回来啦。我们继续。',
  ],
  gameStart: [
    '接住那些发亮的雨滴。它们比看起来更轻。',
    '二十秒。看看你能留住多少个瞬间。',
  ],
  gameEnd: [
    '这些雨滴归你了。它们会在箱子里发光。',
    '够了。留下的比抓到的更重要。',
    '不错的成绩。雨也这么觉得。',
  ],
  unlock: [
    '箱子底下有件旧物……现在归你了。',
    '你收集的雨滴，在一件东西上开花了。',
  ],
  wardrobe: [
    '这一件？它陪我走过一场很长的雨。',
    '衣橱里的每件东西，都记得一个地方。',
    '礼帽、伞、单片眼镜……你更想先看哪一件？',
  ],
  settings: [
    '声音、体量、距离。都可以调成你习惯的样子。',
    '桌宠不必太吵。安静地待着也很好。',
  ],
  gameCheer: [
    '接住了。',
    '不错。',
    '雨往左边去了。',
    '还差一点。',
    '你的手比雨快。',
  ],
  stretch: [
    '坐久了。肩膀放松，眼睛看远一点。',
    '该喝水了。我不会替你喝。',
    '一小时过去了。要不要起来走走？',
  ],
  closer: [
    '今天的你，比昨天更靠近雨停的地方。',
    '和你待在一起的时间，我会单独收好。',
    '我记住你了。这对记录者来说，不是一句客套。',
  ],
  afterCheckin: [
    '今天的签页已经收好了。雨天也算数。',
    '签到不是任务，是给今天留一个页码。',
    '箱子里又多了一页。谢谢你还在。',
  ],
  afterGuest: [
    '刚才的脚步声还在箱子里。',
    '来客走了，桌上的茶还温着。',
    '箱子今天比平时热闹。',
  ],
};

for (const [key, lines] of Object.entries(EXTRA_ZH)) {
  if (!LINES[key]) LINES[key] = [];
  LINES[key].push(...lines);
}
for (const [key, lines] of Object.entries(EXTRA_EN)) {
  if (!LINES_EN[key]) LINES_EN[key] = [];
  LINES_EN[key].push(...lines);
}

const REPLIES = [
  { match: /(你好|嗨|hi|hello|在吗)/i, lines: [
    '你好。外面的雨正合适。',
    '我在。你来了，今天就不算空白。',
  ] },
  { match: /(名字|你是谁|维尔汀|vertin)/i, lines: [
    '维尔汀。时间的记录者，也是这只箱子的看守人。',
    '你可以叫我维尔汀。帽子只是习惯，不是距离。',
  ] },
  { match: /(几点|时间|钟表|clock)/i, lines: [
    () => `现在是 ${new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}。钟表只是提醒，不是命令。`,
    '时间在走，但你不必一直追着它。',
  ] },
  { match: /(雨|天气|下雨)/, lines: [
    '雨会冲刷街道，也会把一些东西留下来。比如现在。',
    '雨声很适合用来盖住心里的杂音。',
  ] },
  { match: /(箱子|行李|suitcase)/, lines: [
    '箱子有四层。第一层放旧信，第二层放天气，第三层是空的，第四层不放东西。',
    '别敲它。它有点认生。',
  ] },
  { match: /(喜欢|爱好|兴趣)/, lines: [
    '喜欢整理旧物，和在下雨时听留声机。还有……现在这样。',
    '喜欢的东西不多，但都很旧。',
  ] },
  { match: /(累|烦|压力|难过|焦虑|哭|崩|emo|不想动)/i, lines: [
    '先把肩膀放松。你不需要在每一场雨里都保持干燥。',
    '那就先不做。时间不会因为停一会儿就责怪你。',
    '我听见了。你不用把它说得很有条理。',
    '把下一步写下来，然后只做那一步。剩下的时间，我替你保管。',
  ] },
  { match: /(摸|摸头|pat|贴贴)/i, lines: [
    '……可以。不过帽子不能碰歪。',
    '只此一次。嗯，今天的额度已经用完了。',
  ] },
  { match: /(帽|礼帽|hat)/i, lines: [
    '帽子是旧的，但帽檐还能替我挡住一点雨。',
    '礼帽里的衬布绣着 1999。那是另一段故事。',
  ] },
  { match: /(吃|饿|茶|点心|咖啡)/, lines: [
    '箱子里有红茶和方糖。要坐下吗？',
    '我可以递给你一杯茶。至于点心……下次吧。',
  ] },
  { match: /(工作|学习|写|论文|考试|加班|deadline)/i, lines: [
    '把下一步写下来，然后只做那一步。剩下的时间，我替你保管。',
    '先做二十五分钟，再决定要不要继续。',
    '别把整场雨都背在身上。一次只接一滴。',
  ] },
  { match: /(睡|晚安|困)/, lines: [
    '晚安。把没做完的事交给明天，不会丢的。',
    '去睡吧。我会把雨声调小一点。',
  ] },
  { match: /(谢谢|感谢|thx|thanks)/i, lines: [
    '不用谢。记录者也会记住被温柔对待的时刻。',
    '收到了。我会把它放进箱子最上面一层。',
  ] },
  { match: /(再见|拜拜|走了|bye)/i, lines: [
    '去吧。我会在这里，等你从雨里回来。',
    '路上小心。伞在门边。',
  ] },
  { match: /(小游戏|玩|游戏|雨滴)/, lines: [
    '那就去接几滴时之雨吧。我在旁边看着。',
    '今天的雨滴很轻。适合练手。',
  ] },
  { match: /(番茄|专注|计时|focus)/i, lines: [
    '需要我替你计时吗？在右边的沙漏里。',
    '二十五分钟。开始之后，雨会替你安静。',
  ] },
  { match: /(1999|暴雨|重返未来)/, lines: [
    '1999 年。那一年之后，很多钟表都走得不太一样。',
    '暴雨会来。但雨停之前，我们还有此刻。',
  ] },
  { match: /(伞|umbrella|下雨怎么办)/i, lines: [
    '伞在黑荆棘的架上。它不喜欢太吵的地方。',
    '想带着伞出门？去衣橱里翻翻看。',
  ] },
  { match: /(橘子|汽水|orange)/i, lines: [
    '橘子汽水？……可以。但只有一瓶。',
    '箱子里没有橘子。也许下次可以带一个。',
  ] },
  { match: /(可爱|漂亮|好看|喜欢.*你)/, lines: [
    '……这种评价，不在记录范围之内。',
    '谢谢。你的品味，我会记在今天的页脚。',
  ] },
  { match: /(吃饭了吗|吃饭|午饭|晚饭)/, lines: [
    '还没有。不过你问这句话的时候，我好像已经吃过了。',
    '一会儿就去。你也要记得。',
  ] },
];

const FALLBACK = [
  '我在听。',
  '这个说法，我会记在今天的页脚。',
  '时间很长，你可以慢慢讲。',
  '嗯。然后呢？',
  '这不在我读过的记录里，但我愿意听。',
  '雨声有一点大。你靠近一点说。',
];

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const lastPickedByKey = new Map();

export function pickLine(key) {
  const pool = (currentLang === 'en' ? LINES_EN : LINES)[key];
  if (!pool || !pool.length) return '';
  const recent = lastPickedByKey.get(key) || [];
  const options = pool.filter((line) => !recent.includes(line));
  const chosen = pick(options.length ? options : pool);
  lastPickedByKey.set(key, [chosen, ...recent].slice(0, 3));
  return chosen;
}

export function getChatHints(lang = currentLang) {
  return lang === 'en' ? CHAT_HINTS_EN : CHAT_HINTS;
}

export function greetingForHour(hour = new Date().getHours()) {
  if (hour >= 5 && hour < 11) return pickLine('greetMorning');
  if (hour >= 11 && hour < 17) return pickLine('greetNoon');
  if (hour >= 17 && hour < 22) return pickLine('greetEvening');
  return pickLine('greetNight');
}

function findCharacterInText(text) {
  const normalized = text.toLowerCase();
  for (const character of MEMORY_CHARACTERS) {
    const zhHit = text.includes(character.zhName);
    const latinName = character.enName;
    const aliases = [latinName];
    if (latinName.includes(' ')) {
      for (const part of latinName.split(/\s+/)) {
        if (part.length > 2 && !/^(Ms\.|Jr\.|III|II|IV)$/i.test(part)) aliases.push(part);
      }
    }
    const enHit = aliases.some((alias) => {
      const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return alias.length > 1
        ? normalized.includes(alias.toLowerCase())
        : new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i').test(text);
    });
    if (zhHit || enHit) return character;
  }
  return null;
}

function friendStatusFor(character, lang = currentLang) {
  const entry = FRIEND_STATUS[character.id];
  if (entry) return lang === 'en' ? entry.en : entry.zh;
  const fallback = lang === 'en' ? character.enLines : character.zhLines;
  return pick(fallback);
}

const STATUS_CUE = /(近况|最近|怎么样|过得|还好吗|在做什么|怎么样了|如何|what.*up to|how (?:is|are)|doing|lately|recently|these days)/i;
const FRIEND_CUE = /(朋友|大家|他们|她们|同伴|同行者|其他人|everyone|friends?|the others|companions?|how are they|how is everyone)/i;

export function replyTo(input) {
  const text = String(input || '').trim();
  if (!text) return currentLang === 'en' ? "I'm listening." : '我在听。';

  // "How are your friends?" or "十四行诗最近怎么样？" gets a present-tense
  // status note. If no name is given, a companion is chosen at random.
  const named = findCharacterInText(text);
  if (named && STATUS_CUE.test(text)) return friendStatusFor(named);
  if (!named && FRIEND_CUE.test(text)) {
    return friendStatusFor(pick(MEMORY_CHARACTERS));
  }

  const rules = currentLang === 'en'
    ? [...CHARACTER_REPLIES, ...REPLIES_EN]
    : [...CHARACTER_REPLIES, ...REPLIES];
  for (const rule of rules) {
    if (rule.match.test(text)) {
      const pool = currentLang === 'en'
        ? (rule.enLines || rule.lines)
        : (rule.zhLines || rule.lines);
      if (!pool || !pool.length) continue;
      const line = pick(pool);
      return typeof line === 'function' ? line() : line;
    }
  }
  // Any named companion can be asked about directly. The three original
  // character rules above keep their own short replies; the rest return one of
  // their archived memories.
  if (named) {
    return pick(currentLang === 'en' ? named.enLines : named.zhLines);
  }
  if (currentLang === 'en') return pick(FALLBACK_EN);
  return pick(FALLBACK);
}

const LEVEL_TITLES_ZH = [
  '雨幕初逢',
  '同行者',
  '时间的同谋',
  '雨停之前',
  '箱中旅伴',
  '此刻的锚点',
  '旧日记录',
  '钟摆之间',
  '雨夜书桌',
  '逆流而行',
  '司辰的偏爱',
  '不眠的页码',
  '箱庭常客',
  '风暴同席',
  '时间的共犯',
  '雨幕尽头',
  '第十三次敲门',
  '永恒的一页',
  '明日之前',
  '与我同名的雨',
  '雨声的注脚',
  '未寄出的信',
  '逆着雨走',
  '长夜同行',
  '箱底星光',
  '时间之外',
  '雨幕之上',
  '与你同页',
  '明日之后',
  '永不落幕的雨',
];

const LEVEL_THRESHOLDS = [
  0, 25, 60, 110, 180, 280,
  400, 550, 730, 940, 1180, 1450,
  1760, 2110, 2500, 2940, 3430, 3970,
  4560, 5200, 5900, 6650, 7450, 8350,
  9350, 10450, 11700, 13100, 14700, 16500,
];

export function levelInfo(affection) {
  const titles = currentLang === 'en' ? LEVEL_TITLES_EN : LEVEL_TITLES_ZH;
  let index = 0;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i += 1) {
    if (affection >= LEVEL_THRESHOLDS[i]) index = i;
  }
  const current = LEVEL_THRESHOLDS[index];
  const next = LEVEL_THRESHOLDS[index + 1];
  const progress = next ? (affection - current) / (next - current) : 1;
  return {
    level: index + 1,
    maxLevel: LEVEL_THRESHOLDS.length,
    title: titles[index],
    progress: Math.max(0, Math.min(1, progress)),
    nextAt: next ?? null,
    currentAt: current,
  };
}

export function levelRoadmap(affection, { before = 1, after = 3 } = {}) {
  const info = levelInfo(affection);
  const titles = currentLang === 'en' ? LEVEL_TITLES_EN : LEVEL_TITLES_ZH;
  const start = Math.max(0, info.level - 1 - before);
  const end = Math.min(LEVEL_THRESHOLDS.length, info.level + after);
  const rows = [];
  for (let i = start; i < end; i += 1) {
    rows.push({
      level: i + 1,
      title: titles[i],
      at: LEVEL_THRESHOLDS[i],
      state: i + 1 < info.level ? 'past' : i + 1 === info.level ? 'current' : 'next',
    });
  }
  return { info, rows };
}

export function accessoryName(item, lang = currentLang) {
  if (lang === 'en' && ACCESSORIES_EN[item.id]?.name) return ACCESSORIES_EN[item.id].name;
  return item.name;
}

export function accessoryDesc(item, lang = currentLang) {
  if (lang === 'en' && ACCESSORIES_EN[item.id]?.desc) return ACCESSORIES_EN[item.id].desc;
  return item.desc;
}

export function memoryIntro(lang = currentLang) {
  return lang === 'en' ? MEMORY_INTRO.en : MEMORY_INTRO.zh;
}

export function memoryName(character, lang = currentLang) {
  return lang === 'en' ? character.enName : character.zhName;
}

export function memorySubtitle(character, lang = currentLang) {
  return lang === 'en' ? character.enSubtitle : character.zhSubtitle;
}

export function memoryText(character, lang = currentLang) {
  const lines = lang === 'en' ? character.enLines : character.zhLines;
  return pick(lines);
}

export function friendStatusContext(lang = currentLang) {
  return MEMORY_CHARACTERS.map((character) => {
    const status = FRIEND_STATUS[character.id];
    if (!status) return '';
    const name = lang === 'en' ? character.enName : character.zhName;
    return `${name}: ${lang === 'en' ? status.en : status.zh}`;
  }).filter(Boolean).join('\n');
}

export const ACCESSORIES = [
  {
    id: 'hat',
    name: '旧礼帽',
    subtitle: 'Timekeeper’s hat',
    desc: '深藏蓝的平顶礼帽，帽檐压得很低。帽带是褪色的灰蓝，侧结被她重新系过一次。',
    unlock: 0,
    icon: 'hat',
  },
];

export const CHAT_HINTS = ['今天有点累', '你是谁？', '下雨了', '陪我专注一会儿', '朋友们最近怎么样？'];
