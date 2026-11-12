import { PetScene } from './scene.js';
import { PetAudio } from './audio.js';
import { ARCHIVE_CHARACTERS, ARCHIVE_META, ARCHIVE_NPCS } from './archive.data.js';
import { CHARACTER_DOSSIERS, dossierForCharacter, dossierForName } from './dossiers.js';
import { GUEST_CHARACTERS, guestById } from './characters.data.js';
import { DIALOGUE_EVAL_CASES } from './dialogue.eval.js';
import {
  DEFAULT_WARDROBE, WARDROBE_GROUPS, WARDROBE_ITEMS, WARDROBE_SLOTS,
  wardrobeItemById, wardrobeItemsForGroup,
} from './wardrobe.data.js';
import { setLanguage, translate } from './i18n.js';
import {
  ACCESSORIES, MEMORY_CHARACTERS, accessoryDesc, accessoryName, friendStatusContext,
  getChatHints, greetingForHour, levelInfo, levelRoadmap, memoryIntro, memoryName, memorySubtitle,
  memoryText, pickLine, replyTo, setDialogueLanguage,
} from './dialogue.js';

const MUSICBOX_LEVEL = 8;
const MUSIC_TRACKS = [
  {
    id: 'rain-on-the-case',
    file: '../assets/music-box/rain-on-the-case.wav',
    title: { zh: '雨落在箱上', en: 'Rain on the Case' },
    subtitle: { zh: '音乐盒 · 32 秒循环', en: 'Music box · 32s loop' },
  },
  {
    id: 'page-turns',
    file: '../assets/music-box/page-turns.wav',
    title: { zh: '翻页', en: 'The Page Turns' },
    subtitle: { zh: '音乐盒圆舞曲 · 31 秒循环', en: 'Music-box waltz · 31s loop' },
  },
  {
    id: 'until-rain-stops',
    file: '../assets/music-box/until-rain-stops.wav',
    title: { zh: '直到雨停', en: 'Until the Rain Stops' },
    subtitle: { zh: '氛围音乐盒 · 34 秒循环', en: 'Ambient music box · 34s loop' },
  },
];
const MUSIC_CREDIT = 'Original music-box loops · made locally';
const MEMORY_CATEGORIES = [
  { id: 'preference', zh: '偏好', en: 'Preference' },
  { id: 'project', zh: '正在做', en: 'In progress' },
  { id: 'date', zh: '重要日期', en: 'Important date' },
  { id: 'other', zh: '其他', en: 'Other' },
];
const MEMORY_CATEGORY_IDS = new Set(MEMORY_CATEGORIES.map((category) => category.id));
const MAX_PINNED_MEMORIES = 3;

/* -------------------------------------------------------------------------- */
/* Icons — tiny 16px pixel glyphs, drawn inline so the app stays offline.      */
/* -------------------------------------------------------------------------- */

const ICONS = {
  chat: '<rect x="2" y="3" width="12" height="8" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M5 11v2l3-2" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="4" y="5" width="2" height="1" fill="currentColor"/><rect x="7" y="5" width="5" height="1" fill="currentColor"/><rect x="4" y="7" width="4" height="1" fill="currentColor"/>',
  hourglass: '<path d="M4 2.5h8M4 13.5h8M5 3v2.2L8 8l3-2.8V3M5 13v-2.2L8 8l3 2.8V13" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="7" y="9" width="2" height="2" fill="currentColor"/>',
  droplet: '<path d="M8 1.7 4.2 6.9a4.8 4.8 0 0 0 7.6 0L8 1.7Z" fill="none" stroke="currentColor" stroke-width="1.25"/><path d="M5.9 9.2a2.2 2.2 0 0 0 2 1.8" fill="none" stroke="currentColor" stroke-width="1"/>',
  hanger: '<path d="M8 2.2a1.4 1.4 0 1 1 1.4 1.4c-.8 0-1.4.5-1.4 1.3v.4L2.5 9.1v2.3h11V9.1L8 5.3" fill="none" stroke="currentColor" stroke-width="1.25"/><path d="M5 13h6" stroke="currentColor" stroke-width="1.1"/>',
  gear: '<path d="M6.1 1.8h3.8l.3 1.6 1.2.7 1.6-.4 1.9 3.3-1.2 1.1v1.4l1.2 1.1-1.9 3.3-1.6-.4-1.2.7-.3 1.6H6.1l-.3-1.6-1.2-.7-1.6.4L1.1 11l1.2-1.1V8.5L1.1 7.4 3 4.1l1.6.4 1.2-.7.3-1.6Z" fill="none" stroke="currentColor" stroke-width="1.15"/><rect x="6" y="6" width="4" height="4" fill="none" stroke="currentColor" stroke-width="1.2"/>',
  eyeoff: '<path d="M2 8s2.4-4.2 6-4.2c1 0 1.9.2 2.7.6M14 8s-2.4 4.2-6 4.2c-1 0-1.9-.2-2.7-.6" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M3 2.5 13 13.5" stroke="currentColor" stroke-width="1.2"/><rect x="6.5" y="7" width="3" height="2" fill="currentColor"/>',
  send: '<path d="M2.5 8 13.5 3l-3 10-2.2-4.1L2.5 8Z" fill="currentColor"/><path d="M8.3 8.9 13.5 3" stroke="#08131e" stroke-width="1"/>',
  heart: '<path d="M8 13.2 3.4 8.9A2.7 2.7 0 0 1 8 5.1a2.7 2.7 0 0 1 4.6 3.8L8 13.2Z" fill="none" stroke="currentColor" stroke-width="1.25"/>',
  lock: '<rect x="3.5" y="7" width="9" height="6.5" fill="none" stroke="currentColor" stroke-width="1.25"/><path d="M5.4 7V5.2a2.6 2.6 0 0 1 5.2 0V7" fill="none" stroke="currentColor" stroke-width="1.25"/><rect x="7" y="9.4" width="2" height="2" fill="currentColor"/>',
  tea: '<path d="M3 6.5h8.2v3.2a3.5 3.5 0 0 1-3.5 3.5H6.5A3.5 3.5 0 0 1 3 9.7V6.5Z" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M11.2 7.4h1.1a1.7 1.7 0 0 1 0 3.4h-1.1M4.7 4.5c-.7-.7.7-1.2 0-2M7.2 4.5c-.7-.7.7-1.2 0-2" fill="none" stroke="currentColor" stroke-width="1.1"/>',
  book: '<path d="M2.5 3.2h4.2c.7 0 1.3.5 1.3 1.2v8.4c0-.7-.6-1.2-1.3-1.2H2.5V3.2ZM13.5 3.2H9.3c-.7 0-1.3.5-1.3 1.2v8.4c0-.7.6-1.2 1.3-1.2h4.2V3.2Z" fill="none" stroke="currentColor" stroke-width="1.15"/>',
  hat: '<path d="M5.1 2.5h5.8v6.4H5.1V2.5ZM2.3 9h11.4v2H2.3V9Z" fill="none" stroke="currentColor" stroke-width="1.2"/><rect x="5.1" y="6.5" width="5.8" height="1.7" fill="currentColor"/>',
  umbrella: '<path d="M2 8a6 6 0 0 1 12 0H2Z" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M8 8v4.5c0 1.4 2.4 1.4 2.4 0" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M8 1.8V2" stroke="currentColor" stroke-width="1.5"/>',
  monocle: '<rect x="4.5" y="4.5" width="7" height="6.5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M10.7 11.5c1.1 1 1.4 1.8 1.2 2.5" fill="none" stroke="currentColor" stroke-width="1.1"/><rect x="6.5" y="6.5" width="2" height="2" fill="currentColor"/>',
  bird: '<path d="M2.5 9.5 6 7.5l2.2.4 1.4-2.2 2.1.2.8 2.1-1.5 2.5-3.7.9-2.4-.7-2.4 1.1Z" fill="none" stroke="currentColor" stroke-width="1.1"/><rect x="10.2" y="4.9" width="1.2" height="1.2" fill="currentColor"/>',
  reset: '<path d="M3.2 5.2A5.5 5.5 0 1 1 2.7 10" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M2 2.5v3.7h3.7" fill="none" stroke="currentColor" stroke-width="1.3"/>',
  power: '<path d="M8 2v6" stroke="currentColor" stroke-width="1.4"/><path d="M4.5 3.9a5.2 5.2 0 1 0 7 0" fill="none" stroke="currentColor" stroke-width="1.3"/>',
  volume: '<path d="M2.5 6.2h2.2L8 3.5v9L4.7 9.8H2.5V6.2Z" fill="currentColor"/><path d="M10 6c1 .6 1 3.4 0 4M12 4.4c2 1.5 2 5.7 0 7.2" fill="none" stroke="currentColor" stroke-width="1.1"/>',
  muted: '<path d="M2.5 6.2h2.2L8 3.5v9L4.7 9.8H2.5V6.2Z" fill="currentColor"/><path d="m10.2 5.5 4.4 4.4m0-4.4-4.4 4.4" fill="none" stroke="currentColor" stroke-width="1.2"/>',
  pause: '<rect x="4" y="3" width="2.6" height="10" fill="currentColor"/><rect x="9.4" y="3" width="2.6" height="10" fill="currentColor"/>',
  play: '<path d="M5 3.2 13 8l-8 4.8V3.2Z" fill="currentColor"/>',
  voice: '<rect x="5" y="2.5" width="6" height="8" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M3.5 8.5a4.5 4.5 0 0 0 9 0M8 13v1.5" fill="none" stroke="currentColor" stroke-width="1.1"/>',
  pin: '<path d="M8 14s4.3-4.3 4.3-7.2A4.3 4.3 0 0 0 3.7 6.8C3.7 9.7 8 14 8 14Z" fill="none" stroke="currentColor" stroke-width="1.2"/><rect x="6.9" y="5.7" width="2.2" height="2.2" fill="currentColor"/>',
  camera: '<rect x="2.3" y="4.7" width="11.4" height="8.2" fill="none" stroke="currentColor" stroke-width="1.2"/><rect x="5.8" y="3.2" width="4.4" height="1.7" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="8" cy="8.8" r="2.3" fill="none" stroke="currentColor" stroke-width="1.2"/><rect x="11.8" y="6.2" width="1" height="1" fill="currentColor"/>',
  calendar: '<rect x="2.6" y="3.4" width="10.8" height="10" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M2.6 6.2h10.8M5.3 2.2v2.4M10.7 2.2v2.4" fill="none" stroke="currentColor" stroke-width="1.2"/><rect x="5" y="8.1" width="1.5" height="1.5" fill="currentColor"/><rect x="8.2" y="8.1" width="1.5" height="1.5" fill="currentColor"/><rect x="5" y="10.5" width="1.5" height="1.5" fill="currentColor"/>',
  suitcase: '<rect x="2.5" y="5.2" width="11" height="8.4" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M5.2 5.2V3.8h5.6v1.4M2.5 8.1h11M7.1 8.1h1.8v2.2H7.1z" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M4.2 5.2v8.4M11.8 5.2v8.4" stroke="currentColor" stroke-width="0.8"/>',
  music: '<path d="M6.1 11.8V4.2l6-1.3v7.4" fill="none" stroke="currentColor" stroke-width="1.2"/><ellipse cx="4.8" cy="12" rx="1.8" ry="1.2" fill="currentColor"/><ellipse cx="10.8" cy="10.4" rx="1.8" ry="1.2" fill="currentColor"/>',
  spark: '<path d="M8 1.5 9.3 6 13.5 8 9.3 10 8 14.5 6.7 10 2.5 8 6.7 6 8 1.5Z" fill="currentColor"/>',
  info: '<rect x="7.2" y="3.5" width="1.6" height="1.6" fill="currentColor"/><rect x="7.1" y="6.7" width="1.8" height="6" fill="currentColor"/><rect x="3" y="2" width="10" height="12" fill="none" stroke="currentColor" stroke-width="1.1"/>',
  check: '<path d="m3 8 3.2 3L13 4" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  close: '<path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.3"/>',
  menu: '<path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" stroke="currentColor" stroke-width="1.4"/>',
  more: '<circle cx="3.2" cy="8" r="1.1" fill="currentColor"/><circle cx="8" cy="8" r="1.1" fill="currentColor"/><circle cx="12.8" cy="8" r="1.1" fill="currentColor"/>',
  profile: '<rect x="3" y="2.5" width="10" height="11" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="6.2" r="1.8" fill="none" stroke="currentColor" stroke-width="1.1"/><path d="M5.1 11.2c.4-1.8 1.5-2.7 2.9-2.7s2.5.9 2.9 2.7" fill="none" stroke="currentColor" stroke-width="1.1"/>',
  clock: '<circle cx="8" cy="8" r="5.6" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M8 4.7V8l2.2 1.4" fill="none" stroke="currentColor" stroke-width="1.1"/>',
  help: '<circle cx="8" cy="8" r="5.7" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M6.2 6.2a1.9 1.9 0 1 1 2.8 1.7c-.6.3-1 .8-1 1.4v.3" fill="none" stroke="currentColor" stroke-width="1.1"/><rect x="7.3" y="11.1" width="1.4" height="1.4" fill="currentColor"/>',
};

function icon(name) {
  const body = ICONS[name] || ICONS.spark;
  return `<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">${body}</svg>`;
}

function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach((el) => {
    el.innerHTML = icon(el.dataset.icon);
  });
}

/* -------------------------------------------------------------------------- */
/* Persistence                                                                */
/* -------------------------------------------------------------------------- */

const STORAGE_KEY = 'vertin-deskpet-state-v1';
const DAY_MS = 86400000;
const toDayKey = (value = Date.now()) => {
  const d = new Date(value);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function defaultState() {
  return {
    version: 1,
    seenWelcome: false,
    seenOnboarding: false,
    seenUiHint: false,
    settings: {
      sound: true,
      voice: false,
      volume: 0.42,
      rain: false,
      showClock: false,
      petScale: 0.25,
      language: 'zh',
      alwaysOnTop: true,
      autoStart: false,
      compact: false,
      proactive: 'normal',
      rememberTopic: true,
    },
    accessories: {
      hat: true,
    },
    wardrobe: { ...DEFAULT_WARDROBE },
    stats: {
      affection: 0,
      pats: 0,
      droplets: 0,
      clearDrops: 0,
      crystalDrops: 0,
      focusMinutes: 0,
      focusSessions: 0,
      games: 0,
      bestScore: 0,
      unlocked: ['hat'],
      metAt: Date.now(),
      lastSeenDay: '',
      focusDay: '',
      focusToday: 0,
      focusTodaySessions: 0,
      focusDays: {},
      dossiersRead: [],
      today: {
        day: '',
        interactions: 0,
        chats: 0,
        focusMinutes: 0,
        focusSessions: 0,
        games: 0,
      },
    },
    memories: [],
    wardrobePresets: [null, null, null],
    photos: [],
    checkin: {
      lastClaimDay: '',
      streak: 0,
      total: 0,
      lastReward: null,
      history: [],
      milestones: [],
    },
    summon: {
      seen: [],
      counts: {},
      lastIds: [],
      lastAt: 0,
      total: 0,
      announced: false,
    },
    musicBox: {
      track: 'rain-on-the-case',
      volume: 0.35,
      loop: true,
      sleepMinutes: 0,
      announced: false,
    },
    companion: {
      lastSeenAt: 0,
      lastTopic: null,
      lastTopicPromptAt: 0,
      topics: [],
      recentEvents: [],
      pendingFocus: null,
      pendingMoment: null,
      lastPhoto: null,
      lastProactiveAt: 0,
      proactiveDay: '',
      proactiveCount: 0,
      chatTurns: 0,
      summaries: [],
    },
    focus: {
      mode: 'focus',
      duration: 1500,
      remaining: 1500,
      running: false,
      endAt: null,
      task: '',
      cycle: 0,
      autoNext: false,
    },
  };
}

function mergeState(base, saved) {
  if (Array.isArray(base)) return Array.isArray(saved) ? saved : base;
  if (base && typeof base === 'object') {
    const out = { ...base };
    if (saved && typeof saved === 'object') {
      for (const key of Object.keys(saved)) {
        out[key] = key in base ? mergeState(base[key], saved[key]) : saved[key];
      }
    }
    return out;
  }
  return saved === undefined ? base : saved;
}

function normalizeMemories(list) {
  let pinnedCount = 0;
  return (Array.isArray(list) ? list : [])
    .filter((memory) => memory && typeof memory.text === 'string' && memory.text.trim())
    .slice(0, 20)
    .map((memory) => {
      let pinned = Boolean(memory.pinned);
      if (pinned && pinnedCount >= MAX_PINNED_MEMORIES) pinned = false;
      if (pinned) pinnedCount += 1;
      return {
        id: memory.id || `memory-${memory.at || Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
        text: String(memory.text).replace(/\s+/g, ' ').trim().slice(0, 120),
        at: Number(memory.at) || Date.now(),
        category: MEMORY_CATEGORY_IDS.has(memory.category) ? memory.category : 'other',
        pinned,
      };
    });
}

function loadState() {
  const base = defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const saved = JSON.parse(raw);
    const merged = mergeState(base, saved);
    // Existing installations should not be interrupted by a first-run guide.
    if (!Object.prototype.hasOwnProperty.call(saved, 'seenOnboarding')) {
      merged.seenOnboarding = Boolean(saved.seenWelcome);
    }
    return merged;
  } catch {
    return base;
  }
}

let state = loadState();
const envLanguage = window.petAPI?.envLanguage;
if (envLanguage === 'en' || envLanguage === 'zh') state.settings.language = envLanguage;
const uiLang = () => (state.settings.language === 'en' ? 'en' : 'zh');
const isEN = () => uiLang() === 'en';
setDialogueLanguage(uiLang());
setLanguage(uiLang());

state.memories = Array.isArray(state.memories)
  ? normalizeMemories(state.memories)
  : [];
state.photos = Array.isArray(state.photos) ? state.photos : [];
state.checkin = {
  lastClaimDay: '',
  streak: 0,
  total: 0,
  lastReward: null,
  history: [],
  milestones: [],
  ...(state.checkin && typeof state.checkin === 'object' ? state.checkin : {}),
};
state.wardrobePresets = Array.isArray(state.wardrobePresets)
  ? [...state.wardrobePresets, null, null, null].slice(0, 3)
  : [null, null, null];
state.companion.topics = Array.isArray(state.companion.topics) ? state.companion.topics : [];
state.companion.chatTurns = Math.max(0, Math.floor(Number(state.companion.chatTurns) || 0));
state.companion.summaries = (Array.isArray(state.companion.summaries) ? state.companion.summaries : [])
  .filter((summary) => summary && typeof summary.text === 'string' && summary.text.trim())
  .slice(0, 8)
  .map((summary, index) => ({
    ...summary,
    id: summary.id || `summary-${summary.at || Date.now()}-${index}`,
    at: Number(summary.at) || Date.now(),
    turns: Math.max(1, Math.floor(Number(summary.turns) || 12)),
  }));
state.focus.mode = state.focus.mode === 'break'
  ? 'shortBreak'
  : (['focus', 'shortBreak', 'longBreak'].includes(state.focus.mode) ? state.focus.mode : 'focus');
state.focus.cycle = Math.max(0, Math.min(4, Math.floor(Number(state.focus.cycle) || 0)));
state.focus.autoNext = Boolean(state.focus.autoNext);
state.stats.focusTodaySessions = Math.max(0, Math.floor(Number(state.stats.focusTodaySessions) || 0));
state.stats.focusDays = state.stats.focusDays && typeof state.stats.focusDays === 'object' ? state.stats.focusDays : {};
for (const [day, minutes] of Object.entries(state.stats.focusDays)) {
  const safe = Math.max(0, Math.floor(Number(minutes) || 0));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !safe) delete state.stats.focusDays[day];
  else state.stats.focusDays[day] = safe;
}
if (state.stats.today && !Number.isFinite(Number(state.stats.today.focusSessions))) {
  state.stats.today.focusSessions = 0;
}
state.summon = {
  seen: [],
  counts: {},
  lastIds: [],
  lastAt: 0,
  total: 0,
  announced: false,
  ...(state.summon && typeof state.summon === 'object' ? state.summon : {}),
};
state.summon.seen = Array.isArray(state.summon.seen)
  ? state.summon.seen.filter((id) => guestById(id))
  : [];
state.summon.lastIds = Array.isArray(state.summon.lastIds) ? state.summon.lastIds.filter((id) => guestById(id)).slice(0, 6) : [];
state.summon.counts = state.summon.counts && typeof state.summon.counts === 'object' ? state.summon.counts : {};
state.summon.total = Math.max(0, Math.floor(Number(state.summon.total) || 0));
state.summon.lastAt = Number(state.summon.lastAt) || 0;
state.summon.announced = Boolean(state.summon.announced);

state.musicBox = {
  track: 'rain-on-the-case',
  volume: 0.35,
  loop: true,
  sleepMinutes: 0,
  announced: false,
  ...(state.musicBox && typeof state.musicBox === 'object' ? state.musicBox : {}),
};
state.musicBox.track = MUSIC_TRACKS.some((track) => track.id === state.musicBox.track)
  ? state.musicBox.track
  : MUSIC_TRACKS[0].id;
state.musicBox.volume = Math.max(0, Math.min(1, Number(state.musicBox.volume) || 0));
state.musicBox.loop = Boolean(state.musicBox.loop);
state.musicBox.sleepMinutes = Math.max(0, Math.min(180, Number(state.musicBox.sleepMinutes) || 0));
state.musicBox.announced = Boolean(state.musicBox.announced);

state.seenOnboarding = Boolean(state.seenOnboarding);
const oldSeenDay = state.stats.lastSeenDay;
const isFirstVisit = !state.seenWelcome;
const previousSeenAt = state.companion.lastSeenAt || 0;
state.stats.lastSeenDay = toDayKey();
state.seenWelcome = true;
state.companion.lastSeenAt = Date.now();

const bridge = window.petAPI || {
  isElectron: false,
  beginDrag() {},
  endDrag() {},
  setIgnoreMouse() {},
  hide() {},
  quit() {},
  resetPosition() {},
  setAlwaysOnTop: async (v) => v,
  setAutoStart: async (v) => v,
  setCompact: async (v) => ({ compact: v }),
  setHitRegions: () => {},
  setLanguage: () => {},
  ensureVisible: async () => false,
  getRuntimeInfo: async () => ({ version: 'web-preview', capture: false }),
  notify: async () => false,
  openExternal: async () => false,
  onCommand: () => () => {},
};

let saveTimer = null;
function saveSoon() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveNow, 180);
}

function saveNow() {
  clearTimeout(saveTimer);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* storage may be full; the pet still works */ }
}

function touchToday() {
  const key = toDayKey();
  if (!state.stats.today || state.stats.today.day !== key) {
    state.stats.today = { day: key, interactions: 0, chats: 0, focusMinutes: 0, focusSessions: 0, games: 0 };
  }
  return state.stats.today;
}

function recordCompanionEvent(type, data = {}) {
  const event = { type, at: Date.now(), ...data };
  const list = Array.isArray(state.companion.recentEvents) ? state.companion.recentEvents : [];
  state.companion.recentEvents = [event, ...list].slice(0, 12);
  saveSoon();
  return event;
}

function markProactiveSpeech() {
  const today = touchToday();
  if (state.companion.proactiveDay !== today.day) {
    state.companion.proactiveDay = today.day;
    state.companion.proactiveCount = 0;
  }
  state.companion.lastProactiveAt = Date.now();
  state.companion.proactiveCount = (state.companion.proactiveCount || 0) + 1;
  saveSoon();
}

function canProactiveSpeech() {
  const level = state.settings.proactive || 'normal';
  if (level === 'quiet') return false;
  if (panelName || game.active || state.focus.running || bubbleVisible) return false;
  const today = touchToday();
  if (state.companion.proactiveDay !== today.day) {
    state.companion.proactiveDay = today.day;
    state.companion.proactiveCount = 0;
  }
  const cap = level === 'occasional' ? 2 : 5;
  if ((state.companion.proactiveCount || 0) >= cap) return false;
  const cooldown = level === 'occasional' ? 60 * 60000 : 20 * 60000;
  return Date.now() - (state.companion.lastProactiveAt || 0) >= cooldown;
}

function proactiveDelay(kind = 'idle') {
  const level = state.settings.proactive || 'normal';
  if (level === 'quiet') return 6 * 60 * 60000;
  if (level === 'occasional') return (70 + Math.random() * 50) * 60000;
  return kind === 'stretch'
    ? (45 + Math.random() * 25) * 60000
    : (18 + Math.random() * 27) * 60000;
}

function queueCompanionMoment(type, data = {}) {
  state.companion.pendingMoment = { type, at: Date.now(), ...data };
  saveSoon();
}

function flushCompanionMoment() {
  const moment = state.companion.pendingMoment;
  if (!moment) return;
  if (panelName || game.active || state.focus.running || bubbleVisible || !els.composer.hidden) return;
  if (Date.now() - (moment.at || 0) > 20 * 60000) {
    state.companion.pendingMoment = null;
    saveSoon();
    return;
  }
  const key = moment.type === 'checkin'
    ? 'afterCheckin'
    : (moment.type === 'guest' ? 'afterGuest' : (moment.type === 'focus' ? 'afterFocus' : ''));
  state.companion.pendingMoment = null;
  saveSoon();
  if (!key || state.settings.proactive === 'quiet') return;
  say(pickLine(key), { duration: 6200 });
  markProactiveSpeech();
}

function companionEventText(event) {
  if (!event) return '';
  const en = isEN();
  if (event.type === 'focus_complete') {
    return en
      ? `Focused for ${event.minutes || 0} min${event.task ? ` · ${event.task}` : ''}`
      : `专注 ${event.minutes || 0} 分钟${event.task ? ` · ${event.task}` : ''}`;
  }
  if (event.type === 'rain_round') {
    return en
      ? `Rain round · ${event.score || 0} drops`
      : `拾雨 ${event.score || 0} 滴`;
  }
  if (event.type === 'chat_topic') {
    return en ? `Last topic: ${event.topic}` : `最近话题：${event.topic}`;
  }
  if (event.type === 'dossier_read') {
    return en ? `Read dossier: ${event.name}` : `翻阅档案：${event.name}`;
  }
  if (event.type === 'photo') {
    const date = new Date(event.at || Date.now()).toLocaleDateString(en ? 'en-US' : 'zh-CN', { month: 'numeric', day: 'numeric' });
    return en ? `Photo kept · ${date}` : `留影 · ${date}`;
  }
  if (event.type === 'checkin') {
    return en ? `Checked in · day ${event.streak || 1}` : `签到 · 第 ${event.streak || 1} 天`;
  }
  if (event.type === 'guest') {
    return en ? `A guest visited · ${event.name}` : `来客到访 · ${event.name}`;
  }
  return '';
}

function rememberTopic(text) {
  if (!state.settings.rememberTopic) return;
  const topic = String(text || '').replace(/\s+/g, ' ').trim();
  if (topic.length < 4) return;
  const entry = { text: topic.slice(0, 60), at: Date.now() };
  state.companion.lastTopic = entry;
  const previous = Array.isArray(state.companion.topics) ? state.companion.topics : [];
  state.companion.topics = [entry, ...previous.filter((item) => item?.text !== entry.text)].slice(0, 3);
  recordCompanionEvent('chat_topic', { topic: entry.text });
}

function escapeHTML(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/* -------------------------------------------------------------------------- */
/* Elements                                                                   */
/* -------------------------------------------------------------------------- */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const els = {
  app: $('#app'),
  canvas: $('#world'),
  clock: $('#clock'),
  dateText: $('#dateText'),
  ambientText: $('#ambientText'),
  bubble: $('#bubble'),
  bubbleText: $('#bubbleText'),
  suitcase: $('#suitcase'),
  musicBox: $('#musicBox'),
  summonStage: $('#summonStage'),
  summonBackdrop: $('#summonBackdrop'),
  summonPortrait: $('#summonPortrait'),
  summonParallax: $('#summonParallax'),
  summonFigure: $('#summonFigure'),
  guestSparkles: $('#guestSparkles'),
  summonImage: $('#summonImage'),
  summonName: $('#summonName'),
  summonTitle: $('#summonTitle'),
  summonLine: $('#summonLine'),
  summonEyebrow: $('#summonEyebrow'),
  summonDossier: $('#summonDossier'),
  summonAgain: $('#summonAgain'),
  summonClose: $('#summonClose'),
  summonDismiss: $('#summonDismiss'),
  bubbleClose: $('#bubbleClose'),
  memoryPrompt: $('#memoryPrompt'),
  memoryPromptText: $('#memoryPromptText'),
  memoryPromptInput: $('#memoryPromptInput'),
  memoryPromptCategory: $('#memoryPromptCategory'),
  memoryRememberBtn: $('#memoryRememberBtn'),
  memoryEditBtn: $('#memoryEditBtn'),
  memoryForgetBtn: $('#memoryForgetBtn'),
  petHit: $('#petHit'),
  dock: $('#dock'),
  menuToggle: $('#menuToggle'),
  clockNote: $('#clockNote'),
  clockClose: $('#clockClose'),
  composer: $('#composer'),
  chatInput: $('#chatInput'),
  sendBtn: $('#sendBtn'),
  focusChip: $('#focusChip'),
  focusChipTime: $('#focusChipTime'),
  focusChipMode: $('#focusChipMode'),
  focusBadge: $('#focusBadge'),
  gameHud: $('#gameHud'),
  gameClear: $('#gameClear'),
  gameCrystal: $('#gameCrystal'),
  gameCombo: $('#gameCombo'),
  gameClock: $('#gameClock'),
  gamePause: $('#gamePause'),
  gameSound: $('#gameSound'),
  gameStop: $('#gameStop'),
  quickBar: $('#quickBar'),
  gameLayer: $('#gameLayer'),
  gameCheer: $('#gameCheer'),
  gameResult: $('#gameResult'),
  gameResultScore: $('#gameResultScore'),
  resultClear: $('#resultClear'),
  resultCrystal: $('#resultCrystal'),
  resultCombo: $('#resultCombo'),
  gameResultNote: $('#gameResultNote'),
  gameAgain: $('#gameAgain'),
  gameClose: $('#gameClose'),
  panelLayer: $('#panelLayer'),
  panel: $('#panel'),
  contextMenu: $('#contextMenu'),
  toasts: $('#toasts'),
  loading: $('#loading'),
  onboarding: $('#onboarding'),
  onboardingStep: $('#onboardingStep'),
  onboardingArt: $('#onboardingArt'),
  onboardingTitle: $('#onboardingTitle'),
  onboardingBody: $('#onboardingBody'),
  onboardingDots: $('#onboardingDots'),
  onboardingSkip: $('#onboardingSkip'),
  onboardingNext: $('#onboardingNext'),
  fatal: $('#fatal'),
  fatalText: $('#fatalText'),
};

const audio = new PetAudio();
audio.setVolume(state.settings.volume);

const musicAudio = new Audio();
musicAudio.preload = 'metadata';
musicAudio.volume = state.musicBox.volume;
musicAudio.loop = state.musicBox.loop;
let musicPlaying = false;
let musicSleepTimer = null;
let musicSleepEnds = 0;

musicAudio.addEventListener('play', () => {
  musicPlaying = true;
  els.musicBox?.classList.add('is-playing');
  updateMusicProgress();
});
musicAudio.addEventListener('pause', () => {
  musicPlaying = false;
  els.musicBox?.classList.remove('is-playing');
  updateMusicProgress();
});
musicAudio.addEventListener('timeupdate', updateMusicProgress);
musicAudio.addEventListener('loadedmetadata', updateMusicProgress);
musicAudio.addEventListener('ended', () => {
  musicPlaying = false;
  updateMusicProgress();
});
musicAudio.addEventListener('error', () => {
  musicPlaying = false;
  updateMusicProgress();
  if (panelName === 'musicbox') {
    toast(isEN() ? 'The paper roll is stuck. Check the audio file.' : '纸带卡住了。请检查音频文件。', 'info', 3200);
  }
});
audio.setVoice(state.settings.voice);
audio.setLanguage?.(uiLang());
bridge.setLanguage?.(uiLang());

let scene = null;
let runtime = {};
let panelName = null;
let panelHistory = [];
let portraitPreview = false;
let bubbleVisible = false;
let bubbleTypingTimer = null;
let bubbleHideTimer = null;
let bubbleHoldUntil = 0;
let pendingMemoryCandidate = null;
let memoryEditing = false;
let memoryEditingId = null;
let lastTapAt = 0;
let lastTapX = 0;
let lastTapY = 0;
let lastMouse = { x: innerWidth / 2, y: innerHeight / 2 };
let mouseIgnored = null;
let dragging = false;
let dragOrigin = null;
let idleTimer = null;
let stretchTimer = null;
let idleActionTimer = null;
let lastLandingAt = 0;
let lastFocusFollowUpAt = 0;
let focusTick = null;
let focusAutoTimer = null;
let lastFocusTraySyncAt = 0;
let lastAmbientAt = 0;
let quitArmed = false;
let lastChatAffectionAt = 0;
let lastPatAffectionAt = 0;
let lastTeaAt = 0;
let toolsOpen = false;
let firstHintTimer = null;
let memorySelection = 'sonetto';
let memoryQuery = '';
let wardrobeFilter = 'all';
let wardrobeSelected = 'hat';
let wardrobeTryOn = null;
let archiveMode = 'characters';
let archiveQuery = '';
let archiveSelection = ARCHIVE_CHARACTERS[0]?.id || null;
let llmStatus = {
  enabled: false,
  hasKey: false,
  endpoint: 'https://api.deepseek.com',
  model: 'deepseek-chat',
  encryptionAvailable: false,
};
let chatHistory = [];
let dossierSelection = 'thirtyseven';

/* -------------------------------------------------------------------------- */
/* Small UI helpers                                                           */
/* -------------------------------------------------------------------------- */

function toast(message, kind = 'info', ms = 3600) {
  if (!message) return;
  while (els.toasts.children.length >= 3) els.toasts.firstElementChild?.remove();
  const node = document.createElement('div');
  node.className = `toast ${kind}`;
  node.textContent = message;
  els.toasts.appendChild(node);
  setTimeout(() => {
    node.classList.add('out');
    setTimeout(() => node.remove(), 240);
  }, ms);
}

function setDockActive(action) {
  $$('.tool-btn', els.dock).forEach((btn) => {
    btn.classList.toggle('is-active', Boolean(action) && btn.dataset.action === action);
  });
  const more = $('.tool-btn[data-action="more"]', els.dock);
  if (more) more.setAttribute('aria-expanded', String(!els.contextMenu.hidden));
}

function updateDockActive() {
  if (panelName === 'focus') return setDockActive('focus');
  if (panelName === 'checkin') return setDockActive('checkin');
  if (!els.composer.hidden) return setDockActive('chat');
  if (game.active) return setDockActive('game');
  if (panelName || !els.contextMenu.hidden) return setDockActive('more');
  return setDockActive(null);
}

function setToolsOpen(open, { focus = false } = {}) {
  toolsOpen = Boolean(open);
  els.dock.hidden = !toolsOpen;
  els.menuToggle.setAttribute('aria-expanded', String(toolsOpen));
  if (toolsOpen) requestAnimationFrame(positionPetUi);
  els.menuToggle.dataset.tip = toolsOpen ? '收起' : '功能菜单';
  els.menuToggle.innerHTML = `<span class="icon">${icon(toolsOpen ? 'close' : 'menu')}</span>`;
  document.body.classList.toggle('tools-open', toolsOpen);
  if (!toolsOpen) closeMenu();
  if (toolsOpen && !game.active) {
    bridge.ensureVisible?.();
    updateDockActive();
    if (focus) {
      const first = $('.tool-btn', els.dock);
      first?.focus({ preventScroll: true });
    }
  }
  recalcMousePassthrough(lastMouse.x, lastMouse.y);
  syncHitRegions();
}

function toggleTools() {
  ensureAudio();
  setToolsOpen(!toolsOpen);
  resetIdle();
}

function setClockVisible(visible, { announce = false } = {}) {
  state.settings.showClock = Boolean(visible);
  els.clockNote.hidden = !state.settings.showClock;
  if (state.settings.showClock) updateClock();
  syncHitRegions();
  saveSoon();
  if (!els.contextMenu.hidden) openMenu();
  if (announce) toast(state.settings.showClock ? '时钟便笺已留在桌面。' : '时钟便笺已收起。', 'info', 2200);
}

function showHelpHint() {
  setToolsOpen(false);
  openPanel('settings', { about: true });
  toast('左键摸摸 · 右键打开工具条 · 拖动移动位置', 'info', 5200);
}

let onboardingOpen = false;
let onboardingStepIndex = 0;

function onboardingSteps() {
  return isEN()
    ? [
      {
        art: '↔',
        title: 'Keep me at the edge of the desk',
        body: 'Drag Vertin to move her. The position is remembered, and she will not block your work.',
        note: 'You can also drag her out of the way whenever the desk gets crowded.',
      },
      {
        art: '☰',
        title: 'Everything is behind this menu',
        body: 'Right-click Vertin or click the menu button beside her. Chat, focus, check-in, wardrobe and records live there.',
        note: 'The small bar under her also keeps the four most-used actions close.',
      },
      {
        art: 'V',
        title: 'If you cannot find me',
        body: 'Press Ctrl + Shift + V, or use the tray menu. “Reset position” brings her back to the lower-right corner.',
        note: 'Portable build: your data stays in the userdata folder beside VertinPet.exe. Copy it with the app when moving.',
      },
    ]
    : [
      {
        art: '↔',
        title: '把我放在桌边',
        body: '按住维尔汀拖动，位置会记住。她不会挡住你的工作。',
        note: '桌面太挤时，也可以随时把她拖到别的角落。',
      },
      {
        art: '☰',
        title: '需要什么，就点这里',
        body: '右键维尔汀，或点她右侧的菜单按钮。对话、专注、签到、衣橱和旧日记录都在里面。',
        note: '角色下方的小快捷条也保留了四个最常用的入口。',
      },
      {
        art: 'V',
        title: '找不到我时',
        body: '按 Ctrl + Shift + V，或从系统托盘找她。托盘里的「回到屏幕右下角」会把她放回原位。',
        note: '便携版的数据保存在 VertinPet.exe 旁边的 userdata 文件夹；换电脑时连同它一起复制。',
      },
    ];
}

function renderOnboarding() {
  const steps = onboardingSteps();
  const step = steps[onboardingStepIndex] || steps[0];
  els.onboardingStep.textContent = `${String(onboardingStepIndex + 1).padStart(2, '0')} / ${String(steps.length).padStart(2, '0')}`;
  els.onboardingArt.textContent = step.art;
  els.onboardingTitle.textContent = step.title;
  els.onboardingBody.textContent = step.body;
  const note = els.onboarding.querySelector('.onboarding-note');
  if (note) note.textContent = step.note || '';
  els.onboardingDots.innerHTML = steps.map((_, index) => `<i class="${index === onboardingStepIndex ? 'is-active' : ''}"></i>`).join('');
  els.onboardingSkip.textContent = isEN() ? 'Skip' : '跳过';
  els.onboardingNext.textContent = onboardingStepIndex >= steps.length - 1
    ? (isEN() ? 'Start' : '开始使用')
    : (isEN() ? 'Next' : '下一步');
}

function openOnboarding({ force = false } = {}) {
  if (!els.onboarding) return;
  if (!force && (state.seenOnboarding || runtime.capture || portraitPreview)) return;
  onboardingOpen = true;
  onboardingStepIndex = 0;
  document.body.classList.add('is-onboarding');
  els.onboarding.hidden = false;
  setIgnoreMouse(false);
  syncHitRegions();
  renderOnboarding();
  bridge.ensureVisible?.();
}

function closeOnboarding() {
  if (!onboardingOpen) return;
  onboardingOpen = false;
  state.seenOnboarding = true;
  saveNow();
  document.body.classList.remove('is-onboarding');
  els.onboarding.hidden = true;
  syncHitRegions();
  setTimeout(() => recalcMousePassthrough(), 60);
}

function maybeShowOnboarding() {
  if (state.seenOnboarding || runtime.capture || portraitPreview) return false;
  openOnboarding();
  return true;
}

function maybeShowFirstHint() {
  if (runtime.capture) return;
  if (state.seenUiHint) return;
  clearTimeout(firstHintTimer);
  firstHintTimer = setTimeout(() => {
    if (panelName || game.active || !els.composer.hidden || toolsOpen || !els.contextMenu.hidden) return;
    toast('左键互动 · 右键打开工具条 · 拖动移动位置', 'info', 5200);
    state.seenUiHint = true;
    saveSoon();
  }, 4300);
}

function formatClock(totalSeconds) {
  const seconds = Math.max(0, Math.ceil(totalSeconds));
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function daysTogether() {
  const start = new Date(state.stats.metAt || Date.now());
  start.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(1, Math.floor((today - start) / DAY_MS) + 1);
}

function firstName(part) {
  return {
    hat: '礼帽', head: '头', body: '外套', suitcase: '箱子',
  }[part] || '她';
}

/* -------------------------------------------------------------------------- */
/* Bubble / dialogue                                                          */
/* -------------------------------------------------------------------------- */

function positionBubble() {
  if (!scene?.layout) return;
  const { layout } = scene;
  const width = Math.max(220, Math.min(300, Math.round(layout.size * 0.92)));
  els.bubble.style.width = `${width}px`;
  const bottom = Math.max(76, innerHeight - Math.max(78, layout.y - 10));
  els.bubble.style.bottom = `${bottom}px`;
}

function syncPetHitbox() {
  if (!scene?.layout) return;
  const { layout } = scene;
  const pad = 6;
  const left = Math.max(0, layout.x - pad);
  const top = Math.max(0, layout.y - pad);
  els.petHit.style.left = `${left}px`;
  els.petHit.style.top = `${top}px`;
  els.petHit.style.width = `${layout.size + pad * 2}px`;
  els.petHit.style.height = `${layout.size + pad * 2}px`;
  positionPetUi();
}

function positionPetUi() {
  if (!scene?.layout || portraitPreview) return;
  const { layout } = scene;
  const edge = 8;
  const qb = els.quickBar;
  const qbW = qb.offsetWidth || 112;
  const qbH = qb.offsetHeight || 30;
  let qx = layout.x + layout.size / 2 - qbW / 2;
  let qy = layout.y + layout.size + 9;
  if (qy + qbH > innerHeight - edge) qy = layout.y - qbH - 9;
  qx = Math.max(edge, Math.min(innerWidth - qbW - edge, qx));
  qy = Math.max(edge, Math.min(innerHeight - qbH - edge, qy));
  qb.style.left = `${Math.round(qx)}px`;
  qb.style.top = `${Math.round(qy)}px`;
  qb.style.right = 'auto';
  qb.style.bottom = 'auto';
  qb.style.transform = 'none';

  const mw = els.menuToggle.offsetWidth || 30;
  const mh = els.menuToggle.offsetHeight || 30;
  let mx = layout.x + layout.size + 9;
  if (mx + mw > innerWidth - edge) mx = layout.x - mw - 9;
  mx = Math.max(edge, Math.min(innerWidth - mw - edge, mx));
  const my = Math.max(edge, Math.min(innerHeight - mh - edge, layout.y + layout.size * 0.46));
  els.menuToggle.style.left = `${Math.round(mx)}px`;
  els.menuToggle.style.top = `${Math.round(my)}px`;
  els.menuToggle.style.right = 'auto';
  els.menuToggle.style.bottom = 'auto';

  if (!els.suitcase.hidden) {
    const sw = els.suitcase.offsetWidth || 42;
    const sh = els.suitcase.offsetHeight || 42;
    let sx = layout.x - sw - 2;
    let sy = layout.y + layout.size - sh - 8;
    if (sx < edge) sx = layout.x + layout.size + 2;
    sx = Math.max(edge, Math.min(innerWidth - sw - edge, sx));
    sy = Math.max(edge, Math.min(innerHeight - sh - edge, sy));
    els.suitcase.style.left = `${Math.round(sx)}px`;
    els.suitcase.style.top = `${Math.round(sy)}px`;
    els.suitcase.style.right = 'auto';
    els.suitcase.style.bottom = 'auto';
  }

  if (!els.focusChip.hidden) {
    const cw = els.focusChip.offsetWidth || 104;
    const ch = els.focusChip.offsetHeight || 27;
    let cx = layout.x + layout.size + 4;
    let cy = layout.y + 2;
    if (cx + cw > innerWidth - edge) cx = layout.x - cw - 4;
    cx = Math.max(edge, Math.min(innerWidth - cw - edge, cx));
    cy = Math.max(edge, Math.min(innerHeight - ch - edge, cy));
    els.focusChip.style.left = `${Math.round(cx)}px`;
    els.focusChip.style.top = `${Math.round(cy)}px`;
    els.focusChip.style.right = 'auto';
  }

  if (!els.musicBox.hidden) {
    const mbw = els.musicBox.offsetWidth || 36;
    const mbh = els.musicBox.offsetHeight || 36;
    let mbx = layout.x - mbw - 2;
    let mby = layout.y + layout.size - mbh - 8;
    if (!els.suitcase.hidden) {
      const sx = Number.parseFloat(els.suitcase.style.left) || (layout.x - 42);
      const sy = Number.parseFloat(els.suitcase.style.top) || (layout.y + layout.size - 42);
      mbx = sx - mbw - 2;
      mby = sy + (42 - mbh) / 2;
      if (mbx < edge) {
        mbx = sx;
        mby = sy - mbh - 2;
      }
      if (mby < edge) {
        mbx = layout.x + layout.size + 2;
        mby = layout.y + layout.size - mbh - 8;
      }
    }
    mbx = Math.max(edge, Math.min(innerWidth - mbw - edge, mbx));
    mby = Math.max(edge, Math.min(innerHeight - mbh - edge, mby));
    els.musicBox.style.left = `${Math.round(mbx)}px`;
    els.musicBox.style.top = `${Math.round(mby)}px`;
    els.musicBox.style.right = 'auto';
    els.musicBox.style.bottom = 'auto';
  }

  if (!els.dock.hidden) {
    const dw = els.dock.offsetWidth || 160;
    const dh = els.dock.offsetHeight || 38;
    let dx = layout.x + layout.size / 2 - dw / 2;
    let dy = qy + qbH + 5;
    if (dy + dh > innerHeight - edge) dy = qy - dh - 5;
    dx = Math.max(edge, Math.min(innerWidth - dw - edge, dx));
    dy = Math.max(edge, Math.min(innerHeight - dh - edge, dy));
    els.dock.style.left = `${Math.round(dx)}px`;
    els.dock.style.top = `${Math.round(dy)}px`;
    els.dock.style.right = 'auto';
    els.dock.style.bottom = 'auto';
  }
}

function syncHitRegions() {
  if (!scene) return;
  const regions = [];
  const add = (el) => {
    if (!el || el.hidden) return;
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    regions.push({ left: r.left, top: r.top, width: r.width, height: r.height });
  };
  add(els.onboarding);
  add(els.petHit);
  add(els.suitcase);
  add(els.musicBox);
  add(els.summonStage);

  add(els.menuToggle);
  add(els.dock);
  add(els.clockNote);
  add(els.focusChip);
  add(els.bubble);
  add(els.composer);
  add(els.quickBar);
  add(els.gameHud);
  add(els.gameResult);
  add(els.contextMenu);
  if (game.active) {
    els.gameLayer.querySelectorAll('.rain-drop').forEach((drop) => add(drop));
  }
  const full = Boolean(panelName || (els.panelLayer && !els.panelLayer.hidden));
  const pr = els.petHit.getBoundingClientRect();
  const pet = pr.width > 0 && pr.height > 0
    ? { left: pr.left, top: pr.top, width: pr.width, height: pr.height }
    : null;
  bridge.setHitRegions?.({ full, regions, pet });
}

function showBubble() {
  if (!bubbleVisible) {
    positionBubble();
    elShow();
  }
  bubbleVisible = true;
}

function elShow() {
  els.bubble.hidden = false;
  els.bubble.setAttribute('aria-hidden', 'false');
  syncHitRegions();
  requestAnimationFrame(() => els.bubble.classList.add('is-visible'));
}

function hideBubble(immediate = false) {
  if (!bubbleVisible && els.bubble.hidden) return;
  hideMemoryPrompt();
  clearTimeout(bubbleHideTimer);
  clearInterval(bubbleTypingTimer);
  bubbleVisible = false;
  els.bubble.classList.remove('is-visible');
  els.bubble.setAttribute('aria-hidden', 'true');
  const finish = () => {
    if (!bubbleVisible) {
      els.bubble.hidden = true;
      syncHitRegions();
    }
  };
  if (immediate) finish();
  else setTimeout(finish, 230);
}

function scheduleBubbleHide(delay) {
  clearTimeout(bubbleHideTimer);
  bubbleHoldUntil = Date.now() + delay;
  bubbleHideTimer = setTimeout(() => {
    if (!els.composer.hidden) {
      // Keep the conversation open while the input has focus.
      bubbleHideTimer = setTimeout(() => {
        if (els.composer.hidden) hideBubble();
      }, 9000);
      return;
    }
    if (document.activeElement === els.chatInput) return;
    hideBubble();
  }, delay);
}

function syncMemoryPromptChrome() {
  const en = isEN();
  const label = els.memoryPrompt?.querySelector('.memory-prompt-label');
  const note = els.memoryPrompt?.querySelector('.memory-prompt-note');
  if (label) label.textContent = en ? 'Remember this?' : '要记住这件事吗？';
  if (note) note.textContent = en
    ? 'Stored on this computer only. You can delete it in Settings.'
    : '只保存在本机。可以随时在设置里删除。';
  if (els.memoryRememberBtn) els.memoryRememberBtn.textContent = memoryEditing ? (en ? 'Save' : '保存') : (en ? 'Remember' : '记住');
  if (els.memoryEditBtn) els.memoryEditBtn.textContent = memoryEditing ? (en ? 'Cancel' : '取消') : (en ? 'Edit' : '修改');
  if (els.memoryForgetBtn) els.memoryForgetBtn.textContent = en ? 'Ignore' : '忽略';
  if (els.memoryPromptCategory) {
    [...els.memoryPromptCategory.options].forEach((option) => {
      option.textContent = memoryCategoryLabel(option.value);
    });
  }
}

function hideMemoryPrompt() {
  if (!els.memoryPrompt) return;
  pendingMemoryCandidate = null;
  memoryEditing = false;
  els.memoryPrompt.hidden = true;
  els.memoryPromptInput.hidden = true;
  els.memoryPromptText.hidden = false;
  els.memoryPromptInput.value = '';
  if (els.memoryPromptCategory) els.memoryPromptCategory.value = 'other';
  syncMemoryPromptChrome();
  syncHitRegions();
}

function showMemoryPrompt(candidate) {
  const text = String(candidate || '').replace(/\s+/g, ' ').trim().slice(0, 120);
  if (!text || !els.memoryPrompt) return;
  if (state.memories.some((memory) => memory.text.toLowerCase() === text.toLowerCase())) return;
  pendingMemoryCandidate = text;
  memoryEditing = false;
  els.memoryPromptText.textContent = text;
  els.memoryPromptText.hidden = false;
  els.memoryPromptInput.hidden = true;
  els.memoryPromptInput.value = text;
  if (els.memoryPromptCategory) els.memoryPromptCategory.value = 'other';
  els.memoryPrompt.hidden = false;
  syncMemoryPromptChrome();
  if (els.bubble.hidden) showBubble();
  syncHitRegions();
}

function saveMemoryCandidate() {
  const text = (memoryEditing && els.memoryPromptInput
    ? els.memoryPromptInput.value
    : pendingMemoryCandidate || els.memoryPromptText.textContent || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);
  if (text.length < 4) {
    toast(isEN() ? 'That is a little too short.' : '这句话太短了，再留具体一点。', 'info', 2200);
    return;
  }
  if (state.memories.some((memory) => memory.text.toLowerCase() === text.toLowerCase())) {
    toast(isEN() ? 'That is already kept locally.' : '这件事已经记在本地了。', 'info', 2200);
    hideMemoryPrompt();
    return;
  }
  if (state.memories.length >= 20) {
    toast(isEN() ? 'Local memory is full (20). Delete one in Settings first.' : '本地记忆最多 20 条，先到设置里删掉一条。', 'info', 3600);
    return;
  }
  const category = MEMORY_CATEGORY_IDS.has(els.memoryPromptCategory?.value)
    ? els.memoryPromptCategory.value
    : 'other';
  state.memories = [
    {
      id: `memory-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      text,
      at: Date.now(),
      category,
      pinned: false,
    },
    ...state.memories,
  ].slice(0, 20);
  saveNow();
  hideMemoryPrompt();
  toast(isEN() ? 'Remembered. Stored on this computer only.' : '记住了。只保存在这台电脑上。', 'success', 2800);
  if (panelName === 'settings') renderPanel('settings');
}

function editMemoryCandidate() {
  if (!els.memoryPrompt) return;
  memoryEditing = !memoryEditing;
  els.memoryPromptText.hidden = memoryEditing;
  els.memoryPromptInput.hidden = !memoryEditing;
  if (memoryEditing) {
    els.memoryPromptInput.value = pendingMemoryCandidate || els.memoryPromptText.textContent || '';
    els.memoryPromptInput.focus();
    els.memoryPromptInput.select();
  }
  syncMemoryPromptChrome();
}

function say(text, options = {}) {
  if (!text) return;
  const {
    duration = 0, voice = true, hint, typewriter = true, sticky = false,
  } = options;
  hideMemoryPrompt();
  clearTimeout(bubbleHideTimer);
  clearInterval(bubbleTypingTimer);
  showBubble();
  els.bubbleText.textContent = '';
  els.bubbleText.classList.toggle('is-typing', typewriter);
  const chars = [...String(text)];
  if (!typewriter || chars.length === 0) {
    els.bubbleText.textContent = chars.join('');
    els.bubbleText.classList.remove('is-typing');
  } else {
    let index = 0;
    bubbleTypingTimer = setInterval(() => {
      index += 1;
      els.bubbleText.textContent = chars.slice(0, index).join('');
      if (index >= chars.length) {
        clearInterval(bubbleTypingTimer);
        els.bubbleText.classList.remove('is-typing');
      }
    }, 23);
  }
  if (voice && state.settings.voice) {
    setTimeout(() => audio.speak(text), 180);
  }
  if (!sticky) {
    const auto = duration || Math.max(5600, chars.length * 150 + 3900);
    scheduleBubbleHide(auto);
  }
}

function sayLine(key, options = {}) {
  say(pickLine(key), options);
}

/* -------------------------------------------------------------------------- */
/* Status, levels, drops                                                      */
/* -------------------------------------------------------------------------- */

function updateStatus() {
  // Level and collection data live in the character profile now. Re-render
  // that panel only while it is open, so the compact desktop stays quiet.
  if (panelName === 'profile') {
    const scrollTop = els.panel.scrollTop;
    renderPanel('profile');
    els.panel.scrollTop = scrollTop;
  }
  syncSummonVisibility();
  syncMusicBoxVisibility();
}

function addAffection(amount, { silent = false } = {}) {
  if (!amount) return;
  const before = levelInfo(state.stats.affection);
  state.stats.affection = Math.max(0, state.stats.affection + amount);
  const after = levelInfo(state.stats.affection);
  updateStatus();
  saveSoon();
  if (after.level > before.level && !silent) {
    const newlyUnlocked = WARDROBE_ITEMS.filter((item) => (
      item.unlock?.type === 'level'
      && item.unlock.target > before.level
      && item.unlock.target <= after.level
    ));
    const extra = newlyUnlocked.length
      ? `　${isEN() ? 'New wardrobe' : '新收藏'} · ${newlyUnlocked.map((item) => wardrobeCopy(item, 'name')).join(isEN() ? ', ' : '、')}`
      : '';
    toast(`Lv.${after.level} · ${after.title}　${isEN() ? 'Another page between you.' : '你们之间的记录又厚了一页。'}${extra}`, 'gold', newlyUnlocked.length ? 6400 : 5200);
    scene?.spawnHearts(8);
    audio.chime('celebrate');
  }
}

function checkUnlocks(announce = true) {
  let changed = false;
  for (const item of ACCESSORIES) {
    if (!item.unlock) continue;
    if (state.stats.droplets >= item.unlock && !state.stats.unlocked.includes(item.id)) {
      state.stats.unlocked.push(item.id);
      changed = true;
      if (announce) {
        toast(`解锁 · ${accessoryName(item, uiLang())}　已放进衣橱`, 'gold', 5200);
        audio.chime('celebrate');
        if (panelName === 'wardrobe') renderPanel('wardrobe');
        scene?.spawnSparks({ x: 0, y: 3.4, z: 0.2 }, 12, 0xf2d495);
      }
    }
  }
  if (changed) {
    saveSoon();
    updateStatus();
  }
  return changed;
}

function addDroplets(amount) {
  if (!amount) return;
  state.stats.droplets += amount;
  const unlocked = checkUnlocks(true);
  updateStatus();
  saveSoon();
  if (unlocked && panelName === 'wardrobe') renderPanel('wardrobe');
}

function itemUnlocked(item) {
  return item.unlock === 0 || state.stats.droplets >= item.unlock || state.stats.unlocked.includes(item.id);
}

/* -------------------------------------------------------------------------- */
/* Focus timer                                                                */
/* -------------------------------------------------------------------------- */

const FOCUS_PRESETS = {
  focus: [15, 25, 45, 60, 90, 120],
  shortBreak: [5, 10],
  longBreak: [15, 20],
};
const FOCUS_CYCLE_LENGTH = 4;

function normalizeFocusMode(mode) {
  if (mode === 'break') return 'shortBreak';
  return ['focus', 'shortBreak', 'longBreak'].includes(mode) ? mode : 'focus';
}

function isBreakMode(mode = state.focus.mode) {
  return mode === 'shortBreak' || mode === 'longBreak';
}

function focusModeLabel(mode = state.focus.mode) {
  if (mode === 'longBreak') return isEN() ? 'Long break' : '长休';
  if (mode === 'shortBreak') return isEN() ? 'Short break' : '小憩';
  return isEN() ? 'Focus' : '专注';
}

function focusModeChinese(mode = state.focus.mode) {
  return focusModeLabel(mode);
}

function focusModeShort(mode = state.focus.mode) {
  if (mode === 'longBreak') return isEN() ? 'Long' : '长休';
  if (mode === 'shortBreak') return isEN() ? 'Break' : '小憩';
  return isEN() ? 'Focus' : '专注';
}

function focusShouldShowChip() {
  const f = state.focus;
  return Boolean(f.running || (f.endAt && f.remaining > 0 && f.remaining < f.duration));
}

function updateFocusChip() {
  const f = state.focus;
  const active = focusShouldShowChip();
  els.focusChip.hidden = !active;
  els.focusChip.classList.toggle('is-paused', !f.running && active);
  if (!active) {
    els.focusBadge.hidden = true;
    document.title = '维尔汀 · 雨夜书桌';
    return;
  }
  els.focusChipTime.textContent = formatClock(f.remaining);
  els.focusChipMode.textContent = f.running ? focusModeChinese() : (isEN() ? 'Paused' : '暂停');
  els.focusBadge.hidden = false;
  els.focusBadge.textContent = String(Math.max(1, Math.ceil(f.remaining / 60)));
  document.title = `${formatClock(f.remaining)} · 维尔汀`;
  positionPetUi();
}

function updateFocusPanelLive() {
  if (panelName !== 'focus') return;
  const f = state.focus;
  const time = $('#focusTime', els.panel);
  const label = $('#focusModeLabel', els.panel);
  const ring = $('#focusRing', els.panel);
  const startBtn = $('#focusStartBtn', els.panel);
  if (time) time.textContent = formatClock(f.remaining);
  if (label) label.textContent = focusModeLabel();
  if (ring) {
    const circumference = 2 * Math.PI * 62;
    const ratio = Math.max(0, Math.min(1, f.duration ? f.remaining / f.duration : 0));
    ring.style.strokeDashoffset = String(circumference * (1 - ratio));
    ring.classList.toggle('break', isBreakMode(f.mode));
  }
  if (startBtn) {
    startBtn.textContent = f.running
      ? (isEN() ? 'Pause' : '暂停计时')
      : (f.remaining < f.duration
        ? (isEN() ? 'Resume' : '继续计时')
        : (f.mode === 'longBreak'
          ? (isEN() ? 'Start long break' : '开始长休')
          : (f.mode === 'shortBreak' ? (isEN() ? 'Start break' : '开始小憩') : (isEN() ? 'Start focus' : '开始专注'))));
  }
  const todayEl = $('#focusToday', els.panel);
  const totalEl = $('#focusTotal', els.panel);
  const todaySessionsEl = $('#focusTodaySessions', els.panel);
  if (todayEl) todayEl.textContent = String(state.stats.focusToday || 0);
  if (totalEl) totalEl.textContent = String(state.stats.focusMinutes || 0);
  if (todaySessionsEl) todaySessionsEl.textContent = String(state.stats.focusTodaySessions || 0);
}

function syncFocusTray() {
  const f = state.focus;
  bridge.setFocusTray?.({
    running: Boolean(f.running),
    paused: !f.running && f.remaining > 0 && f.remaining < f.duration,
    mode: normalizeFocusMode(f.mode),
    remaining: Math.max(0, Math.ceil(Number(f.remaining) || 0)),
    duration: Math.max(0, Math.ceil(Number(f.duration) || 0)),
  });
}

function updateFocusViews() {
  updateFocusChip();
  updateFocusPanelLive();
  updateDockActive();
  syncFocusTray();
  saveSoon();
}

function skipFocusPhase() {
  const f = state.focus;
  clearTimeout(focusAutoTimer);
  const wasFocus = normalizeFocusMode(f.mode) === 'focus';
  f.running = false;
  f.endAt = null;
  f.remaining = 0;
  scene?.setFocus(false);
  if (wasFocus) {
    f.mode = 'shortBreak';
    f.duration = FOCUS_PRESETS.shortBreak[0] * 60;
  } else {
    if (f.mode === 'longBreak') f.cycle = 0;
    f.mode = 'focus';
    f.duration = FOCUS_PRESETS.focus[0] * 60;
  }
  f.remaining = f.duration;
  f.task = '';
  updateFocusViews();
  if (panelName === 'focus') renderPanel('focus');
  toast(isEN() ? 'Phase skipped. No reward was given.' : '已跳过这一阶段，不计算奖励。', 'info', 2800);
  saveNow();
}

function focusTickLoop() {
  clearInterval(focusTick);
  focusTick = setInterval(() => {
    const f = state.focus;
    if (!f.running || !f.endAt) return;
    const remaining = Math.max(0, (f.endAt - Date.now()) / 1000);
    f.remaining = Math.ceil(remaining);
    if (f.remaining <= 0) {
      completeFocus(false);
      return;
    }
    updateFocusChip();
    updateFocusPanelLive();
    if (Date.now() - lastFocusTraySyncAt > 15000) {
      lastFocusTraySyncAt = Date.now();
      syncFocusTray();
    }
  }, 350);
}

function focusStartMessage(mode, minutes, resuming = false) {
  const en = isEN();
  const safeMinutes = Math.max(1, Math.round(Number(minutes) || 1));
  if (resuming) {
    return en
      ? `Resuming. ${safeMinutes} minutes left. I will keep the rest of the time.`
      : `继续。还剩 ${safeMinutes} 分钟。剩下的时间我替你看着。`;
  }
  if (mode === 'longBreak') {
    return en
      ? `${safeMinutes} minutes. Let this round close properly.`
      : `${safeMinutes} 分钟。让这一轮好好合上。`;
  }
  if (mode === 'shortBreak') {
    return en
      ? `${safeMinutes} minutes. Look away from the screen; the rain will watch the time.`
      : `${safeMinutes} 分钟。把视线移开，雨会替你看着时间。`;
  }
  return en
    ? `${safeMinutes} minutes. I will watch the rain; you just take the next step.`
    : `${safeMinutes} 分钟。我替你看着雨，你只管往前走。`;
}

function startFocusSession({ mode = null, minutes = null } = {}) {
  const f = state.focus;
  clearTimeout(focusAutoTimer);
  if (mode) mode = normalizeFocusMode(mode);
  if (mode && mode !== f.mode) {
    f.mode = mode;
    f.duration = (minutes || FOCUS_PRESETS[mode][0]) * 60;
    f.remaining = f.duration;
    f.endAt = null;
    f.running = false;
  } else if (minutes && f.duration !== minutes * 60) {
    f.duration = minutes * 60;
    f.remaining = f.duration;
    f.endAt = null;
    f.running = false;
  }
  if (f.remaining <= 0) f.remaining = f.duration;
  const resuming = f.remaining < f.duration;
  f.running = true;
  f.mode = normalizeFocusMode(f.mode);
  f.endAt = Date.now() + f.remaining * 1000;
  f.startedAt = f.startedAt || Date.now();
  scene?.cancelAction();
  scene?.setFocus(f.mode === 'focus');
  audio.chime('focus');
  closePanel();
  setToolsOpen(false);
  closeComposer(false);
  hideBubble(true);
  const activeMinutes = resuming ? Math.ceil(f.remaining / 60) : Math.round(f.duration / 60);
  say(focusStartMessage(f.mode, activeMinutes, resuming), {
    duration: 8200,
    hint: isBreakMode(f.mode)
      ? (isEN() ? 'A short pause. I will be here.' : '休息期间，我在这里。')
      : (isEN() ? 'I will stay quiet while the timer runs.' : '专注期间，我会安静地待在这里'),
  });
  focusTickLoop();
  updateFocusViews();
  if (panelName === 'focus') renderPanel('focus');
  if (resuming) toast('计时继续。', 'info', 2200);
  saveNow();
}

function pauseFocus(quiet = false) {
  const f = state.focus;
  if (!f.running) return;
  clearTimeout(focusAutoTimer);
  f.remaining = Math.max(1, Math.ceil((f.endAt - Date.now()) / 1000));
  f.running = false;
  f.endAt = null;
  scene?.setFocus(false);
  updateFocusViews();
  if (panelName === 'focus') renderPanel('focus');
  if (!quiet) toast('计时已暂停。', 'info', 2200);
  saveNow();
}

function resetFocus(quiet = false) {
  const f = state.focus;
  clearTimeout(focusAutoTimer);
  f.running = false;
  f.endAt = null;
  f.remaining = f.duration;
  f.task = '';
  scene?.setFocus(false);
  updateFocusViews();
  if (panelName === 'focus') renderPanel('focus');
  if (!quiet) toast('计时已归零。', 'info', 2000);
  saveNow();
}

function completeFocus(restored = false) {
  const f = state.focus;
  if (f.running === false && !restored) return;
  clearTimeout(focusAutoTimer);
  const completedMode = normalizeFocusMode(f.mode);
  const minutes = Math.max(1, Math.round(f.duration / 60));
  const focusTask = String(f.task || '').trim();
  f.running = false;
  f.remaining = 0;
  f.endAt = null;
  scene?.setFocus(false);
  audio.chime('celebrate');

  if (completedMode === 'focus') {
    state.stats.focusSessions += 1;
    state.stats.focusMinutes += minutes;
    const today = toDayKey();
    if (state.stats.focusDay !== today) {
      state.stats.focusDay = today;
      state.stats.focusToday = 0;
      state.stats.focusTodaySessions = 0;
    }
    state.stats.focusToday += minutes;
    state.stats.focusTodaySessions = (state.stats.focusTodaySessions || 0) + 1;
    state.stats.focusDays = state.stats.focusDays && typeof state.stats.focusDays === 'object' ? state.stats.focusDays : {};
    state.stats.focusDays[today] = (Number(state.stats.focusDays[today]) || 0) + minutes;
    const todayStats = touchToday();
    todayStats.focusMinutes += minutes;
    todayStats.focusSessions = (todayStats.focusSessions || 0) + 1;
    todayStats.interactions += 1;
    f.cycle = Math.min(FOCUS_CYCLE_LENGTH, (Number(f.cycle) || 0) + 1);
    const nextMode = f.cycle >= FOCUS_CYCLE_LENGTH ? 'longBreak' : 'shortBreak';
    const nextMinutes = FOCUS_PRESETS[nextMode][0];
    recordCompanionEvent('focus_complete', { minutes, task: focusTask.slice(0, 48), cycle: f.cycle });
    addAffection(8);
    addDroplets(2);
    scene?.celebrate();
    if (panelName === 'focus') closePanel(true);
    const cycleText = isEN()
      ? `Pomodoro ${f.cycle}/${FOCUS_CYCLE_LENGTH}${nextMode === 'longBreak' ? ' — long break unlocked' : ''}`
      : `番茄 ${f.cycle}/${FOCUS_CYCLE_LENGTH}${nextMode === 'longBreak' ? ' · 可以长休了' : ''}`;
    const followUp = focusTask
      ? (isEN()
        ? `${minutes} minutes are up. How is “${focusTask.slice(0, 42)}” going?`
        : `${minutes} 分钟到了。“${focusTask.slice(0, 42)}”进行到哪一步了？`)
      : (isEN()
        ? 'That stretch is over. Have some water before the next step.'
        : '这一段结束了。先喝口水，再想下一步。');
    state.companion.pendingFocus = { minutes, task: focusTask.slice(0, 48), at: Date.now(), asked: true };
    lastFocusFollowUpAt = Date.now();
    say(followUp, { duration: 10500, hint: `${cycleText} · +8 ${isEN() ? 'affection' : '亲密'} · +2 ${isEN() ? 'Time Rain' : '时之雨'}` });
    toast(isEN()
      ? `Focus complete · ${minutes} min · ${cycleText} · +8 affection · +2 Time Rain`
      : `专注完成 · ${minutes} 分钟 · ${cycleText} · +8 亲密 · +2 时之雨`, 'success', 5600);
    bridge.notify({
      title: isEN() ? 'Vertin · Focus complete' : '维尔汀 · 专注完成',
      body: isEN()
        ? `${minutes} minutes are up. ${nextMode === 'longBreak' ? 'Four rounds done; a long break is ready.' : 'A short break is ready.'}`
        : `${minutes} 分钟到了。${nextMode === 'longBreak' ? '四段完成，可以长休了。' : '可以小憩一会儿。'}`,
    });
    f.mode = nextMode;
    f.duration = nextMinutes * 60;
    f.remaining = f.duration;
    f.task = '';
  } else {
    const wasLong = completedMode === 'longBreak';
    addAffection(2);
    scene?.spawnHearts(4);
    say(pickLine('breakDone'), { duration: 7000 });
    toast(isEN()
      ? `${wasLong ? 'Long break' : 'Break'} finished. Ready for the next round?`
      : `${wasLong ? '长休' : '小憩'}结束。准备好再出发吧。`, 'success', 3200);
    if (wasLong) f.cycle = 0;
    f.mode = 'focus';
    f.duration = FOCUS_PRESETS.focus[1] * 60;
    f.remaining = f.duration;
    f.task = '';
  }

  f.startedAt = null;
  focusTickLoop();
  updateFocusViews();
  if (panelName === 'focus') renderPanel('focus');
  if (!restored) {
    if (f.autoNext) {
      const autoMode = f.mode;
      const autoMinutes = Math.round(f.duration / 60);
      focusAutoTimer = setTimeout(() => {
        if (!state.focus.running
          && state.focus.mode === autoMode
          && state.focus.remaining === state.focus.duration) {
          startFocusSession({ mode: autoMode, minutes: autoMinutes });
        }
      }, 2200);
    }
    saveNow();
  }
}

function restoreFocus() {
  const f = state.focus;
  f.mode = normalizeFocusMode(f.mode);
  if (f.running && f.endAt) {
    if (f.endAt <= Date.now()) {
      f.running = true;
      completeFocus(true);
    } else {
      f.remaining = Math.ceil((f.endAt - Date.now()) / 1000);
      scene?.setFocus(f.mode === 'focus');
      focusTickLoop();
      updateFocusChip();
    }
  } else if (f.running) {
    f.running = false;
    f.endAt = null;
  }
}

function setFocusMode(mode) {
  if (state.focus.running) pauseFocus(true);
  const f = state.focus;
  f.mode = normalizeFocusMode(mode);
  f.duration = (FOCUS_PRESETS[f.mode] || FOCUS_PRESETS.focus)[0] * 60;
  f.remaining = f.duration;
  f.endAt = null;
  f.task = '';
  scene?.setFocus(false);
  updateFocusViews();
  renderPanel('focus');
  saveSoon();
}

function resetFocusCycle() {
  clearTimeout(focusAutoTimer);
  state.focus.cycle = 0;
  saveNow();
  if (panelName === 'focus') renderPanel('focus');
  toast(isEN() ? 'Pomodoro cycle reset.' : '本轮番茄轮次已清空。', 'info', 2200);
}

function setFocusPreset(minutes) {
  if (state.focus.running) pauseFocus(true);
  state.focus.duration = minutes * 60;
  state.focus.remaining = state.focus.duration;
  state.focus.endAt = null;
  scene?.setFocus(false);
  updateFocusViews();
  renderPanel('focus');
  saveSoon();
}

/* -------------------------------------------------------------------------- */
/* Panels                                                                     */
/* -------------------------------------------------------------------------- */

function panelHead(title, sub, mark = '✦') {
  const backLabel = panelHistory.length
    ? (isEN() ? 'Back' : '返回上一级')
    : (isEN() ? 'Desktop' : '返回桌面');
  return `
    <div class="panel-head">
      <span class="panel-mark">${mark}</span>
      <button class="panel-back" type="button" data-panel-back aria-label="${backLabel}">
        <span class="panel-back-arrow" aria-hidden="true">←</span>
        <span class="panel-back-label">${backLabel}</span>
      </button>
      <div class="panel-head-copy">
        <div class="eyebrow">${sub}</div>
        <h2 class="panel-title" id="panelTitle">${title}</h2>
      </div>
      <button class="panel-close" type="button" data-panel-close aria-label="关闭面板"></button>
    </div>`;
}

function rememberPanelState() {
  return {
    name: panelName,
    scroll: els.panel.scrollTop,
    memorySelection,
    memoryQuery,
    archiveQuery,
    archiveSelection,
    archiveMode,
    dossierSelection,
  };
}

function restorePanelState(saved) {
  if (!saved) return;
  memorySelection = saved.memorySelection;
  memoryQuery = saved.memoryQuery || '';
  archiveQuery = saved.archiveQuery || '';
  archiveSelection = saved.archiveSelection;
  archiveMode = saved.archiveMode || 'characters';
  dossierSelection = saved.dossierSelection;
}

function goBackPanel() {
  const previous = panelHistory.pop();
  if (!previous) {
    closePanel();
    return;
  }
  restorePanelState(previous);
  openPanel(previous.name, { fromHistory: true });
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      els.panel.scrollTop = previous.scroll || 0;
    });
  });
  audio.tick();
}

function focusDayKeyAt(offset = 0) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return toDayKey(date);
}

function focusWeekSeries() {
  const days = state.stats.focusDays && typeof state.stats.focusDays === 'object' ? state.stats.focusDays : {};
  return Array.from({ length: 7 }, (_, index) => {
    const offset = index - 6;
    const day = focusDayKeyAt(offset);
    const label = isEN()
      ? new Date(`${day}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short' })
      : ['日', '一', '二', '三', '四', '五', '六'][new Date(`${day}T12:00:00`).getDay()];
    return { day, label, minutes: Math.max(0, Number(days[day]) || 0), today: offset === 0 };
  });
}

function focusLongestStreak() {
  const days = state.stats.focusDays && typeof state.stats.focusDays === 'object' ? state.stats.focusDays : {};
  const keys = Object.keys(days).filter((day) => Number(days[day]) > 0).sort();
  let best = 0;
  let run = 0;
  let previous = null;
  for (const day of keys) {
    const index = checkinDayIndex(day);
    if (index === null) continue;
    run = previous !== null && index - previous === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    previous = index;
  }
  return best;
}

function focusWeekHTML() {
  const week = focusWeekSeries();
  const total = week.reduce((sum, day) => sum + day.minutes, 0);
  const max = Math.max(25, ...week.map((day) => day.minutes));
  return `<div class="focus-week">
    <div class="focus-week-head">
      <span>${isEN() ? 'Last 7 days' : '最近 7 天'}</span>
      <b>${total} ${isEN() ? 'min' : '分钟'}</b>
      <small>${isEN() ? `Longest streak ${focusLongestStreak()} days` : `最长连续 ${focusLongestStreak()} 天`}</small>
    </div>
    <div class="focus-week-bars">
      ${week.map((day) => `<div class="focus-week-col ${day.today ? 'is-today' : ''}">
        <span class="focus-week-value">${day.minutes || ''}</span>
        <span class="focus-week-bar" style="--bar:${Math.max(3, Math.round((day.minutes / max) * 100))}%"></span>
        <small>${day.label}</small>
      </div>`).join('')}
    </div>
  </div>`;
}

function renderFocusPanel() {
  const f = state.focus;
  const mode = normalizeFocusMode(f.mode);
  const presets = FOCUS_PRESETS[mode] || FOCUS_PRESETS.focus;
  const circumference = 2 * Math.PI * 62;
  const ratio = Math.max(0, Math.min(1, f.duration ? f.remaining / f.duration : 0));
  const today = state.stats.focusDay === toDayKey() ? state.stats.focusToday : 0;
  const todaySessions = state.stats.focusDay === toDayKey() ? (state.stats.focusTodaySessions || 0) : 0;
  const cycle = Math.max(0, Math.min(FOCUS_CYCLE_LENGTH, Number(f.cycle) || 0));
  const cycleDots = Array.from({ length: FOCUS_CYCLE_LENGTH }, (_, index) => `
    <span class="focus-cycle-dot ${index < cycle ? 'is-full' : ''} ${index === cycle && cycle < FOCUS_CYCLE_LENGTH ? 'is-next' : ''}" aria-hidden="true"></span>`).join('');
  const modeButtons = ['focus', 'shortBreak', 'longBreak'].map((entry) => `
    <button class="seg-btn ${mode === entry ? 'is-active' : ''}" type="button" data-focus-mode="${entry}">
      ${focusModeShort(entry)}
    </button>`).join('');
  const presetButtons = presets.map((minutes) => `
    <button class="preset-btn ${f.duration === minutes * 60 ? 'is-active' : ''}" type="button" data-preset-minutes="${minutes}">
      ${minutes} ${isEN() ? 'min' : '分钟'}
    </button>`).join('');
  const startLabel = f.running
    ? (isEN() ? 'Pause' : '暂停计时')
    : (f.remaining < f.duration
      ? (isEN() ? 'Resume' : '继续计时')
      : (mode === 'longBreak'
        ? (isEN() ? 'Start long break' : '开始长休')
        : (mode === 'shortBreak' ? (isEN() ? 'Start break' : '开始小憩') : (isEN() ? 'Start focus' : '开始专注'))));
  return `
    ${panelHead(isEN() ? 'Focus & Pomodoro' : '专注与番茄钟', isEN() ? 'Timing & cycles' : '计时与轮次', '◷')}
    <div class="focus-clock">
      <svg viewBox="0 0 146 146" aria-hidden="true">
        <circle class="clock-track" cx="73" cy="73" r="62"></circle>
        <circle id="focusRing" class="clock-progress ${isBreakMode(mode) ? 'break' : ''}" cx="73" cy="73" r="62"
          stroke-dasharray="${circumference.toFixed(2)}"
          stroke-dashoffset="${(circumference * (1 - ratio)).toFixed(2)}"></circle>
      </svg>
      <div class="focus-face">
        <span class="focus-time" id="focusTime">${formatClock(f.remaining)}</span>
        <span class="focus-mode-label" id="focusModeLabel">${focusModeLabel(mode)}</span>
      </div>
    </div>
    <div class="segmented" role="group" aria-label="${isEN() ? 'Timer mode' : '计时模式'}">${modeButtons}</div>
    <div class="focus-cycle">
      <div class="focus-cycle-head">
        <span>${isEN() ? 'Pomodoro cycle' : '番茄轮次'}</span>
        <b>${cycle} / ${FOCUS_CYCLE_LENGTH}</b>
        <small>${cycle >= FOCUS_CYCLE_LENGTH ? (isEN() ? 'Long break ready' : '可以长休') : (isEN() ? `${FOCUS_CYCLE_LENGTH - cycle} to long break` : `再 ${FOCUS_CYCLE_LENGTH - cycle} 段长休`)}</small>
      </div>
      <div class="focus-cycle-dots" aria-label="${isEN() ? `${cycle} of 4 focus rounds` : `已完成 ${cycle} / 4 段专注`}">${cycleDots}</div>
      <button class="focus-cycle-reset" type="button" data-focus-action="reset-cycle">${isEN() ? 'Clear cycle' : '清空轮次'}</button>
    </div>
    <div class="preset-row ${mode === 'focus' ? 'is-focus-presets' : ''}" role="group" aria-label="${isEN() ? 'Duration' : '时长'}">${presetButtons}</div>
    <input id="focusTask" class="task-input" type="text" maxlength="42" value="${escapeHTML(f.task || '')}"
      placeholder="${isBreakMode(mode) ? (isEN() ? 'No task needed during a break' : '休息的时候，不必安排任务') : (isEN() ? 'What will you do in this session? (optional)' : '这一段时间要做什么？（可留空）')}"
      aria-label="${isEN() ? 'Focus task' : '专注任务'}">
    <div class="focus-auto-row">
      <div class="focus-auto-copy">
        <strong>${isEN() ? 'Auto-start next phase' : '自动进入下一段'}</strong>
        <small>${isEN() ? 'When a phase ends, start the next one automatically after a short pause.' : '一段结束后，短暂停顿就自动开始下一段。'}</small>
      </div>
      <button class="switch" type="button" data-focus-action="auto-next" aria-pressed="${Boolean(f.autoNext)}" aria-label="${isEN() ? 'Auto-start next phase' : '自动进入下一段'}"><i></i></button>
    </div>
    <div class="focus-actions">
      <button class="primary-btn" id="focusStartBtn" type="button" data-focus-action="start">${startLabel}</button>
      <button class="ghost-btn" type="button" data-focus-action="reset">${isEN() ? 'Reset' : '重置'}</button>
    </div>
    <p class="focus-hint">${mode === 'focus'
      ? (isEN()
        ? 'A focus round gives +8 affection and +2 Time Rain. Four rounds unlock a long break.'
        : '完成一段专注可获得 +8 亲密与 2 枚时之雨。每完成 4 段进入长休。')
      : (mode === 'longBreak'
        ? (isEN() ? 'Long break. Stand up, look away, and let the cycle close.' : '长休一下。站起来，看看远处，让这一轮合上。')
        : (isEN() ? 'Short break. Look away from the screen; the rain will watch the time.' : '小憩一下。把视线从屏幕上移开，雨会替你看着时间。'))}</p>
    <div class="focus-now">
      <span>${isEN() ? 'Today' : '今日'} <b id="focusTodaySessions">${todaySessions}</b> ${isEN() ? 'rounds' : '段'} · <b id="focusToday">${today}</b> ${isEN() ? 'min' : '分钟'}</span>
      <span>${isEN() ? 'Total' : '累计'} <b id="focusTotal">${state.stats.focusMinutes}</b> ${isEN() ? 'min' : '分钟'}</span>
    </div>
    ${focusWeekHTML()}
    <div class="panel-footer">${isEN() ? 'Focus records stay on this computer.' : '记录只留在这台电脑上。'}</div>`;
}

function wardrobeCopy(item, key) {
  return item[key]?.[isEN() ? 'en' : 'zh'] || '';
}

function wardrobeProgress(item) {
  const u = item.unlock || { type: 'default' };
  let current = 0;
  let target = 0;
  if (u.type === 'droplets') {
    current = state.stats.droplets || 0;
    target = u.target;
  } else if (u.type === 'affection') {
    current = state.stats.affection || 0;
    target = u.target;
  } else if (u.type === 'focus') {
    current = state.stats.focusMinutes || 0;
    target = u.target;
  } else if (u.type === 'dossiers') {
    current = (state.stats.dossiersRead || []).length;
    target = u.target;
  } else if (u.type === 'games') {
    current = state.stats.games || 0;
    target = u.target;
  } else if (u.type === 'days') {
    current = daysTogether();
    target = u.target;
  } else if (u.type === 'level') {
    current = levelInfo(state.stats.affection).level;
    target = u.target;
  }
  return {
    type: u.type,
    current,
    target,
    unlocked: u.type === 'default' || current >= target,
    percent: target ? Math.min(100, Math.round((current / target) * 100)) : 100,
  };
}

function wardrobeUnlockText(item) {
  const p = wardrobeProgress(item);
  if (p.type === 'default') return isEN() ? 'Owned from the start' : '初始拥有';
  if (p.type === 'level') {
    if (p.unlocked) return isEN() ? `Unlocked at Lv.${p.target}` : `Lv.${p.target} 解锁`;
    return `Lv.${p.current} / Lv.${p.target}`;
  }
  const unit = {
    droplets: isEN() ? 'Time Rain' : '时之雨',
    affection: isEN() ? 'affection' : '亲密度',
    focus: isEN() ? 'focus min' : '专注分钟',
    dossiers: isEN() ? 'dossiers' : '人物档案',
    games: isEN() ? 'rain rounds' : '拾雨局数',
    days: isEN() ? 'days' : '相伴天数',
  }[p.type] || '';
  return `${p.current} / ${p.target} ${unit}`;
}

function wardrobeEquipped(eq, item) {
  if (!eq) return false;
  return item.slot === 'outfit' ? eq.outfit === item.id : eq[item.slot] === item.id;
}

function wardrobePreviewStack(eq) {
  const full = eq.outfit ? wardrobeItemById(eq.outfit) : null;
  const baseSrc = full?.asset ? `../assets/wardrobe/${full.asset}.png` : '../assets/vertin-pixel.png';
  const layers = [];
  if (eq.held) {
    const item = wardrobeItemById(eq.held);
    if (item?.asset) layers.push(item);
  }
  if (eq.coat) {
    const item = wardrobeItemById(eq.coat);
    if (item?.asset) layers.push(item);
  }
  if (eq.hat && eq.hat !== 'hat') {
    const item = wardrobeItemById(eq.hat);
    if (item?.asset) layers.push(item);
  }
  if (eq.neck) {
    const item = wardrobeItemById(eq.neck);
    if (item?.asset) layers.push(item);
  }
  if (eq.face) {
    const item = wardrobeItemById(eq.face);
    if (item?.asset) layers.push(item);
  }
  if (eq.case) {
    const item = wardrobeItemById(eq.case);
    if (item?.asset) layers.push(item);
  }
  return `
    <div class="wardrobe-sprite-stack">
      <img class="wardrobe-base-sprite" src="${baseSrc}" alt="">
      ${layers.map((item) => `<img class="wardrobe-layer-sprite" src="../assets/wardrobe/${item.asset}.png" alt="">`).join('')}
    </div>`;
}

function wardrobeThumb(item) {
  if (item.fullSprite) {
    return `<span class="wardrobe-thumb-stack"><img src="../assets/wardrobe/${item.asset}.png" alt=""></span>`;
  }
  return `<span class="wardrobe-thumb-stack">
    <img src="../assets/vertin-pixel.png" alt="">
    ${item.asset ? `<img class="wardrobe-thumb-layer" src="../assets/wardrobe/${item.asset}.png" alt="">` : ''}
  </span>`;
}

function wardrobeLookSnapshot(eq) {
  const source = { ...DEFAULT_WARDROBE, ...(eq || {}) };
  return {
    outfit: source.outfit || null,
    hat: source.hat || 'hat',
    coat: source.coat || null,
    neck: source.neck || null,
    face: source.face || null,
    held: source.held || null,
    case: source.case || null,
  };
}

function normalizeWardrobeLook(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const eq = { ...DEFAULT_WARDROBE };
  let hasSomething = false;
  for (const key of ['hat', 'coat', 'neck', 'face', 'held', 'case', 'outfit']) {
    if (Object.prototype.hasOwnProperty.call(raw, key)) hasSomething = true;
    const id = raw[key];
    if (!id || !wardrobeItemById(id)) continue;
    eq[key] = id;
  }
  return hasSomething ? eq : null;
}

function wardrobeLookName(eq) {
  const ids = [
    eq.outfit,
    eq.hat && eq.hat !== 'hat' ? eq.hat : null,
    eq.coat,
    eq.neck,
    eq.face,
    eq.held,
    eq.case,
  ].filter(Boolean);
  const names = ids.map((id) => wardrobeCopy(wardrobeItemById(id), 'name')).filter(Boolean);
  if (!names.length) return isEN() ? 'Old hat & case' : '旧礼帽与旧箱';
  return names.slice(0, 2).join(' · ');
}

function wardrobeItemCard(item, eq) {
  const p = wardrobeProgress(item);
  const active = wardrobeEquipped(eq, item);
  const slot = WARDROBE_SLOTS[item.slot];
  return `
    <button class="wardrobe-item ${active ? 'is-on' : ''} ${p.unlocked ? '' : 'is-locked'}"
      type="button" data-wardrobe-item="${item.id}" aria-pressed="${active}">
      ${wardrobeThumb(item)}
      <span class="wardrobe-item-copy">
        <strong>${escapeHTML(wardrobeCopy(item, 'name'))}</strong>
        <small>${escapeHTML(slot ? slot[isEN() ? 'en' : 'zh'] : '')} · ${p.unlocked ? (active ? (isEN() ? 'Worn' : '已穿戴') : (isEN() ? 'Owned' : '可穿戴')) : wardrobeUnlockText(item)}</small>
        ${p.unlocked ? '' : `<span class="wardrobe-item-progress"><i style="width:${p.percent}%"></i></span>`}
      </span>
    </button>`;
}

function renderWardrobePanel() {
  const equipped = state.wardrobe || { ...DEFAULT_WARDROBE };
  const eq = wardrobeTryOn || { ...equipped };
  const selected = wardrobeItemById(wardrobeSelected) || WARDROBE_ITEMS[0];
  const p = wardrobeProgress(selected);
  const slot = WARDROBE_SLOTS[selected.slot];
  const active = wardrobeEquipped(eq, selected);
  const dirty = JSON.stringify(eq) !== JSON.stringify(equipped);
  const groupItems = wardrobeItemsForGroup(wardrobeFilter);
  const ownedCount = WARDROBE_ITEMS.filter((item) => wardrobeProgress(item).unlocked).length;
  return `
    ${panelHead(isEN() ? 'Wardrobe' : '衣橱', isEN() ? 'Dressing room' : '外观收藏', '◇')}
    <div class="wardrobe-preview-card">
      <div class="wardrobe-preview-stage">
        ${wardrobePreviewStack(eq)}
      </div>
      <div class="wardrobe-preview-copy">
        <span class="eyebrow">${dirty ? (isEN() ? 'TRYING ON' : '试穿中') : (isEN() ? 'CURRENT LOOK' : '当前造型')}</span>
        <strong>${escapeHTML(wardrobeLookName(eq))}</strong>
        <p>${dirty
          ? (isEN() ? 'Not saved yet. Put it on when it feels right.' : '还没有保存。觉得合适再穿上。')
          : (isEN() ? `${ownedCount} / ${WARDROBE_ITEMS.length} pieces collected.` : `已收藏 ${ownedCount} / ${WARDROBE_ITEMS.length} 件。`)}</p>
        <div class="wardrobe-mini-actions">
          <button class="mini-btn" type="button" data-wardrobe-apply ${dirty ? '' : 'disabled'}>${isEN() ? 'Wear this' : '穿上'}</button>
          <button class="ghost-btn" type="button" data-wardrobe-reset ${dirty ? '' : 'disabled'}>${isEN() ? 'Undo try-on' : '恢复当前'}</button>
        </div>
      </div>
    </div>
    <div class="wardrobe-presets">
      <div class="wardrobe-presets-head">
        <span>${isEN() ? 'Saved looks' : '造型预设'}</span>
        <small>${isEN() ? 'Three slots · tap an empty slot to save' : '三个位置 · 点空位保存当前造型'}</small>
      </div>
      <div class="wardrobe-preset-row">
        ${[0, 1, 2].map((index) => {
          const preset = state.wardrobePresets?.[index];
          return `<div class="wardrobe-preset ${preset ? 'is-set' : ''}">
            <button class="wardrobe-preset-main" type="button" data-wardrobe-preset="${index}">
              <strong>${isEN() ? `Look ${index + 1}` : `造型 ${index + 1}`}</strong>
              <small>${preset ? escapeHTML(wardrobeLookName(preset)) : (isEN() ? 'Save current' : '保存当前造型')}</small>
            </button>
            ${preset ? `<button class="wardrobe-preset-clear" type="button" data-wardrobe-preset-clear="${index}" aria-label="${isEN() ? 'Clear saved look' : '清除造型'}">×</button>` : ''}
          </div>`;
        }).join('')}
      </div>
    </div>
    <div class="wardrobe-tabs">
      ${WARDROBE_GROUPS.map((group) => `
        <button class="mini-btn ${wardrobeFilter === group.id ? 'is-active' : ''}" type="button"
          data-wardrobe-filter="${group.id}">${escapeHTML(group[isEN() ? 'en' : 'zh'])}</button>`).join('')}
    </div>
    <div class="wardrobe-grid wardrobe-grid-new">
      ${groupItems.map((item) => wardrobeItemCard(item, eq)).join('')}
    </div>
    <div class="wardrobe-detail">
      <div class="wardrobe-detail-head">
        <div>
          <span class="eyebrow">${escapeHTML(slot ? slot[isEN() ? 'en' : 'zh'] : '')}</span>
          <h3>${escapeHTML(wardrobeCopy(selected, 'name'))}</h3>
        </div>
        <span class="wardrobe-price ${p.unlocked ? '' : 'is-locked'}">${p.unlocked ? (isEN() ? 'OWNED' : '已拥有') : (isEN() ? 'LOCKED' : '未解锁')}</span>
      </div>
      <p class="wardrobe-desc">${escapeHTML(wardrobeCopy(selected, 'desc'))}</p>
      <p class="wardrobe-lore">${escapeHTML(wardrobeCopy(selected, 'lore'))}</p>
      <div class="wardrobe-progress-line">
        <span>${wardrobeUnlockText(selected)}</span>
        <span>${p.percent}%</span>
      </div>
      <div class="wardrobe-progress-track"><i style="width:${p.percent}%"></i></div>
      <div class="wardrobe-detail-actions">
        <button class="mini-btn" type="button" data-wardrobe-try="${selected.id}" ${p.unlocked ? '' : 'disabled'}>${isEN() ? 'Try on' : '试穿'}</button>
        <button class="mini-btn" type="button" data-wardrobe-apply ${p.unlocked && dirty ? '' : 'disabled'}>${isEN() ? 'Wear' : '穿上'}</button>
        <button class="ghost-btn" type="button" data-wardrobe-remove="${selected.slot}" ${p.unlocked ? '' : 'disabled'}>${isEN() ? 'Take off' : '取下'}</button>
        ${selected.action && p.unlocked ? `<button class="ghost-btn" type="button" data-wardrobe-action="${selected.id}">${escapeHTML(selected.action[isEN() ? 'en' : 'zh'])}</button>` : ''}
      </div>
    </div>
    <div class="setting-actions">
      <button class="ghost-btn" type="button" data-panel-action="profile">${isEN() ? 'Back to profile' : '返回角色资料'}</button>
    </div>
    <p class="setting-note">${isEN()
      ? 'Try-on is temporary until “Wear” is pressed. Full outfits replace the base silhouette; other pieces can still be layered.'
      : '试穿不会立刻保存，按「穿上」才换装。完整套装会替换基础造型，其他部件仍可叠加。'}</p>
    <div class="panel-footer">${isEN() ? 'Old things, kept close.' : '旧物不吵闹，只在一旁。'}</div>`;
}

function renderProfilePanel() {
  const info = levelInfo(state.stats.affection);
  const roadmap = levelRoadmap(state.stats.affection, { before: 1, after: 3 });
  const today = touchToday();
  const nextGap = info.nextAt ? Math.max(0, Math.ceil(info.nextAt - state.stats.affection)) : 0;
  const nextText = info.nextAt
    ? (isEN() ? `Next level in ${nextGap}` : `距离下一级 ${nextGap}`)
    : (isEN() ? `Maximum level Lv.${info.maxLevel} reached` : `已到达最高等级 Lv.${info.maxLevel}`);
  const recent = (state.companion.recentEvents || [])
    .map((event) => ({ event, text: companionEventText(event) }))
    .filter((entry) => entry.text)
    .slice(0, 3);
  const recentMemory = MEMORY_CHARACTERS.find((character) => character.id === memorySelection) || MEMORY_CHARACTERS[0];
  const recentLine = recent.length
    ? recent[0].text
    : (isEN() ? 'No new note yet. Stay a little and make one.' : '还没有新的记录。坐一会儿，就会有了。');
  return `
    ${panelHead(isEN() ? 'Profile' : '角色资料', isEN() ? 'Company & records' : '记录与陪伴', '◇')}
    <div class="profile-top">
      <img class="profile-sprite" src="../assets/vertin-pixel.png" alt="Vertin">
      <div class="profile-id">
        <h3>${isEN() ? 'Vertin' : '维尔汀'} <span class="profile-level">Lv.${info.level}${info.nextAt ? ` / ${info.maxLevel}` : ' MAX'}</span></h3>
        <p>${isEN() ? `Record-keeper · Day ${daysTogether()}` : `记录者 · 相伴第 ${daysTogether()} 天`}<br>${escapeHTML(info.title)}</p>
      </div>
    </div>
    <div class="profile-level-block">
      <div class="level-line"><span>${isEN() ? 'Companion level' : '同行等级'}</span><b>Lv.${info.level} / ${info.maxLevel} · ${escapeHTML(info.title)}</b></div>
      <div class="level-track"><i style="width:${Math.round(info.progress * 100)}%"></i></div>
      <div class="level-note"><span>${isEN() ? 'Affection' : '亲密度'} ${state.stats.affection}</span><span>${nextText}</span></div>
    </div>
    <details class="level-journey" open>
      <summary>
        <span>${isEN() ? 'Level journey' : '等级轨迹'}</span>
        <small>Lv.${info.level} / ${info.maxLevel} · ${isEN() ? 'next' : '下一级'} ${info.nextAt ? info.nextAt : (isEN() ? 'MAX' : '满级')}</small>
      </summary>
      <div class="level-journey-list">
        ${roadmap.rows.map((row) => `
          <div class="level-journey-row is-${row.state}">
            <span class="level-journey-num">Lv.${row.level}</span>
            <strong>${escapeHTML(row.title)}</strong>
            <small>${row.state === 'current'
              ? (isEN() ? `${state.stats.affection} affection` : `当前 ${state.stats.affection} 亲密`)
              : `${row.at} ${isEN() ? 'affection' : '亲密度'}`}</small>
          </div>`).join('')}
      </div>
    </details>
    <div class="profile-summary-grid">
      <div class="profile-summary-card">
        <span>${isEN() ? 'Affection' : '亲密度'}</span>
        <strong>${state.stats.affection}</strong>
        <small>${nextText}</small>
      </div>
      <div class="profile-summary-card">
        <span>${isEN() ? 'Today together' : '今日陪伴'}</span>
        <strong>${today.interactions || 0}<small> ${isEN() ? 'times' : '次'}</small></strong>
        <small>${today.focusMinutes || 0} ${isEN() ? 'min focus' : '分钟专注'}</small>
      </div>
      <div class="profile-summary-card profile-summary-recent">
        <span>${isEN() ? 'Recent note' : '最近记录'}</span>
        <strong>${escapeHTML(recentLine)}</strong>
        <small>${isEN() ? 'Local, quiet, yours.' : '只在本机，安静地留着。'}</small>
      </div>
    </div>
    <div class="profile-quick-actions">
      <button class="mini-btn" type="button" data-panel-action="quick-chat">${isEN() ? 'Chat' : '对话'}</button>
      <button class="mini-btn" type="button" data-panel-action="quick-focus">${isEN() ? 'Focus' : '专注'}</button>
      <button class="mini-btn" type="button" data-panel-action="quick-game">${isEN() ? 'Rain' : '拾雨'}</button>
      <button class="ghost-btn" type="button" data-panel-action="memories">${isEN() ? 'Old Records' : '旧日记录'}</button>
      <button class="ghost-btn" type="button" data-panel-action="photos">${isEN() ? 'Photo album' : '照片册'}</button>
      <button class="ghost-btn" type="button" data-panel-action="guests">${isEN() ? 'Guests' : '来客'}</button>
      <button class="ghost-btn ${checkinStatus().claimed ? '' : 'has-checkin'}" type="button" data-panel-action="checkin">${isEN() ? 'Check in' : '签到'}</button>
    </div>
    <div class="section-label">${isEN() ? 'Find a companion' : '查找同行者'}</div>
    <div class="profile-search-row">
      <input id="profileSearch" class="profile-search" type="search" autocomplete="off" placeholder="${isEN() ? 'Search name / alias / roster' : '搜索角色名 / 别名 / 名册'}">
      <button class="ghost-btn" type="button" data-panel-action="search-archive">${isEN() ? 'Search' : '搜索'}</button>
    </div>
    <div class="memory-focus profile-memory">
      <div class="memory-focus-head">
        <strong>${escapeHTML(memoryName(recentMemory, uiLang()))}</strong>
        <small>${escapeHTML(memorySubtitle(recentMemory, uiLang()))}</small>
      </div>
      <p class="memory-text">${escapeHTML(memoryText(recentMemory, uiLang()))}</p>
    </div>
    <details class="profile-more">
      <summary>${isEN() ? 'More records' : '更多记录'}</summary>
      <div class="stat-grid">
        <div class="stat-cell"><span>${isEN() ? 'Time Rain' : '时之雨'}</span><b>${state.stats.droplets}<small> ${isEN() ? 'drops' : '滴'}</small></b></div>
        <div class="stat-cell"><span>${isEN() ? 'Clear Drop' : '纯雨滴'}</span><b>${state.stats.clearDrops || 0}<small> ${isEN() ? 'drops' : '滴'}</small></b></div>
        <div class="stat-cell"><span>${isEN() ? 'Crystal Drop' : '粹雨滴'}</span><b>${state.stats.crystalDrops || 0}<small> ${isEN() ? 'drops' : '滴'}</small></b></div>
        <div class="stat-cell"><span>${isEN() ? 'Head pats' : '被摸头'}</span><b>${state.stats.pats}<small> ${isEN() ? 'times' : '次'}</small></b></div>
        <div class="stat-cell"><span>${isEN() ? 'Focus time' : '专注时间'}</span><b>${state.stats.focusMinutes}<small> ${isEN() ? 'min' : '分钟'}</small></b></div>
        <div class="stat-cell"><span>${isEN() ? 'Rain rounds' : '拾雨局数'}</span><b>${state.stats.games}<small> ${isEN() ? 'rounds' : '局'}</small></b></div>
        <div class="stat-cell"><span>${isEN() ? 'Best rain' : '最高拾雨'}</span><b>${state.stats.bestScore}<small> ${isEN() ? 'drops' : '滴'}</small></b></div>
        <div class="stat-cell"><span>${isEN() ? 'Days met' : '相遇天数'}</span><b>${daysTogether()}<small> ${isEN() ? 'days' : '天'}</small></b></div>
      </div>
    </details>
    <p class="profile-note">${isEN() ? 'Everything stays on this computer. The profile now starts with today, not a long roster.' : '资料只保存在本机。资料页先展示今天，而不是一整面名册。'}</p>
    <div class="panel-footer">${isEN() ? 'Records grow slowly; no need to rush.' : '记录会慢慢变厚，不必急着翻完。'}</div>`;
}

function selectedMemory() {
  return MEMORY_CHARACTERS.find((character) => character.id === memorySelection) || MEMORY_CHARACTERS[0];
}

function memoryResults() {
  const q = memoryQuery.trim().toLowerCase();
  if (!q) {
    const withDossier = MEMORY_CHARACTERS.filter((character) => dossierForCharacter(character));
    return withDossier.length ? withDossier : MEMORY_CHARACTERS.slice(0, 12);
  }
  return MEMORY_CHARACTERS.filter((character) => [
    character.zhName,
    character.enName,
    character.zhSubtitle,
    character.enSubtitle,
  ].filter(Boolean).join(' ').toLowerCase().includes(q)).slice(0, 40);
}

function memoryChipsHTML(selected) {
  return memoryResults().map((character) => `
    <button class="memory-chip ${character.id === selected.id ? 'is-active' : ''}" type="button"
      data-memory-select="${character.id}">${escapeHTML(memoryName(character, uiLang()))}</button>`).join('');
}

function refreshMemoryPanel() {
  const results = memoryResults();
  let selected = selectedMemory();
  if (results.length && !results.some((character) => character.id === selected.id)) {
    selected = results[0];
    memorySelection = selected.id;
  }
  const list = els.panel.querySelector('#memoryIndex');
  const count = els.panel.querySelector('#memoryCount');
  if (list) list.innerHTML = memoryChipsHTML(selected);
  if (count) {
    count.textContent = isEN()
      ? `${results.length} / ${MEMORY_CHARACTERS.length} shown`
      : `显示 ${results.length} / ${MEMORY_CHARACTERS.length} 位`;
  }
  const name = els.panel.querySelector('[data-memory-name]');
  const subtitle = els.panel.querySelector('[data-memory-subtitle]');
  const text = els.panel.querySelector('[data-memory-text]');
  if (name) name.textContent = memoryName(selected, uiLang());
  if (subtitle) subtitle.textContent = memorySubtitle(selected, uiLang());
  if (text) text.textContent = memoryText(selected, uiLang());
  const dossierButton = els.panel.querySelector('[data-memory-dossier]');
  const dossier = dossierForCharacter(selected);
  if (dossierButton) {
    dossierButton.dataset.dossierOpen = dossier?.id || '';
    dossierButton.hidden = !dossier;
  }
}

function renderMemoriesPanel() {
  const results = memoryResults();
  let selected = selectedMemory();
  if (results.length && !results.some((character) => character.id === selected.id)) {
    selected = results[0];
    memorySelection = selected.id;
  }
  const dossierCount = MEMORY_CHARACTERS.filter((character) => dossierForCharacter(character)).length;
  return `
    ${panelHead(isEN() ? 'Old Records' : '旧日记录', isEN()
      ? `${dossierCount} with dossiers · ${MEMORY_CHARACTERS.length} companions`
      : `${dossierCount} 位有档案 · 共 ${MEMORY_CHARACTERS.length} 位同行者`, '◇')}
    <p class="memory-intro">${isEN()
      ? `First page lists the ${dossierCount} companions with character dossiers. Search to reach the full roster.`
      : `首页直接列出 ${dossierCount} 位已有人物档案的同行者；搜索可以找到完整 ${MEMORY_CHARACTERS.length} 位名册。`}</p>
    <div class="memory-search-row">
      <input id="memorySearch" class="memory-search" type="search" autocomplete="off" value="${escapeHTML(memoryQuery)}" placeholder="${isEN() ? 'Search name or alias' : '搜索名字或别名'}">
      <span id="memoryCount" class="memory-count">${isEN() ? `${memoryResults().length} / ${MEMORY_CHARACTERS.length} shown` : `显示 ${memoryResults().length} / ${MEMORY_CHARACTERS.length} 位`}</span>
    </div>
    <div id="memoryIndex" class="memory-index">
      ${memoryChipsHTML(selected)}
    </div>
    <div class="memory-focus">
      <div class="memory-focus-head">
        <strong data-memory-name>${escapeHTML(memoryName(selected, uiLang()))}</strong>
        <small data-memory-subtitle>${escapeHTML(memorySubtitle(selected, uiLang()))}</small>
      </div>
      <p class="memory-text" data-memory-text>${escapeHTML(memoryText(selected, uiLang()))}</p>
    </div>
    <button class="ghost-btn memory-dossier-btn" type="button" data-memory-dossier data-dossier-open="${dossierForCharacter(selected)?.id || ''}" ${dossierForCharacter(selected) ? '' : 'hidden'}>${isEN() ? 'Open character dossier' : '查看人物档案'}</button>
    <div class="setting-actions">
      <button class="ghost-btn" type="button" data-panel-back>${isEN() ? 'Back one level' : '返回上一级'}</button>
      <button class="ghost-btn" type="button" data-panel-action="memory-random">${isEN() ? 'Another page' : '再翻一页'}</button>
    </div>
    <button class="ghost-btn archive-entry-btn" type="button" data-panel-action="archive">${isEN() ? `Archive · ${ARCHIVE_META.characters}` : `箱中档案 · ${ARCHIVE_META.characters}`}</button>
    <div class="panel-footer">${isEN() ? 'The first page is the dossier shelf; search opens the rest of the roster.' : '首页是人物档案书架；搜索可以打开其余名册。'}</div>`;
}

function selectMemory(id, randomize = false) {
  const character = MEMORY_CHARACTERS.find((entry) => entry.id === id);
  if (!character) return;
  memorySelection = character.id;
  if (panelName !== 'memories') return;
  els.panel.querySelectorAll('[data-memory-select]').forEach((button) => {
    const active = button.dataset.memorySelect === character.id;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', active);
  });
  const name = els.panel.querySelector('[data-memory-name]');
  const subtitle = els.panel.querySelector('[data-memory-subtitle]');
  const text = els.panel.querySelector('[data-memory-text]');
  if (name) name.textContent = memoryName(character, uiLang());
  if (subtitle) subtitle.textContent = memorySubtitle(character, uiLang());
  if (text) {
    text.textContent = memoryText(character, uiLang());
    text.classList.remove('is-changing');
    void text.offsetWidth;
    text.classList.add('is-changing');
  }
  const dossierButton = els.panel.querySelector('[data-memory-dossier]');
  if (dossierButton) {
    const dossier = dossierForCharacter(character);
    dossierButton.hidden = !dossier;
    dossierButton.dataset.dossierOpen = dossier?.id || '';
    dossierButton.textContent = isEN() ? 'Open character dossier' : '查看人物档案';
  }
  audio.tick();
}

function archiveItems() {
  return archiveMode === 'npcs' ? ARCHIVE_NPCS : ARCHIVE_CHARACTERS;
}

function archiveName(item) {
  if (isEN()) {
    const alias = (item.aliases || []).find((value) => /^[\x20-\x7E]+$/.test(value) && !/[\u4e00-\u9fff]/.test(value));
    if (alias) return alias;
  }
  return item.nameZh || (item.aliases && item.aliases[0]) || '—';
}

function archiveStatusLabel(level) {
  const labels = {
    identity_seed: ['身份种子', 'Identity seed'],
    announcement_only: ['仅公告', 'Announcement only'],
    published_story_and_announcement: ['已公开故事与公告', 'Published story & announcement'],
    basic_sourced_summary: ['基础资料摘要', 'Basic sourced summary'],
    candidate_needs_source: ['候选／待回源', 'Candidate / needs source'],
  };
  const picked = labels[level] || [level || '基础档案', level || 'Basic archive'];
  return isEN() ? picked[1] : picked[0];
}

function archiveFilteredItems() {
  const items = archiveItems();
  const q = archiveQuery.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) => [
    item.nameZh,
    ...(item.aliases || []),
    item.recordClass,
    item.theme,
    item.category,
    item.version,
  ].filter(Boolean).join(' ').toLowerCase().includes(q));
}

function archiveListHTML() {
  const items = archiveFilteredItems();
  if (!items.length) return `<p class="archive-empty">${isEN() ? 'No matching archive entries.' : '没有匹配的档案。'}</p>`;
  return items.map((item) => {
    const rarity = item.rarity ? `${item.rarity}★` : '—';
    const meta = archiveMode === 'npcs'
      ? (isEN() ? 'Story figure' : item.category || '剧情人物')
      : `${rarity} · ${item.version || '—'}${isEN() ? '' : ` · ${item.recordClass || '档案'}`}`;
    return `<button class="archive-row ${item.id === archiveSelection ? 'is-active' : ''}" type="button" data-archive-id="${escapeHTML(item.id)}">
      <span class="archive-row-name">${escapeHTML(archiveName(item))}</span>
      <span class="archive-row-meta">${escapeHTML(meta)}</span>
    </button>`;
  }).join('');
}

function archiveDetailHTML() {
  const item = archiveItems().find((entry) => entry.id === archiveSelection) || archiveItems()[0];
  if (!item) return '';
  const source = (item.sources || [])[0];
  const displayName = archiveName(item);
  const aliases = (item.aliases || []).filter((alias) => alias !== displayName);
  const fields = archiveMode === 'npcs'
    ? [
      [isEN() ? 'Category' : '分类', isEN() ? 'Story figure' : item.category || '—'],
      [isEN() ? 'Status' : '状态', archiveStatusLabel(item.factStatus)],
    ]
    : [
      [isEN() ? 'Rarity' : '稀有度', item.rarity ? `${item.rarity}★` : '—'],
      [isEN() ? 'Version' : '首次实装', item.version || '—'],
      [isEN() ? 'Status' : '档案状态', archiveStatusLabel(item.memoryLevel)],
    [isEN() ? 'Desk sketch' : '桌边速写', MEMORY_CHARACTERS.some((character) => character.zhName === item.nameZh) ? (isEN() ? 'available' : '已收录') : (isEN() ? 'queued' : '待补齐')],
    ];
  return `
    <div class="archive-detail-head">
      <h3>${escapeHTML(displayName)}</h3>
      ${aliases.length ? `<small>${escapeHTML(aliases.join(' · '))}</small>` : ''}
    </div>
    <div class="archive-fields">
      ${fields.map(([label, value]) => `<span><b>${escapeHTML(label)}</b>${escapeHTML(value)}</span>`).join('')}
    </div>
    ${!isEN() && item.summary ? `<p class="archive-summary">${escapeHTML(item.summary)}</p>` : ''}
    ${!isEN() && item.theme ? `<p class="archive-summary">主题：${escapeHTML(item.theme)}</p>` : ''}
    ${isEN() ? '<p class="archive-summary archive-summary-note">The source package keeps its short archive summary in Chinese; this index shows the identity and source fields only.</p>' : ''}
    ${dossierForName(item.nameZh) ? `<button class="mini-btn archive-source" type="button" data-dossier-open="${dossierForName(item.nameZh).id}">${isEN() ? 'Open character dossier' : '查看人物档案'}</button>` : ''}
    ${source ? `<button class="mini-btn archive-source" type="button" data-archive-source="${escapeHTML(source.url)}">${isEN() ? 'Open source' : '打开来源'}</button>` : ''}
  `;
}

function refreshArchiveList() {
  const items = archiveFilteredItems();
  if (items.length && !items.some((item) => item.id === archiveSelection)) {
    archiveSelection = items[0].id;
  }
  const list = els.panel.querySelector('#archiveList');
  const count = els.panel.querySelector('#archiveCount');
  if (list) list.innerHTML = archiveListHTML();
  if (count) {
    const total = archiveItems().length;
    const shown = items.length;
    count.textContent = isEN() ? `${shown} / ${total} entries` : `显示 ${shown} / ${total} 条`;
  }
  const detail = els.panel.querySelector('#archiveDetail');
  if (detail) detail.innerHTML = archiveDetailHTML();
}

function renderArchivePanel() {
  const en = isEN();
  const covered = MEMORY_CHARACTERS.filter((character) => (
    ARCHIVE_CHARACTERS.some((item) => item.nameZh === character.zhName)
  )).length;
  return `
    ${panelHead(en ? 'Archive' : '箱中档案', en ? '4.1 source index' : '4.1 基础档案索引', '◇')}
    <p class="archive-note">${en
      ? 'A basic archive index, not a complete story-memory corpus. Status, sources and missing fields are preserved; unverified material is not treated as settled canon. Checked:'
      : '基础档案索引，不是完整剧情记忆。资料状态、来源和缺项都保留；未回源内容不当作确定剧情。'} ${en ? `Desk sketches: ${covered} / ${ARCHIVE_META.characters}. Checked:` : `桌边速写已收录 ${covered} / ${ARCHIVE_META.characters} 位。核对日期：`} ${escapeHTML(ARCHIVE_META.checkedOn || '—')}${en ? '.' : '。'}</p>
    <input id="archiveSearch" class="archive-search" type="search" autocomplete="off" placeholder="${en ? 'Search name or alias' : '搜索角色名或英文名'}" value="${escapeHTML(archiveQuery)}" aria-label="${en ? 'Search character archive' : '搜索角色档案'}">
    <div class="archive-tabs" role="group" aria-label="${en ? 'Archive categories' : '档案分类'}">
      <button class="mini-btn ${archiveMode === 'characters' ? 'is-active' : ''}" type="button" data-archive-mode="characters">${en ? 'Characters' : '角色'} · ${ARCHIVE_META.characters}</button>
      <button class="mini-btn ${archiveMode === 'npcs' ? 'is-active' : ''}" type="button" data-archive-mode="npcs">${en ? 'Story figures' : '剧情人物'} · ${ARCHIVE_META.npcs}</button>
    </div>
    <div id="archiveCount" class="archive-count">${en ? `${archiveFilteredItems().length} / ${archiveItems().length} entries` : `显示 ${archiveFilteredItems().length} / ${archiveItems().length} 条`}</div>
    <div class="archive-rarity">6★ ${ARCHIVE_META.counts?.['6'] || 76} · 5★ ${ARCHIVE_META.counts?.['5'] || 31} · 4★ ${ARCHIVE_META.counts?.['4'] || 19} · 3★ ${ARCHIVE_META.counts?.['3'] || 11} · 2★ ${ARCHIVE_META.counts?.['2'] || 2}</div>
    <div id="archiveList" class="archive-list">${archiveListHTML()}</div>
    <div id="archiveDetail" class="archive-detail">${archiveDetailHTML()}</div>
    <div class="setting-actions">
      <button class="ghost-btn" type="button" data-panel-back>${en ? 'Back one level' : '返回上一级'}</button>
    </div>
    <div class="panel-footer">${en ? 'The roster is not verified story memory; full event chains still need source-by-source checks.' : '基础名册不等于剧情已核验；完整事件链仍需逐条回源。'}</div>`;
}

function selectArchive(id) {
  archiveSelection = id;
  els.panel.querySelectorAll('[data-archive-id]').forEach((row) => {
    row.classList.toggle('is-active', row.dataset.archiveId === id);
  });
  const detail = els.panel.querySelector('#archiveDetail');
  if (detail) detail.innerHTML = archiveDetailHTML();
}

function dossierBi(value) {
  if (!value) return '';
  return value[isEN() ? 'en' : 'zh'] || '';
}

function renderDossierPanel() {
  const dossier = CHARACTER_DOSSIERS[dossierSelection] || Object.values(CHARACTER_DOSSIERS)[0];
  if (!dossier) return `${panelHead(isEN() ? 'Character dossier' : '人物档案', '37', '◇')}<p class="archive-empty">${isEN() ? 'No dossier yet.' : '这份人物档案还没有补齐。'}</p>`;
  const en = isEN();
  const rarityLabel = dossier.rarity ? `${dossier.rarity}★` : (en ? 'Story figure' : '剧情人物');
  const facts = [
    [en ? 'Rarity' : '星级', rarityLabel],
    [en ? 'Afflatus' : '灵感', dossierBi(dossier.element)],
    [en ? 'Medium' : '介质', dossierBi(dossier.medium)],
    [en ? 'Age' : '年龄', dossier.age],
    [en ? 'Birthday' : '生日', dossierBi(dossier.birthday)],
    [en ? 'Affiliation' : '所属', dossierBi(dossier.affiliation)],
  ];
  const safeRelations = (dossier.relationships || []).map((relation) => `
    <li><b>${escapeHTML(dossierBi(relation.name))}</b><span>${escapeHTML(dossierBi(relation.role))}</span></li>`).join('');
  const spoilerRelations = (dossier.spoiler?.relationships || []).map((relation) => `
    <li><b>${escapeHTML(dossierBi(relation.name))}</b><span>${escapeHTML(dossierBi(relation.role))}</span></li>`).join('');
  const story = (dossier.spoiler?.story?.[en ? 'en' : 'zh'] || []).map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join('');
  const lines = (dossier.lines || []).map((line) => `<li>${escapeHTML(dossierBi(line))}</li>`).join('');
  const sources = (dossier.sources || []).map((source) => `
    <li><button class="dossier-source-link" type="button" data-dossier-source="${escapeHTML(source.url)}">${escapeHTML(source.label)}</button></li>`).join('');
  const aliasLabels = (dossier.aliases?.[en ? 'en' : 'zh'] || []).filter((alias) => (
    alias !== dossier.nameEn
    && alias !== dossier.nameZh
    && alias !== dossierBi(dossier.title)
  ));
  const displayName = en ? (dossier.nameEn || dossier.nameZh) : dossier.nameZh;
  const altName = en ? dossier.nameZh : dossier.nameEn;
  return `
    ${panelHead(en ? 'Character dossier' : '人物档案', `${displayName} · ${escapeHTML(dossier.completion?.[en ? 'en' : 'zh'] || (en ? 'deep dossier' : '深度档案'))}`, '◇')}
    <div class="dossier-hero">
      <strong>${escapeHTML(displayName)}</strong>
      ${altName && altName !== displayName ? `<small>${escapeHTML(altName)}</small>` : ''}
      <p>${escapeHTML(dossierBi(dossier.title))}${aliasLabels.length ? ` · ${escapeHTML(aliasLabels.join(' / '))}` : ''}</p>
      <div class="dossier-badges">
        <span>${escapeHTML(rarityLabel)}</span>
        <span>${escapeHTML(dossierBi(dossier.element))}</span>
        <span>${escapeHTML(dossierBi(dossier.medium))}</span>
        <span class="dossier-badge-origin">${en ? 'fan synthesis' : '同人整理'}</span>
      </div>
    </div>
    <div class="dossier-origin-note">
      <strong>${en ? 'Reading key' : '阅读说明'}</strong>
      <span>${en
        ? 'Rarity, afflatus, medium, age and birthday are public game fields. Identity, personality, voice notes and desk memories are an original fan synthesis, not official dialogue.'
        : '星级、灵感、介质、年龄与生日为游戏公开字段；「身份」「性格」「说话方式」「桌边速写」为同人整理，不是官方台词。'}</span>
    </div>
    <div class="dossier-fields">
      ${facts.filter(([, value]) => value).map(([label, value]) => `<span><b>${escapeHTML(label)}</b>${escapeHTML(value)}</span>`).join('')}
    </div>
    <section class="dossier-section">
      <h3>${en ? 'Who they are' : '身份'} <em class="dossier-origin-tag">${en ? 'fan synthesis' : '同人整理'}</em></h3>
      <p>${escapeHTML(dossierBi(dossier.identity))}</p>
    </section>
    <section class="dossier-section">
      <h3>${en ? 'Personality' : '性格与距离'} <em class="dossier-origin-tag">${en ? 'fan synthesis' : '同人整理'}</em></h3>
      <ul>${dossier.personality[en ? 'en' : 'zh'].map((item) => `<li>${escapeHTML(item)}</li>`).join('')}</ul>
    </section>
    <section class="dossier-section">
      <h3>${en ? 'How they speak' : '说话方式'} <em class="dossier-origin-tag">${en ? 'original voice notes' : '原创语气样本'}</em></h3>
      <ul>${dossier.voice[en ? 'en' : 'zh'].map((item) => `<li>${escapeHTML(item)}</li>`).join('')}</ul>
    </section>
    <section class="dossier-section">
      <h3>${en ? 'People around them' : '身边的人'}</h3>
      <ul class="dossier-relations">${safeRelations}</ul>
    </section>
    <section class="dossier-section dossier-memories">
      <h3>${en ? 'Desk memories' : '桌边速写'} <em class="dossier-origin-tag">${en ? 'fan-written' : '同人补写'}</em></h3>
      <ul>${lines}</ul>
    </section>
    <div class="dossier-spoiler">
      <div class="dossier-spoiler-head">
        <div>
          <strong>${en ? 'Story & spoilers' : '故事线与剧透'}</strong>
          <small>${escapeHTML(dossierBi(dossier.spoiler?.warning))}</small>
        </div>
        <button class="mini-btn" type="button" data-dossier-spoiler-toggle aria-expanded="false">${en ? 'Show spoilers' : '显示剧透'}</button>
      </div>
      <div id="dossierSpoilerContent" class="dossier-spoiler-content" hidden>
        ${spoilerRelations ? `<h4>${en ? 'Later relationships' : '后来的人'}</h4><ul class="dossier-relations">${spoilerRelations}</ul>` : ''}
        <h4>${en ? 'Story' : '故事线'}</h4>
        ${story}
      </div>
    </div>
    <section class="dossier-section dossier-sources">
      <h3>${en ? 'Sources' : '来源'} <em class="dossier-origin-tag">${en ? 'public summaries' : '公开摘要'}</em></h3>
      <ul>${sources}</ul>
      <p>${en ? 'These are public archive/story summaries, not official script quotations. Details may contain spoilers; verify before treating them as canon.' : '以上为公开档案/剧情摘要整理，不是官方剧本引用；细节含剧透，引用前请再回源核对。'}</p>
    </section>
    <div class="setting-actions">
      <button class="ghost-btn" type="button" data-panel-back>${en ? 'Back one level' : '返回上一级'}</button>
      <button class="ghost-btn" type="button" data-panel-action="archive">${en ? 'Open archive' : '箱中档案'}</button>
    </div>`;
}

function renderConversationSummaries() {
  const en = isEN();
  const summaries = Array.isArray(state.companion.summaries) ? state.companion.summaries : [];
  return `<div class="section-label">${en ? 'Conversation summaries' : '对话摘要'}</div>
    <p class="setting-note">${en
      ? 'Every 12 replies, a short local summary is kept. It is not sent to any server unless you continue the conversation.'
      : '每 12 轮回复保存一条本地摘要。除非你继续聊天，否则不会发给任何服务器。'}</p>
    ${summaries.length ? `<div class="conversation-summaries">
      ${summaries.map((summary) => `<div class="conversation-summary">
        <div><span>${escapeHTML(summary.text)}</span><small>${new Date(summary.at || Date.now()).toLocaleDateString(en ? 'en-US' : 'zh-CN')} · ${summary.turns || 12} ${en ? 'turns' : '轮'}</small></div>
        <button class="memory-delete" type="button" data-summary-delete="${summary.id}" aria-label="${en ? 'Delete summary' : '删除摘要'}">×</button>
      </div>`).join('')}
    </div>` : `<p class="conversation-summary-empty">${en ? 'No summaries yet.' : '还没有摘要。'}</p>`}`;
}

function maybeSummarizeChat() {
  state.companion.chatTurns = (state.companion.chatTurns || 0) + 1;
  if (state.companion.chatTurns < 12) {
    saveSoon();
    return;
  }
  const userLines = chatHistory
    .filter((message) => message.role === 'user')
    .map((message) => String(message.content || '').replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .slice(-6);
  if (userLines.length) {
    const en = isEN();
    const text = `${en ? 'Recently talked about: ' : '最近聊到：'}${userLines.join(en ? '; ' : '；')}`.slice(0, 420);
    state.companion.summaries = [
      {
        id: `summary-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
        at: Date.now(),
        turns: 12,
        text,
      },
      ...(Array.isArray(state.companion.summaries) ? state.companion.summaries : []),
    ].slice(0, 8);
  }
  state.companion.chatTurns = 0;
  saveSoon();
}

function deleteConversationSummary(id) {
  state.companion.summaries = (state.companion.summaries || []).filter((summary) => summary.id !== id);
  saveNow();
  refreshSettingsKeepingScroll();
  toast(isEN() ? 'Summary deleted.' : '摘要已删除。', 'info', 2200);
}

let dialogueEvalResults = [];

function runDialogueEval() {
  dialogueEvalResults = DIALOGUE_EVAL_CASES.map((testCase) => {
    let reply = '';
    try {
      reply = String(replyTo(testCase.input) || '');
    } catch {
      reply = '';
    }
    return {
      ...testCase,
      reply,
      pass: Boolean(reply) && testCase.expect.test(reply),
    };
  });
  return dialogueEvalResults;
}

function renderDialogueEvalPanel() {
  if (!dialogueEvalResults.length) runDialogueEval();
  const passed = dialogueEvalResults.filter((result) => result.pass).length;
  return `${panelHead(isEN() ? 'Dialogue checks' : '对话自检', isEN() ? '12 fixed offline prompts' : '12 个固定离线场景', '◇')}
    <p class="setting-note">${isEN()
      ? 'These checks only exercise the local reply rules. No API request is made.'
      : '这里只测试本地回复规则，不会请求 DeepSeek，也不会上传内容。'}</p>
    <div class="dialogue-eval-score ${passed === dialogueEvalResults.length ? 'is-pass' : ''}">
      <strong>${passed} / ${dialogueEvalResults.length}</strong>
      <span>${isEN() ? 'passed' : '通过'}</span>
    </div>
    <div class="dialogue-eval-list">
      ${dialogueEvalResults.map((result) => `<div class="dialogue-eval-item ${result.pass ? 'is-pass' : 'is-fail'}">
        <div><span>${escapeHTML(result.input)}</span><small>${escapeHTML(result.reply || '—')}</small></div>
        <b>${result.pass ? 'PASS' : 'FAIL'}</b>
      </div>`).join('')}
    </div>
    <div class="setting-actions">
      <button class="primary-btn" type="button" data-panel-action="run-dialogue-eval">${isEN() ? 'Run again' : '再跑一次'}</button>
      <button class="ghost-btn" type="button" data-panel-back>${isEN() ? 'Back' : '返回'}</button>
    </div>`;
}

function memoryCategoryLabel(category) {
  const entry = MEMORY_CATEGORIES.find((item) => item.id === category) || MEMORY_CATEGORIES[3];
  return entry[isEN() ? 'en' : 'zh'];
}

function memoryCategoryOptions(selected = 'other') {
  return MEMORY_CATEGORIES.map((category) => `<option value="${category.id}" ${category.id === selected ? 'selected' : ''}>${escapeHTML(category[isEN() ? 'en' : 'zh'])}</option>`).join('');
}

function refreshSettingsKeepingScroll() {
  const scroll = els.panel?.scrollTop || 0;
  renderPanel('settings');
  requestAnimationFrame(() => {
    if (els.panel) els.panel.scrollTop = Math.min(scroll, els.panel.scrollHeight);
  });
}

function togglePinnedMemory(id) {
  const memory = state.memories.find((entry) => entry.id === id);
  if (!memory) return;
  if (!memory.pinned && state.memories.filter((entry) => entry.pinned).length >= MAX_PINNED_MEMORIES) {
    toast(isEN() ? 'You can pin up to 3 memories.' : '最多置顶 3 条记忆。', 'info', 2400);
    return;
  }
  memory.pinned = !memory.pinned;
  saveNow();
  refreshSettingsKeepingScroll();
  toast(isEN()
    ? (memory.pinned ? 'Pinned for longer context.' : 'Unpinned.')
    : (memory.pinned ? '已置顶，会优先进入长期上下文。' : '已取消置顶。'), 'success', 2200);
}

function renderMemorySettings() {
  const en = isEN();
  const memories = [...(Array.isArray(state.memories) ? state.memories : [])]
    .sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)));
  const pinnedCount = memories.filter((memory) => memory.pinned).length;
  return `
    <div class="memory-settings">
      ${memories.length ? `<div class="memory-list">
        ${memories.map((memory) => {
          const editing = memoryEditingId === memory.id;
          return `<div class="memory-item ${memory.pinned ? 'is-pinned' : ''}">
            <div class="memory-item-copy">
              ${editing
                ? `<input id="memoryEditInput" class="memory-edit-input" type="text" maxlength="120" value="${escapeHTML(memory.text)}" autocomplete="off" spellcheck="false">
                   <select id="memoryEditCategory" class="memory-category-select" aria-label="${en ? 'Memory category' : '记忆分类'}">${memoryCategoryOptions(memory.category)}</select>`
                : `<span>${escapeHTML(memory.text)}</span>`}
              <small class="memory-meta">${memoryCategoryLabel(memory.category)}${memory.pinned ? (en ? ' · pinned' : ' · 已置顶') : ''}</small>
            </div>
            <div class="memory-item-actions">
              ${editing
                ? `<button class="mini-btn" type="button" data-memory-save="${memory.id}">${en ? 'Save' : '保存'}</button>
                   <button class="ghost-btn" type="button" data-memory-cancel="${memory.id}">${en ? 'Cancel' : '取消'}</button>`
                : `<button class="memory-pin ${memory.pinned ? 'is-on' : ''}" type="button" data-memory-pin="${memory.id}" aria-pressed="${Boolean(memory.pinned)}">${memory.pinned ? (en ? 'Unpin' : '取消置顶') : (en ? 'Pin' : '置顶')}</button>
                   <button class="ghost-btn" type="button" data-memory-edit="${memory.id}">${en ? 'Edit' : '改'}</button>
                   <button class="memory-delete" type="button" data-memory-delete="${memory.id}" aria-label="${en ? 'Delete memory' : '删除记忆'}">×</button>`}
            </div>
          </div>`;
        }).join('')}
      </div>` : `<div class="empty-state memory-empty"><strong>${en ? 'Nothing kept yet.' : '还没有记住的事。'}</strong><p>${en ? 'When a reply offers a memory, you can keep, edit, or ignore it.' : '回复里出现记忆提示时，可以选择记住、修改或忽略。'}</p></div>`}
      <div class="setting-actions">
        <span class="memory-count">${memories.length} / 20 · ${en ? `${pinnedCount} / 3 pinned` : `置顶 ${pinnedCount} / 3`}</span>
        ${memories.length ? `<button class="ghost-btn" type="button" data-panel-action="clear-memories">${en ? 'Clear all' : '清空记忆'}</button>` : ''}
      </div>
      <p class="setting-note">${en
        ? 'Only memories you confirm are kept locally. Relevant ones may be sent as chat context; pinned memories are preferred for longer context.'
        : '只保存你确认过的记忆。聊天时只注入与当前话题相关的内容；置顶记忆会优先进入长期上下文。'}</p>
      ${renderConversationSummaries()}
    </div>`;
}

function saveEditedMemory(id) {
  const input = els.panel?.querySelector('#memoryEditInput');
  const text = String(input?.value || '').replace(/\s+/g, ' ').trim().slice(0, 120);
  if (text.length < 4) {
    toast(isEN() ? 'That is a little too short.' : '这句话太短了，再写具体一点。', 'info', 2200);
    return;
  }
  if (state.memories.some((memory) => memory.id !== id && memory.text.toLowerCase() === text.toLowerCase())) {
    toast(isEN() ? 'That memory already exists.' : '这条记忆已经存在了。', 'info', 2200);
    return;
  }
  const categorySelect = els.panel?.querySelector('#memoryEditCategory');
  const category = MEMORY_CATEGORY_IDS.has(categorySelect?.value) ? categorySelect.value : 'other';
  state.memories = state.memories.map((memory) => (memory.id === id ? {
    ...memory,
    text,
    category,
    at: Date.now(),
  } : memory));
  memoryEditingId = null;
  saveNow();
  refreshSettingsKeepingScroll();
  toast(isEN() ? 'Memory updated.' : '记忆已更新。', 'success', 2400);
}

function deleteMemory(id) {
  state.memories = state.memories.filter((memory) => memory.id !== id);
  if (memoryEditingId === id) memoryEditingId = null;
  saveNow();
  refreshSettingsKeepingScroll();
  toast(isEN() ? 'Memory deleted.' : '记忆已删除。', 'info', 2200);
}

function clearMemories() {
  state.memories = [];
  memoryEditingId = null;
  saveNow();
  renderPanel('settings');
  toast(isEN() ? 'All remembered things cleared.' : '已清空全部记忆。', 'info', 2600);
}

function renderSettingsPanel() {
  const s = state.settings;
  const en = isEN();
  const llmSaved = Boolean(llmStatus.hasKey);
  const llmStatusText = en
    ? `${llmStatus.enabled ? 'Enabled' : 'Disabled'} · ${llmSaved ? 'API key saved' : 'No API key'}`
    : `${llmStatus.enabled ? '已启用' : '未启用'} · ${llmSaved ? '已保存密钥' : '未保存密钥'}`;
  const keyPlaceholder = en
    ? (llmSaved ? 'Saved — leave blank to keep' : 'Paste a DeepSeek API key')
    : (llmSaved ? '已保存，留空保持不变' : '粘贴 DeepSeek API Key');
  const row = (key, title, desc, checked, extra = '') => `
    <div class="setting-row">
      <div class="setting-copy"><strong>${title}</strong><small>${desc}</small></div>
      ${extra}
      <button class="switch" type="button" data-setting="${key}" aria-pressed="${checked}" aria-label="${title}"></button>
    </div>`;
  const volDisabled = s.sound ? '' : 'disabled';
  return `
    ${panelHead('桌面设置', '安静与位置', '⌘')}
    <div class="section-label">声音</div>
    <div class="setting-list">
      ${row('sound', '雨声与音效', '程序实时合成的雨声、钟声与互动音。', s.sound)}
      <div class="setting-row">
        <div class="setting-copy"><strong>音量</strong><small>让雨声停在合适的距离。</small></div>
        <div class="volume-row">
          <input id="volumeSlider" type="range" min="0" max="100" step="1" value="${Math.round(s.volume * 100)}" aria-label="音量" ${volDisabled}>
          <span class="volume-num">${Math.round(s.volume * 100)}%</span>
        </div>
        <button class="mini-btn" type="button" data-panel-action="test-sound">试听</button>
      </div>
      ${row('voice', '语音朗读', '用系统中文语音轻轻念出对话。默认关闭。', s.voice)}
    </div>
    <div class="section-label">${en ? 'Companionship' : '陪伴'}</div>
    <div class="setting-list">
      <div class="setting-row setting-row-stack">
        <div class="setting-copy">
          <strong>主动发言</strong>
          <small>安静只回应；偶尔每天最多两次；正常会主动聊起近况。</small>
        </div>
        <div class="size-options" role="group" aria-label="主动发言频率">
          ${[['quiet', '安静'], ['occasional', '偶尔'], ['normal', '正常']].map(([value, label]) => `
            <button class="mini-btn size-btn ${s.proactive === value ? 'is-active' : ''}"
              type="button" data-proactive="${value}" aria-pressed="${s.proactive === value}">${label}</button>`).join('')}
        </div>
      </div>
      ${row('rememberTopic', '记住最近话题', '只在本机保存一句最近话题，下次打开时可以接着聊。', s.rememberTopic)}
      <div class="setting-actions">
        <button class="ghost-btn" type="button" data-panel-action="clear-companion">清空陪伴记录</button>
      </div>
    </div>
    <div class="section-label">${en ? 'Remembered things' : '记住的事'}</div>
    ${renderMemorySettings()}
    <div class="setting-actions">
      <button class="ghost-btn" type="button" data-panel-action="dialogue-eval">${en ? 'Dialogue self-check · 12 cases' : '对话自检 · 12 个场景'}</button>
    </div>
    <div class="section-label">${en ? 'DeepSeek connection' : 'DeepSeek 连接'}</div>
    <div class="llm-card">
      <div class="llm-status ${llmSaved ? 'is-ready' : ''}">${llmStatusText}</div>
      <button class="mini-btn" type="button" data-panel-action="llm-help">${en ? 'Get a DeepSeek API key' : '获取 DeepSeek API Key'}</button>
      <label class="llm-field">
        <small>${en ? 'API key' : 'API Key'}</small>
        <input id="llmKey" type="password" autocomplete="new-password" spellcheck="false" placeholder="${keyPlaceholder}">
      </label>
      <div class="llm-grid">
        <label class="llm-field">
          <small>${en ? 'Endpoint' : '接口地址'}</small>
          <input id="llmEndpoint" type="url" autocomplete="off" spellcheck="false" value="${escapeHTML(llmStatus.endpoint || 'https://api.deepseek.com')}">
        </label>
        <label class="llm-field">
          <small>${en ? 'Model' : '模型'}</small>
          <input id="llmModel" type="text" autocomplete="off" spellcheck="false" value="${escapeHTML(llmStatus.model || 'deepseek-chat')}">
        </label>
      </div>
      <label class="llm-enable">
        <input id="llmEnabled" type="checkbox" ${llmStatus.enabled ? 'checked' : ''}>
        <span>${en ? 'Use DeepSeek for chat replies' : '用 DeepSeek 生成聊天回复'}</span>
      </label>
      <div class="setting-actions">
        <button class="mini-btn" type="button" data-panel-action="llm-save">${en ? 'Save' : '保存'}</button>
        <button class="ghost-btn" type="button" data-panel-action="llm-test">${en ? 'Test connection' : '测试连接'}</button>
        <button class="ghost-btn" type="button" data-panel-action="llm-clear" ${llmSaved ? '' : 'disabled'}>${en ? 'Clear key' : '清除密钥'}</button>
      </div>
      ${llmStatus.encryptionAvailable ? '' : `<p class="llm-note">${en ? 'OS encryption is unavailable, so the key cannot be saved safely.' : '系统安全存储不可用，密钥无法安全保存。'}</p>`}
      <p class="llm-note">${en
        ? 'The key is stored encrypted by the OS and never written to logs. Only chat text and the supplied context are sent to the configured endpoint. When unavailable, the local replies are used.'
        : '密钥由系统安全存储加密，不写日志、不回显。只向配置的接口发送聊天内容和应用提供的上下文；连接失败时自动回退本地台词。'}</p>
      <p class="llm-note">${en
        ? 'This uses your own DeepSeek API account; creating a key may incur API charges.'
        : '使用你自己的 DeepSeek API 账户；调用可能产生 API 费用。'}</p>
    </div>
    <div class="section-label">桌面</div>
    <div class="setting-list">
      ${row('showClock', '常驻时钟便笺', '在左上角留一张小时钟。关闭后不再占用桌面。', s.showClock)}
      ${row('rain', '像素雨', '在她周围落下很淡的像素雨。默认关闭。', s.rain)}
      <div class="setting-row">
        <div class="setting-copy"><strong>界面语言</strong><small>切换后界面与对话会重新载入。</small></div>
        <div class="size-options" role="group" aria-label="界面语言">
          ${[['zh', '中文'], ['en', 'English']].map(([value, label]) => `
            <button class="mini-btn size-btn ${uiLang() === value ? 'is-active' : ''}"
              type="button" data-language="${value}" aria-pressed="${uiLang() === value}">${label}</button>`).join('')}
        </div>
      </div>
      <div class="setting-row">
        <div class="setting-copy"><strong>桌宠大小</strong><small>只缩放角色；面板和文字保持可读尺寸。</small></div>
        <div class="size-options" role="group" aria-label="桌宠大小">
          ${[[0.25, '1/4'], [0.5, '1/2'], [1, '原大']].map(([value, label]) => `
            <button class="mini-btn size-btn ${Math.abs(Number(s.petScale) - value) < 0.01 ? 'is-active' : ''}"
              type="button" data-pet-scale="${value}" aria-pressed="${Math.abs(Number(s.petScale) - value) < 0.01}">${label}</button>`).join('')}
        </div>
      </div>
      ${row('alwaysOnTop', '总在最前', '让维尔汀待在所有窗口之上。也可以从托盘切换。', s.alwaysOnTop)}
      ${row('compact', '迷你模式', '缩小为更轻的尺寸，适合小屏幕。', s.compact)}
      ${row('autoStart', '开机自动启动', '登录 Windows 后自动来到桌面。', s.autoStart)}
    </div>
    <div class="setting-actions">
      <button class="ghost-btn" type="button" data-onboarding-replay>${en ? 'Replay guide' : '重看桌面引导'}</button>
      <button class="ghost-btn" type="button" data-panel-action="reset-position">回到右下角</button>
      <button class="ghost-btn" type="button" data-panel-action="hide">藏进雨里</button>
      <button class="danger-btn" type="button" data-panel-action="quit">退出桌宠</button>
    </div>
    <p class="setting-note">空白区域的鼠标会穿透到桌面；当光标移回维尔汀或界面时，互动会自动恢复。若窗口藏起来了，按 <b>Ctrl + Shift + V</b> 召回，或从系统托盘里找她。</p>
    <div class="section-label">用法</div>
    <div class="shortcut-list">
      <kbd>拖动</kbd><span>移动桌面位置（自动记住）</span>
      <kbd>左键</kbd><span>点帽子、摸头或闲聊；双击抬帽</span>
      <kbd>右键 / 右下角</kbd><span>打开功能工具条</span>
      <kbd>C / F / G</kbd><span>对话 / 专注 / 拾雨</span>
      <kbd>R</kbd><span>旧日记录</span>
      <kbd>Esc</kbd><span>关闭面板、工具条或对话</span>
    </div>
    <div class="section-label">关于</div>
    <div class="about-box" id="aboutBox">
      <strong>维尔汀 · 雨夜书桌</strong>　v${escapeHTML(runtime.version || '1.1.0')}<br>
      一个以《重返未来：1999》角色维尔汀为灵感的同人像素桌宠。角色设定与形象版权归 Bluepoch 所有；本作品为非商业同人，不含游戏内素材。像素造型、界面、雨声和音效均在本地运行。
      <span class="fan-note">“时间很长。你可以慢慢来。”</span>
    </div>
    <div class="panel-footer">记录留在这台电脑上。</div>`;
}

function renderPanel(name) {
  if (!name) return;
  if (name === 'focus') els.panel.innerHTML = renderFocusPanel();
  else if (name === 'wardrobe') els.panel.innerHTML = renderWardrobePanel();
  else if (name === 'profile') els.panel.innerHTML = renderProfilePanel();
  else if (name === 'memories') els.panel.innerHTML = renderMemoriesPanel();
  else if (name === 'archive') els.panel.innerHTML = renderArchivePanel();
  else if (name === 'dossier') els.panel.innerHTML = renderDossierPanel();
  else if (name === 'photos') els.panel.innerHTML = renderPhotosPanel();
  else if (name === 'guests') els.panel.innerHTML = renderGuestsPanel();
  else if (name === 'musicbox') {
    prepareMusicTrack();
    els.panel.innerHTML = renderMusicBoxPanel();
    setTimeout(updateMusicProgress, 60);
  }
  else if (name === 'checkin') els.panel.innerHTML = renderCheckinPanel();
  else if (name === 'settings') els.panel.innerHTML = renderSettingsPanel();
  else if (name === 'dialogue-eval') els.panel.innerHTML = renderDialogueEvalPanel();
  hydrateIcons(els.panel);
  if (name === 'focus') updateFocusPanelLive();
  updateCheckinBadge();
}

function openPanel(name, { about = false, fromHistory = false } = {}) {
  if (game.active) finishGame({ quiet: true });
  hideSummonStage();
  if (panelName && panelName !== name && !fromHistory) {
    panelHistory.push(rememberPanelState());
  }
  scene?.cancelAction();
  setToolsOpen(false);
  els.gameResult.hidden = true;
  hideBubble(true);
  closeComposer(false);
  panelName = name;
  if (name === 'wardrobe') {
    wardrobeTryOn = { ...DEFAULT_WARDROBE, ...(state.wardrobe || {}) };
  }
  if (name === 'dossier' && dossierSelection) {
    const read = Array.isArray(state.stats.dossiersRead) ? state.stats.dossiersRead : [];
    if (!read.includes(dossierSelection)) {
      state.stats.dossiersRead = [...read, dossierSelection];
      saveSoon();
    }
  }
  document.body.classList.add('has-panel');
  els.panelLayer.hidden = false;
  renderPanel(name);
  updateDockActive();
  syncHitRegions();
  if (about) {
    setTimeout(() => {
      els.panel.scrollTo({ top: els.panel.scrollHeight, behavior: 'smooth' });
    }, 220);
  }
  if (!portraitPreview) bridge.ensureVisible?.();
  audio.tick();
  saveSoon();
}

function closePanel(quiet = false) {
  if (!panelName) return;
  panelName = null;
  panelHistory = [];
  wardrobeTryOn = null;
  memoryEditingId = null;
  document.body.classList.remove('has-panel');
  els.panelLayer.hidden = true;
  els.panel.innerHTML = '';
  updateDockActive();
  syncHitRegions();
  if (!quiet) audio.tick();
  setTimeout(() => recalcMousePassthrough(), 30);
  setTimeout(flushCompanionMoment, 450);
}

function checkinDayIndex(day) {
  const parts = String(day || '').split('-').map(Number);
  if (parts.length !== 3 || parts.some((part) => !Number.isFinite(part))) return null;
  return Math.floor(Date.UTC(parts[0], parts[1] - 1, parts[2]) / DAY_MS);
}

function checkinRewardFor(streak) {
  const safeStreak = Math.max(1, Math.floor(Number(streak) || 1));
  const cycleDay = ((safeStreak - 1) % 7) + 1;
  return {
    xp: 15 + Math.min(15, (cycleDay - 1) * 3),
    droplets: 3 + Math.min(3, Math.floor((cycleDay - 1) / 2)),
    streak: safeStreak,
    cycleDay,
  };
}

function checkinStatus() {
  const today = toDayKey();
  const last = state.checkin.lastClaimDay || '';
  const claimed = last === today;
  const lastIndex = checkinDayIndex(last);
  const todayIndex = checkinDayIndex(today);
  const continued = Boolean(last) && lastIndex !== null && todayIndex !== null && todayIndex - lastIndex === 1;
  const nextStreak = continued ? (state.checkin.streak || 0) + 1 : 1;
  const activeStreak = claimed ? Math.max(1, state.checkin.streak || 1) : (continued ? (state.checkin.streak || 0) : 0);
  const displayStreak = claimed ? Math.max(1, state.checkin.streak || 1) : nextStreak;
  return {
    today,
    claimed,
    streak: claimed ? state.checkin.streak || 1 : nextStreak,
    activeStreak,
    nextStreak,
    displayStreak,
    reward: claimed ? (state.checkin.lastReward || checkinRewardFor(displayStreak)) : checkinRewardFor(nextStreak),
  };
}

function updateCheckinBadge() {
  const status = checkinStatus();
  const claimable = !status.claimed;
  document.querySelectorAll('.checkin-dot').forEach((dot) => {
    dot.hidden = !claimable;
  });
  els.menuToggle?.classList.toggle('has-checkin', claimable);
  const profileButton = els.panel?.querySelector('[data-panel-action="checkin"]');
  if (profileButton) profileButton.classList.toggle('has-checkin', claimable);
}

function claimDailyCheckin() {
  const status = checkinStatus();
  if (status.claimed) {
    toast(isEN() ? 'Already checked in today.' : '今天已经签到过了。', 'info', 2200);
    return;
  }
  const reward = checkinRewardFor(status.nextStreak);
  const beforeLevel = levelInfo(state.stats.affection).level;
  const previousMilestones = Array.isArray(state.checkin.milestones) ? state.checkin.milestones : [];
  const newlyReached = [7, 14, 28].filter((target) => (
    reward.streak >= target
    && !previousMilestones.some((entry) => Number(entry.streak) === target)
  ));
  const milestones = [
    ...previousMilestones,
    ...newlyReached.map((target) => ({ streak: target, day: status.today, at: Date.now() })),
  ].sort((a, b) => Number(a.streak) - Number(b.streak));
  state.checkin = {
    lastClaimDay: status.today,
    streak: reward.streak,
    total: (state.checkin.total || 0) + 1,
    lastReward: reward,
    history: [
      { day: status.today, at: Date.now(), ...reward },
      ...(Array.isArray(state.checkin.history) ? state.checkin.history : []),
    ].slice(0, 30),
    milestones,
  };
  addAffection(reward.xp);
  state.stats.droplets = (state.stats.droplets || 0) + reward.droplets;
  checkUnlocks(true);
  recordCompanionEvent('checkin', { streak: reward.streak });
  queueCompanionMoment('checkin', { streak: reward.streak });
  scene?.spawnHearts(7);
  audio.chime('celebrate');
  const afterLevel = levelInfo(state.stats.affection).level;
  toast(isEN()
    ? `Check-in day ${reward.streak}: +${reward.xp} affection, +${reward.droplets} Time Rain.${afterLevel > beforeLevel ? ' Level up.' : ''}`
    : `签到第 ${reward.streak} 天：亲密度 +${reward.xp}，时之雨 +${reward.droplets}。${afterLevel > beforeLevel ? '等级提升了。' : ''}`, 'gold', 4200);
  saveNow();
  updateCheckinBadge();
  if (newlyReached.length) {
    toast(isEN()
      ? `Milestone card earned · day ${newlyReached[newlyReached.length - 1]}`
      : `获得纪念卡 · 连续第 ${newlyReached[newlyReached.length - 1]} 天`, 'gold', 3600);
  }
  if (panelName === 'checkin') renderPanel('checkin');
}

function checkinHistorySeries() {
  const done = new Set((Array.isArray(state.checkin.history) ? state.checkin.history : [])
    .map((entry) => entry?.day)
    .filter(Boolean));
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));
    const day = toDayKey(date);
    const label = isEN()
      ? date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })
      : `${date.getMonth() + 1}/${date.getDate()}`;
    return { day, label, done: done.has(day), today: index === 6 };
  });
}

function renderCheckinMilestones() {
  const milestones = Array.isArray(state.checkin.milestones) ? state.checkin.milestones : [];
  return `<div class="checkin-milestones">
    ${[7, 14, 28].map((target) => {
      const earned = milestones.find((entry) => Number(entry.streak) === target);
      return `<div class="checkin-milestone ${earned ? 'is-earned' : ''}">
        <span class="checkin-milestone-no">${String(target).padStart(2, '0')}</span>
        <strong>${earned ? (isEN() ? 'Kept' : '已收下') : (isEN() ? 'Not yet' : '待抵达')}</strong>
        <small>${earned
          ? escapeHTML(earned.day || '')
          : (isEN() ? `${target}-day streak` : `连续 ${target} 天`)}</small>
      </div>`;
    }).join('')}
  </div>`;
}

function renderCheckinPanel() {
  const status = checkinStatus();
  const streak = status.activeStreak;
  const cycle = ((Math.max(1, status.displayStreak) - 1) % 7) + 1;
  const reward = status.reward;
  return `
    ${panelHead(isEN() ? 'Daily check-in' : '每日签到', isEN() ? 'A page for today' : '今天的签页', '◇')}
    <div class="checkin-top">
      <div><span>${isEN() ? 'Streak' : '连续'}</span><strong>${streak}<small>${isEN() ? ' days' : ' 天'}</small></strong></div>
      <div><span>${isEN() ? 'Total' : '累计'}</span><strong>${state.checkin.total || 0}<small>${isEN() ? ' check-ins' : ' 次'}</small></strong></div>
      <div><span>${isEN() ? 'Today' : '今天'}</span><strong>${status.claimed ? (isEN() ? 'Signed' : '已签') : (isEN() ? 'Open' : '可签')}</strong></div>
    </div>
    <div class="checkin-cycle-note">${isEN()
      ? `7-day cycle · this cycle ${cycle} / 7 · total ${streak} days`
      : `七天一轮 · 本周目 ${cycle} / 7 · 累计连续 ${streak} 天`}</div>
    <div class="checkin-history">
      ${checkinHistorySeries().map((day) => `<div class="checkin-history-day ${day.done ? 'is-done' : ''} ${day.today ? 'is-today' : ''}">
        <span>${day.label}</span>
        <i></i>
        <small>${day.done ? (isEN() ? 'signed' : '已签') : (isEN() ? '—' : '—')}</small>
      </div>`).join('')}
    </div>
    <div class="checkin-week">
      ${Array.from({ length: 7 }, (_, index) => {
        const day = index + 1;
        const done = day < cycle || (status.claimed && day === cycle);
        const current = day === cycle && !status.claimed;
        return `<div class="checkin-day ${done ? 'is-done' : ''} ${current ? 'is-current' : ''}">
          <span>${isEN() ? `Day ${day}` : `第 ${day} 天`}</span>
          <strong>+${checkinRewardFor(day).xp}</strong>
          <small>${isEN() ? 'affection' : '亲密度'}</small>
        </div>`;
      }).join('')}
    </div>
    <div class="checkin-reward">
      <div>
        <span class="eyebrow">${status.claimed ? (isEN() ? 'TODAY KEPT' : '今天已收下') : (isEN() ? 'TODAY’S PAGE' : '今天的签页')}</span>
        <strong>${isEN() ? `+${reward.xp} affection · +${reward.droplets} Time Rain` : `亲密度 +${reward.xp} · 时之雨 +${reward.droplets}`}</strong>
        <p>${isEN() ? 'Rewards loop every 7 days. Missing a day starts a new continuous streak.' : '奖励每 7 天循环一次；断签会从新的连续天数开始。'}</p>
      </div>
      <button class="primary-btn" type="button" data-panel-action="checkin-claim" ${status.claimed ? 'disabled' : ''}>
        ${status.claimed ? (isEN() ? 'Already signed' : '今天已签到') : (isEN() ? 'Sign today' : '签到')}
      </button>
    </div>
    <p class="setting-note">${isEN()
      ? 'Rewards are added to your existing affection (level experience) and Time Rain. One claim per local calendar day; the reward table repeats every 7 days while the continuous-day count keeps growing.'
      : '奖励会直接加到现有亲密度（等级经验）与时之雨。每个本地自然日只能领取一次；奖励表每 7 天从头循环，连续天数继续累计。'}</p>
    <div class="section-label">${isEN() ? 'Milestone cards' : '纪念卡'}</div>
    ${renderCheckinMilestones()}
    <div class="panel-footer">${isEN() ? 'A small page for each day.' : '每天一页，慢慢变厚。'}</div>`;
}

const SUMMON_LEVEL = 5;

function summonUnlocked() {
  return levelInfo(state.stats.affection).level >= SUMMON_LEVEL;
}

function musicBoxUnlocked() {
  return levelInfo(state.stats.affection).level >= MUSICBOX_LEVEL;
}

function musicTrack() {
  return MUSIC_TRACKS.find((track) => track.id === state.musicBox.track) || MUSIC_TRACKS[0];
}

function musicTrackAt(offset) {
  const index = MUSIC_TRACKS.findIndex((track) => track.id === state.musicBox.track);
  const next = (index + offset + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
  return MUSIC_TRACKS[next];
}

function formatMusicTime(value) {
  const seconds = Math.max(0, Math.floor(Number(value) || 0));
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function musicTrackSrc(track = musicTrack()) {
  return new URL(track.file, document.baseURI).href;
}

function prepareMusicTrack(track = musicTrack()) {
  if (musicAudio.dataset.track === track.id) return;
  musicAudio.src = musicTrackSrc(track);
  musicAudio.dataset.track = track.id;
  musicAudio.load();
}

function updateMusicProgress() {
  if (panelName !== 'musicbox') return;
  const current = Number.isFinite(musicAudio.currentTime) ? musicAudio.currentTime : 0;
  const duration = Number.isFinite(musicAudio.duration) ? musicAudio.duration : 0;
  const currentEl = document.querySelector('#musicCurrent');
  const durationEl = document.querySelector('#musicDuration');
  const progressEl = document.querySelector('#musicProgress');
  if (currentEl) currentEl.textContent = formatMusicTime(current);
  if (durationEl) durationEl.textContent = formatMusicTime(duration);
  if (progressEl && duration > 0) {
    progressEl.value = String(Math.round((current / duration) * 1000));
  }
  const playButton = document.querySelector('[data-music-action="toggle"]');
  if (playButton) {
    playButton.innerHTML = `<span class="icon" data-icon="${musicPlaying ? 'pause' : 'play'}"></span>`;
    hydrateIcons(playButton);
  }
}

function updateMusicSleepLabel() {
  const el = document.querySelector('#musicSleepLabel');
  if (!el) return;
  if (!state.musicBox.sleepMinutes || !musicSleepEnds) {
    el.textContent = isEN() ? 'Sleep timer off' : '睡眠定时关闭';
    return;
  }
  const left = Math.max(0, Math.ceil((musicSleepEnds - Date.now()) / 1000));
  el.textContent = isEN() ? `Stops in ${formatMusicTime(left)}` : `${formatMusicTime(left)} 后停止`;
}

function clearMusicSleep() {
  if (musicSleepTimer) clearInterval(musicSleepTimer);
  musicSleepTimer = null;
  musicSleepEnds = 0;
  state.musicBox.sleepMinutes = 0;
  saveSoon();
}

function setMusicSleep(minutes) {
  const value = Math.max(0, Number(minutes) || 0);
  if (musicSleepTimer) clearInterval(musicSleepTimer);
  musicSleepTimer = null;
  musicSleepEnds = 0;
  state.musicBox.sleepMinutes = value;
  saveSoon();
  if (value > 0) {
    musicSleepEnds = Date.now() + value * 60000;
    musicSleepTimer = setInterval(() => {
      if (Date.now() < musicSleepEnds) {
        updateMusicSleepLabel();
        return;
      }
      pauseMusic();
      clearMusicSleep();
      toast(isEN() ? 'The music box has wound down.' : '音乐盒的发条走到头了。', 'info', 2800);
      if (panelName === 'musicbox') renderPanel('musicbox');
    }, 1000);
  }
  if (panelName === 'musicbox') renderPanel('musicbox');
}

function pauseMusic() {
  musicAudio.pause();
  musicPlaying = false;
  updateMusicProgress();
}

function playMusic() {
  if (!musicBoxUnlocked()) {
    toast(isEN() ? `The music box unlocks at Lv.${MUSICBOX_LEVEL}.` : `音乐盒会在 Lv.${MUSICBOX_LEVEL} 解锁。`, 'info', 2600);
    return;
  }
  const track = musicTrack();
  prepareMusicTrack(track);
  musicAudio.volume = state.musicBox.volume;
  musicAudio.loop = state.musicBox.loop;
  const attempt = musicAudio.play();
  if (attempt && typeof attempt.catch === 'function') {
    attempt.catch(() => {
      musicPlaying = false;
      toast(isEN() ? 'The paper roll is stuck. Check the audio file.' : '纸带卡住了。请检查音频文件。', 'info', 3200);
      updateMusicProgress();
    });
  }
}

function toggleMusic() {
  if (musicPlaying) pauseMusic();
  else playMusic();
}

function setMusicTrack(track, { autoplay = musicPlaying } = {}) {
  if (!track) return;
  state.musicBox.track = track.id;
  saveSoon();
  const wasPlaying = autoplay;
  musicAudio.pause();
  musicAudio.dataset.track = '';
  prepareMusicTrack(track);
  if (wasPlaying) playMusic();
  if (panelName === 'musicbox') {
    renderPanel('musicbox');
    setTimeout(updateMusicProgress, 50);
  }
}

function syncMusicBoxVisibility() {
  if (!els.musicBox) return;
  const unlocked = musicBoxUnlocked();
  els.musicBox.hidden = !unlocked || !scene;
  els.musicBox.setAttribute('aria-label', isEN() ? 'Open the music box' : '打开音乐盒');
  els.musicBox.dataset.tip = isEN() ? 'Music box' : '音乐盒';
  if (!unlocked) {
    if (musicPlaying) pauseMusic();
    return;
  }
  if (!scene) return;
  positionPetUi();
  syncHitRegions();
  if (!state.musicBox.announced) {
    state.musicBox.announced = true;
    saveSoon();
    toast(isEN()
      ? `Lv.${MUSICBOX_LEVEL} · The music box is now on the desk.`
      : `Lv.${MUSICBOX_LEVEL} · 音乐盒来到了桌边。`, 'gold', 5200);
  }
}

function renderMusicBoxPanel() {
  const en = isEN();
  const track = musicTrack();
  const unlocked = musicBoxUnlocked();
  if (!unlocked) {
    return `${panelHead(en ? 'Music box' : '音乐盒', en ? 'A small winding box' : '箱边的小发条盒', '♪')}
      <div class="empty-state guest-locked">
        <strong>${en ? `Unlocks at Lv.${MUSICBOX_LEVEL}` : `Lv.${MUSICBOX_LEVEL} 解锁`}</strong>
        <p>${en ? 'The music box is waiting inside the suitcase.' : '音乐盒还在箱子里等发条。'}</p>
      </div>`;
  }
  return `${panelHead(en ? 'Music box' : '音乐盒', en ? 'Wind it up, softly' : '给旧发条上一点力', '♪')}
    <div class="music-panel">
      <div class="music-cover-wrap">
        <img class="music-cover" src="../assets/music-box/cover.png" alt="${en ? 'Music box cover' : '音乐盒封面'}">
        <span class="music-cover-tag">SIDE A · 1999</span>
      </div>
      <div class="music-now">
        <span class="note-label">${en ? 'NOW WINDING' : '正在转动'}</span>
        <strong>${escapeHTML(track.title[en ? 'en' : 'zh'])}</strong>
        <small>${escapeHTML(track.subtitle[en ? 'en' : 'zh'])}</small>
      </div>
      <div class="music-controls">
        <button class="music-icon-btn" type="button" data-music-action="prev" aria-label="${en ? 'Previous' : '上一首'}"><span class="icon" data-icon="play"></span></button>
        <button class="music-play-btn" type="button" data-music-action="toggle" aria-label="${musicPlaying ? (en ? 'Pause' : '暂停') : (en ? 'Play' : '播放')}"><span class="icon" data-icon="${musicPlaying ? 'pause' : 'play'}"></span></button>
        <button class="music-icon-btn" type="button" data-music-action="next" aria-label="${en ? 'Next' : '下一首'}"><span class="icon" data-icon="play"></span></button>
      </div>
      <div class="music-progress-row">
        <span id="musicCurrent">00:00</span>
        <input id="musicProgress" class="music-progress" type="range" min="0" max="1000" value="0" aria-label="${en ? 'Track position' : '播放进度'}">
        <span id="musicDuration">00:00</span>
      </div>
      <div class="music-tracks">
        ${MUSIC_TRACKS.map((item, index) => `<button class="music-track ${item.id === track.id ? 'is-active' : ''}" type="button" data-music-track="${item.id}">
          <span class="music-track-no">0${index + 1}</span>
          <span class="music-track-copy"><strong>${escapeHTML(item.title[en ? 'en' : 'zh'])}</strong><small>${escapeHTML(item.subtitle[en ? 'en' : 'zh'])}</small></span>
          ${item.id === track.id ? '<span class="music-track-mark">◆</span>' : ''}
        </button>`).join('')}
      </div>
      <div class="music-volume-row">
        <span>${en ? 'Volume' : '音量'}</span>
        <input id="musicVolume" type="range" min="0" max="100" value="${Math.round(state.musicBox.volume * 100)}" aria-label="${en ? 'Music volume' : '音乐音量'}">
      </div>
      <div class="music-options">
        <button class="ghost-btn ${state.musicBox.loop ? 'is-on' : ''}" type="button" data-music-action="loop">${en ? 'Loop' : '循环'} · ${state.musicBox.loop ? 'ON' : 'OFF'}</button>
        <span id="musicSleepLabel" class="music-sleep-label">${en ? 'Sleep timer off' : '睡眠定时关闭'}</span>
      </div>
      <div class="music-sleep-row">
        ${[0, 15, 30, 60].map((minutes) => `<button class="ghost-btn ${state.musicBox.sleepMinutes === minutes ? 'is-on' : ''}" type="button" data-music-sleep="${minutes}">${minutes ? `${minutes}m` : (en ? 'Off' : '关闭')}</button>`).join('')}
      </div>
      <p class="music-credit">${MUSIC_CREDIT}</p>
      <p class="music-note">${en ? 'The paper roll is a short loop. Close this panel and it keeps playing.' : '纸带是短循环。收起面板后，音乐仍会继续。'}</p>
    </div>
    <div class="setting-actions">
      <button class="ghost-btn" type="button" data-panel-action="profile">${en ? 'Back to profile' : '返回角色资料'}</button>
    </div>`;
}

function guestName(guest) {
  return guest?.name?.[isEN() ? 'en' : 'zh'] || '';
}

function guestTitle(guest) {
  return guest?.title?.[isEN() ? 'en' : 'zh'] || '';
}

function guestLine(guest) {
  return guest?.line?.[isEN() ? 'en' : 'zh'] || '';
}

function syncSummonVisibility() {
  if (!els.suitcase) return;
  const unlocked = summonUnlocked();
  els.suitcase.hidden = !unlocked || !scene;
  els.suitcase.setAttribute('aria-label', isEN()
    ? 'Open the suitcase and meet a guest'
    : '打开手提箱，召见一位来客');
  els.suitcase.dataset.tip = isEN() ? 'Suitcase · Call a guest' : '手提箱 · 召见来客';
  if (!unlocked) {
    hideSummonStage();
    return;
  }
  if (!scene) return;
  positionPetUi();
  syncHitRegions();
  if (!state.summon.announced) {
    state.summon.announced = true;
    saveSoon();
    toast(isEN()
      ? `Lv.${SUMMON_LEVEL} · New prop: the suitcase. Open it to meet a guest.`
      : `Lv.${SUMMON_LEVEL} · 新道具：手提箱。打开它，见一位来客。`, 'gold', 5200);
  }
}

let lastGuestReaction = '';

function spawnGuestSparkles() {
  if (!els.guestSparkles) return;
  els.guestSparkles.innerHTML = '';
  const count = 7;
  for (let i = 0; i < count; i += 1) {
    const sparkle = document.createElement('i');
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.45;
    const distance = 42 + Math.random() * 46;
    sparkle.style.setProperty('--sx', `${Math.cos(angle) * distance}px`);
    sparkle.style.setProperty('--sy', `${Math.sin(angle) * distance - 28}px`);
    sparkle.style.setProperty('--delay', `${Math.random() * 80}ms`);
    sparkle.style.setProperty('--size', `${2 + Math.floor(Math.random() * 3)}px`);
    els.guestSparkles.appendChild(sparkle);
  }
  setTimeout(() => {
    if (els.guestSparkles) els.guestSparkles.innerHTML = '';
  }, 900);
}

function guestReaction() {
  if (!els.summonStage || els.summonStage.hidden) return;
  const guest = guestById(els.summonStage.dataset.guest);
  if (!guest) return;
  const reactions = (guest.reactions || []).map((reaction) => reaction[isEN() ? 'en' : 'zh']).filter(Boolean);
  if (reactions.length) {
    let next = reactions[Math.floor(Math.random() * reactions.length)];
    if (next === lastGuestReaction && reactions.length > 1) {
      next = reactions.find((line) => line !== next) || next;
    }
    lastGuestReaction = next;
    els.summonLine.textContent = next;
  }
  els.summonFigure?.classList.remove('is-reacting');
  if (els.summonFigure) {
    void els.summonFigure.offsetWidth;
    els.summonFigure.classList.add('is-reacting');
    setTimeout(() => els.summonFigure?.classList.remove('is-reacting'), 720);
  }
  spawnGuestSparkles();
  audio.tick();
}

function showSummonStage(guest, { first = false } = {}) {
  if (!guest || !els.summonStage) return;
  els.summonImage.src = guest.image;
  els.summonImage.alt = guestName(guest);
  els.summonName.textContent = guestName(guest);
  els.summonTitle.textContent = guestTitle(guest);
  els.summonLine.textContent = guestLine(guest);
  els.summonEyebrow.textContent = first ? (isEN() ? 'FIRST VISITOR' : '初次来客') : (isEN() ? 'FROM THE CASE' : '箱中来客');
  els.summonDossier.hidden = !guest.dossierId;
  els.summonDossier.textContent = isEN() ? 'View dossier' : '查看人物档案';
  els.summonAgain.textContent = isEN() ? 'Call another' : '再召见一位';
  els.summonDismiss.textContent = isEN() ? 'Dismiss' : '收回';
  els.summonClose.setAttribute('aria-label', isEN() ? 'Dismiss guest' : '收回来客');
  lastGuestReaction = '';
  if (els.summonParallax) els.summonParallax.style.transform = '';
  els.summonStage.hidden = false;
  els.summonStage.dataset.guest = guest.id;
  els.summonStage.classList.remove('is-entering');
  void els.summonStage.offsetWidth;
  els.summonStage.classList.add('is-entering');
  setTimeout(() => els.summonStage?.classList.remove('is-entering'), 820);
  document.body.classList.add('has-summon');
  syncHitRegions();
  bridge.ensureVisible?.();
}

function hideSummonStage() {
  if (!els.summonStage || els.summonStage.hidden) return;
  els.summonStage.hidden = true;
  els.summonStage.dataset.guest = '';
  els.summonStage.classList.remove('is-entering');
  if (els.summonParallax) els.summonParallax.style.transform = '';
  if (els.guestSparkles) els.guestSparkles.innerHTML = '';
  document.body.classList.remove('has-summon');
  syncHitRegions();
  setTimeout(flushCompanionMoment, 500);
}

function summonGuest() {
  if (!summonUnlocked()) {
    toast(isEN() ? `The suitcase unlocks at Lv.${SUMMON_LEVEL}.` : `手提箱会在 Lv.${SUMMON_LEVEL} 解锁。`, 'info', 2800);
    return;
  }
  if (Date.now() - (state.summon.lastAt || 0) < 1200) return;
  const recent = state.summon.lastIds.slice(0, 2);
  let pool = GUEST_CHARACTERS.filter((guest) => !recent.includes(guest.id));
  if (!pool.length) pool = GUEST_CHARACTERS;
  const guest = pool[Math.floor(Math.random() * pool.length)];
  const first = !state.summon.seen.includes(guest.id);
  state.summon.lastAt = Date.now();
  state.summon.total = (state.summon.total || 0) + 1;
  state.summon.seen = first ? [...state.summon.seen, guest.id] : state.summon.seen;
  state.summon.counts[guest.id] = (state.summon.counts[guest.id] || 0) + 1;
  state.summon.lastIds = [guest.id, ...state.summon.lastIds.filter((id) => id !== guest.id)].slice(0, 6);
  if (first) addAffection(2);
  else addAffection(1);
  saveNow();
  recordCompanionEvent('guest', { name: guestName(guest), id: guest.id });
  queueCompanionMoment('guest', { name: guestName(guest), id: guest.id });
  showSummonStage(guest, { first });
  toast(first
    ? (isEN() ? `${guestName(guest)} has come to the desk. +2 affection.` : `${guestName(guest)}来到了桌边。亲密度 +2。`)
    : (isEN() ? `${guestName(guest)} is back. +1 affection.` : `${guestName(guest)}又来了。亲密度 +1。`), 'success', 2600);
}

function viewSummonGuest(id) {
  const guest = guestById(id);
  if (!guest || !state.summon.seen.includes(id)) return;
  closePanel(true);
  showSummonStage(guest);
}

function renderGuestsPanel() {
  const unlocked = summonUnlocked();
  const seenCount = state.summon.seen.length;
  return `
    ${panelHead(isEN() ? 'Guests from the case' : '箱中来客', isEN() ? 'Those who came out' : '从箱子里出来的人', '◇')}
    ${!unlocked ? `<div class="empty-state guest-locked">
      <strong>${isEN() ? `Unlocks at Lv.${SUMMON_LEVEL}` : `Lv.${SUMMON_LEVEL} 解锁`}</strong>
      <p>${isEN() ? 'The suitcase is a key prop, not a wardrobe item. It will wait by the desk.' : '手提箱是关键道具，不占衣橱。到了等级，它会出现在桌边。'}</p>
    </div>` : `
      <p class="setting-note">${isEN()
        ? `Opened ${state.summon.total || 0} times · ${seenCount} / ${GUEST_CHARACTERS.length} guests met. Click the suitcase on the desk.`
        : `已打开 ${state.summon.total || 0} 次 · 已见 ${seenCount} / ${GUEST_CHARACTERS.length} 位来客。点桌面上的手提箱召见。`}</p>
      <div class="guest-grid">
        ${GUEST_CHARACTERS.map((guest) => {
          const seen = state.summon.seen.includes(guest.id);
          const count = state.summon.counts[guest.id] || 0;
          return `<button class="guest-card ${seen ? 'is-seen' : 'is-unseen'}" type="button" data-guest-view="${seen ? guest.id : ''}" ${seen ? '' : 'disabled'}>
            <span class="guest-portrait"><img src="${escapeHTML(guest.image)}" alt="${seen ? escapeHTML(guestName(guest)) : ''}" class="${seen ? '' : 'is-locked'}"></span>
            <span class="guest-copy">
              <strong>${seen ? escapeHTML(guestName(guest)) : '？？？'}</strong>
              <small>${seen ? `${escapeHTML(guestTitle(guest))} · ${count} ${isEN() ? 'visits' : '次'}` : (isEN() ? 'Not met yet' : '尚未遇见')}</small>
            </span>
          </button>`;
        }).join('')}
      </div>`}
    <div class="setting-actions">
      <button class="ghost-btn" type="button" data-panel-action="profile">${isEN() ? 'Back to profile' : '返回角色资料'}</button>
    </div>
    <div class="panel-footer">${isEN() ? 'The case remembers who stepped out.' : '箱子记得谁曾经出来。'}</div>`;
}

function clearCompanionMemory() {
  state.companion.lastTopic = null;
  state.companion.lastTopicPromptAt = 0;
  state.companion.topics = [];
  state.companion.pendingFocus = null;
  state.companion.recentEvents = [];
  state.companion.summaries = [];
  state.companion.chatTurns = 0;
  state.companion.lastProactiveAt = 0;
  state.companion.proactiveCount = 0;
  saveNow();
  toast(isEN() ? 'Companion notes cleared.' : '陪伴记录已清空。', 'info', 2800);
  renderPanel('settings');
}

function toggleSetting(key) {
  const s = state.settings;
  const next = !s[key];
  if (key === 'rememberTopic') {
    s.rememberTopic = next;
    if (!next) {
      state.companion.lastTopic = null;
      state.companion.lastTopicPromptAt = 0;
      state.companion.topics = [];
    }
    renderPanel('settings');
    saveSoon();
  } else if (key === 'sound') {
    s.sound = next;
    audio.setEnabled(next);
    if (next) audio.unlock().then(() => { audio.setEnabled(true); audio.chime('tap'); });
    renderPanel('settings');
  } else if (key === 'voice') {
    s.voice = next;
    audio.setVoice(next);
    if (next) audio.speak('我在。');
    renderPanel('settings');
  } else if (key === 'rain') {
    s.rain = next;
    scene?.setRain(next);
    renderPanel('settings');
  } else if (key === 'showClock') {
    setClockVisible(next);
    renderPanel('settings');
  } else if (key === 'alwaysOnTop') {
    s.alwaysOnTop = next;
    bridge.setAlwaysOnTop(next).then((value) => {
      s.alwaysOnTop = Boolean(value);
      saveSoon();
      renderPanel('settings');
    });
    audio.tick();
  } else if (key === 'compact') {
    s.compact = next;
    bridge.setCompact(next).then(() => {
      document.body.classList.toggle('compact', next);
      setTimeout(() => {
        scene?.resize();
        syncPetHitbox();
        syncHitRegions();
        positionBubble();
      }, 80);
      renderPanel('settings');
    });
    audio.tick();
  } else if (key === 'autoStart') {
    s.autoStart = next;
    bridge.setAutoStart(next).then((value) => {
      s.autoStart = Boolean(value);
      toast(next && value ? '已加入开机启动。' : next ? '暂时无法修改开机启动。' : '已关闭开机启动。', next && value ? 'success' : 'info', 3200);
      renderPanel('settings');
      saveSoon();
    });
    audio.tick();
  }
  saveSoon();
}

function wardrobeSetItem(eq, item) {
  if (!eq || !item) return eq;
  if (item.slot === 'outfit') {
    eq.outfit = item.id;
    eq.hat = 'hat';
    eq.coat = null;
    eq.neck = null;
  } else {
    if (['hat', 'coat', 'neck'].includes(item.slot)) eq.outfit = null;
    eq[item.slot] = item.id;
  }
  return eq;
}

function wardrobeTryOnItem(id) {
  const item = wardrobeItemById(id);
  if (!item || !wardrobeProgress(item).unlocked) return;
  wardrobeTryOn = { ...DEFAULT_WARDROBE, ...(wardrobeTryOn || state.wardrobe) };
  wardrobeSetItem(wardrobeTryOn, item);
  wardrobeSelected = id;
  renderPanel('wardrobe');
}

function wardrobeRemoveSlot(slot) {
  const item = wardrobeItemById(wardrobeSelected);
  wardrobeTryOn = { ...DEFAULT_WARDROBE, ...(wardrobeTryOn || state.wardrobe) };
  if (slot === 'hat') wardrobeTryOn.hat = 'hat';
  else if (slot === 'outfit') wardrobeTryOn.outfit = null;
  else wardrobeTryOn[slot] = null;
  if (item && item.slot === 'outfit') wardrobeTryOn.outfit = null;
  renderPanel('wardrobe');
}

function wardrobeApplyTryOn() {
  if (!wardrobeTryOn) return;
  state.wardrobe = { ...DEFAULT_WARDROBE, ...wardrobeTryOn };
  scene?.setWardrobe(state.wardrobe);
  saveNow();
  wardrobeTryOn = { ...state.wardrobe };
  toast(isEN() ? 'Outfit updated.' : '造型已换上。', 'success', 2400);
  renderPanel('wardrobe');
}

function wardrobeResetTryOn() {
  wardrobeTryOn = { ...DEFAULT_WARDROBE, ...(state.wardrobe || {}) };
  renderPanel('wardrobe');
}

function useWardrobePreset(index) {
  const slot = Number(index);
  if (!Number.isInteger(slot) || slot < 0 || slot > 2) return;
  const preset = normalizeWardrobeLook(state.wardrobePresets?.[slot]);
  if (!preset) {
    const current = wardrobeLookSnapshot(wardrobeTryOn || state.wardrobe);
    state.wardrobePresets = [0, 1, 2].map((i) => (i === slot
      ? current
      : normalizeWardrobeLook(state.wardrobePresets?.[i])));
    saveNow();
    toast(isEN() ? `Saved current look to slot ${slot + 1}.` : `当前造型已保存到造型 ${slot + 1}。`, 'success', 2600);
    renderPanel('wardrobe');
    return;
  }
  wardrobeTryOn = { ...DEFAULT_WARDROBE, ...preset };
  wardrobeSelected = [preset.outfit, preset.held, preset.hat, preset.coat, preset.neck, preset.face, preset.case]
    .find((id) => id && wardrobeItemById(id)) || wardrobeSelected;
  renderPanel('wardrobe');
  toast(isEN() ? `Trying saved look ${slot + 1}.` : `正在试穿造型 ${slot + 1}。`, 'info', 2200);
}

function clearWardrobePreset(index) {
  const slot = Number(index);
  if (!Number.isInteger(slot) || slot < 0 || slot > 2) return;
  state.wardrobePresets = [0, 1, 2].map((i) => (i === slot
    ? null
    : normalizeWardrobeLook(state.wardrobePresets?.[i])));
  saveNow();
  renderPanel('wardrobe');
}

function capturePhoto() {
  const at = Date.now();
  const photo = {
    id: `photo-${at}-${Math.random().toString(36).slice(2, 6)}`,
    at,
    title: levelInfo(state.stats.affection).title,
    look: wardrobeLookSnapshot(state.wardrobe),
  };
  state.photos = [photo, ...(Array.isArray(state.photos) ? state.photos : [])].slice(0, 12);
  state.companion.lastPhoto = photo;
  saveNow();
  return photo;
}

function photoDate(photo) {
  return new Date(photo.at).toLocaleDateString(isEN() ? 'en-US' : 'zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function renderPhotosPanel() {
  const photos = Array.isArray(state.photos) ? state.photos : [];
  return `
    ${panelHead(isEN() ? 'Photo album' : '照片册', isEN() ? 'Kept by the case' : '箱侧留影', '◇')}
    <p class="setting-note">${isEN()
      ? 'Each camera shot leaves one small record: the date, the look, and the title she held at that moment. Only metadata and the pixel look are kept locally.'
      : '相机每拍一次，会留下一条小记录：日期、当时的造型和头衔。只在本机保存元数据与像素造型。'}</p>
    ${photos.length ? `<div class="photo-grid">
      ${photos.map((photo) => `
        <article class="photo-card">
          <div class="photo-frame">${wardrobePreviewStack(photo.look || state.wardrobe)}</div>
          <div class="photo-copy">
            <strong>${escapeHTML(photoDate(photo))}</strong>
            <small>${escapeHTML(photo.title || (isEN() ? 'Field note' : '外勤记录'))}</small>
            <span>${escapeHTML(wardrobeLookName(photo.look || state.wardrobe))}</span>
          </div>
          <button class="photo-delete" type="button" data-photo-delete="${photo.id}" aria-label="${isEN() ? 'Delete photo' : '删除照片'}">×</button>
        </article>`).join('')}
    </div>` : `<div class="empty-state photo-empty">
      <strong>${isEN() ? 'No photographs yet.' : '还没有照片。'}</strong>
      <p>${isEN() ? 'Put on the field camera and press “Take a photo”.' : '戴上外勤相机，按「试拍」留一张。'}</p>
    </div>`}
    <div class="setting-actions">
      <button class="ghost-btn" type="button" data-panel-action="profile">${isEN() ? 'Back to profile' : '返回角色资料'}</button>
      ${photos.length ? `<button class="ghost-btn" type="button" data-panel-action="clear-photos">${isEN() ? 'Clear album' : '清空照片册'}</button>` : ''}
    </div>
    <div class="panel-footer">${isEN() ? 'The print ages; the moment stays.' : '照片会旧，留影不会。'}</div>`;
}

function wardrobeItemAction(id) {
  const item = wardrobeItemById(id);
  if (!item?.action || !wardrobeProgress(item).unlocked) return;
  const type = item.action.type;
  const wasWearing = wardrobeEquipped(state.wardrobe, item);
  if (!wasWearing) {
    wardrobeTryOn = { ...DEFAULT_WARDROBE, ...(wardrobeTryOn || state.wardrobe) };
    wardrobeSetItem(wardrobeTryOn, item);
    state.wardrobe = { ...DEFAULT_WARDROBE, ...wardrobeTryOn };
    scene?.setWardrobe(state.wardrobe);
    saveNow();
  }
  if (type === 'records') {
    scene?.readRecords();
    closePanel(true);
    setTimeout(() => openPanel('memories'), 260);
    return;
  }
  if (type === 'photo') {
    closePanel(true);
    openPanel('photos');
    return;
  }
  closePanel(true);
  if (type === 'camera') {
    scene?.takePhoto();
    capturePhoto();
    recordCompanionEvent('photo', { subject: 'field' });
    toast(isEN()
      ? 'The shutter closes. The photograph is kept by the case; open Photo album to look through it.'
      : '快门合上。照片已经收进箱侧，可以在照片册里翻阅。', 'success', 3200);
  } else if (type === 'tea') {
    scene?.serveTea();
    say(isEN() ? 'The cup is warm. Stay a moment.' : '杯子是热的。坐一会儿吧。', { duration: 6200 });
  } else if (type === 'watch') {
    scene?.checkWatch();
    say(isEN() ? 'The lid opens. Time to begin.' : '表盖打开了。可以开始了。', { duration: 5600 });
    setTimeout(() => openPanel('focus'), 650);
  } else if (type === 'lantern') {
    scene?.liftLantern();
    say(isEN() ? 'Two or three steps ahead is enough.' : '前面两三步能看清，就够了。', { duration: 5600 });
  }
}

function toggleAccessory(id) {
  const item = ACCESSORIES.find((entry) => entry.id === id);
  if (!item) return;
  if (!itemUnlocked(item)) {
    toast(`还差 ${Math.max(0, item.unlock - state.stats.droplets)} 枚时之雨。去拾雨吧。`, 'info', 3200);
    return;
  }
  if (id === 'hat') {
    // The hat is part of the pixel silhouette; the wardrobe action becomes a
    // small hat-tip interaction instead of removing it.
    state.accessories.hat = true;
    closePanel(true);
    scene?.tipHat();
    audio.chime('hat');
    say(pickLine('patHat'), { duration: 4800, hint: '礼帽 · 帽檐朝西' });
    toast('旧礼帽 · 帽檐整理好了', 'info', 2100);
    saveNow();
    return;
  }
  const next = !state.accessories[id];
  state.accessories[id] = next;
  scene?.setAccessory(id, next);
  audio.tick();
  toast(`${accessoryName(item, uiLang())}${next ? ' · 已佩戴' : ' · 已取下'}`, 'info', 2100);
  renderPanel('wardrobe');
  saveNow();
}

/* -------------------------------------------------------------------------- */
/* Context menu                                                               */
/* -------------------------------------------------------------------------- */

function menuGroups() {
  return [
    {
      label: '互动 / 查看',
      items: [
        { action: 'pat', label: '摸摸头', icon: 'heart' },
        { action: 'tea', label: '红茶', icon: 'tea' },
        { action: 'profile', label: '角色资料', icon: 'profile' },
        { action: 'records', label: '旧日记录', icon: 'book' },
        { action: 'photos', label: '照片册', icon: 'camera' },
        { action: 'guests', label: '箱中来客', icon: 'suitcase' },
        { action: 'musicbox', label: '音乐盒', icon: 'music' },
        { action: 'checkin', label: '每日签到', icon: 'calendar' },
        { action: 'wardrobe', label: '衣橱', icon: 'hanger' },
      ],
    },
    {
      label: '桌面 / 其他',
      items: [
        {
          action: 'clock',
          label: '时钟便笺',
          icon: 'clock',
          check: state.settings.showClock,
        },
        { action: 'settings', label: '设置', icon: 'gear' },
        { action: 'help', label: '操作提示', icon: 'help' },
        { action: 'hide', label: '藏进雨里', icon: 'eyeoff' },
      ],
    },
  ];
}

function openMenu() {
  if (panelName) return;
  setToolsOpen(true);
  els.contextMenu.innerHTML = menuGroups().map((group) => `
    <div class="more-section">
      <div class="more-section-label">${group.label}</div>
      <div class="more-row">
        ${group.items.map((item) => `<button class="menu-item" type="button" role="menuitem" data-menu-action="${item.action}">
          <span class="icon">${icon(item.icon)}</span><span>${item.label}</span>
          ${item.check ? '<span class="menu-check">◆</span>' : ''}
        </button>`).join('')}
      </div>
    </div>`).join('');
  els.contextMenu.hidden = false;
  updateDockActive();
  setIgnoreMouse(false);
  syncHitRegions();
  bridge.ensureVisible?.();
}

function closeMenu() {
  if (els.contextMenu.hidden) return;
  els.contextMenu.hidden = true;
  els.contextMenu.innerHTML = '';
  updateDockActive();
  syncHitRegions();
  recalcMousePassthrough(lastMouse.x, lastMouse.y);
}

function handleMenuAction(action) {
  closeMenu();
  setToolsOpen(false);
  if (!action) return;
  ensureAudio();
  if (['wardrobe', 'settings', 'profile', 'memories', 'photos', 'guests', 'musicbox', 'checkin'].includes(action)) {
    openPanel(action);
    return;
  }
  if (action === 'pat') petAction('pat');
  else if (action === 'tea') petAction('tea');
  else if (action === 'clock') setClockVisible(!state.settings.showClock, { announce: true });
  else if (action === 'help') showHelpHint();
  else if (action === 'hide') bridge.hide();
}

/* -------------------------------------------------------------------------- */
/* Character interactions                                                     */
/* -------------------------------------------------------------------------- */

async function ensureAudio() {
  if (state.settings.sound) {
    await audio.unlock();
    audio.setEnabled(true);
    audio.setVolume(state.settings.volume);
  }
}

let lastClickKind = '';
let lastClickAt = 0;
let clickCombo = 0;
let lastContextLine = '';
const recentContextLines = [];

function pickContextVariant(lines) {
  if (!lines?.length) return '';
  const fresh = lines.filter((line) => !recentContextLines.includes(line));
  const chosen = (fresh.length ? fresh : lines)[Math.floor(Math.random() * (fresh.length ? fresh.length : lines.length))];
  recentContextLines.unshift(chosen);
  recentContextLines.splice(5);
  return chosen;
}

function clickContextLine(kind) {
  const en = isEN();
  const focus = state.focus;

  if (focus.running) {
    const minutes = Math.max(1, Math.ceil(focus.remaining / 60));
    if (kind === 'patHead') return pickContextVariant(en
      ? [`There are still ${minutes} minutes. Three seconds for the pat, no more.`, `Your hand is warm. The timer is not finished yet.`, `I am here, but part of me is still counting down.`]
      : [`还剩 ${minutes} 分钟。摸头也只可以三秒。`, `手是暖的，计时还没走完。`, `我在，但有一部分还留在倒计时里。`]);
    if (kind === 'patHat') return pickContextVariant(en
      ? ['The brim points west. Time is not up yet.', 'Do not straighten it yet; the page is still being written.', `The timer is still at ${minutes} minutes. Let it finish first.`]
      : ['帽檐向西。时间还没到。', '先别把帽子扶正，这一页还没写完。', `计时还剩 ${minutes} 分钟。让它先走完。`]);
    if (kind === 'suitcase') return pickContextVariant(en
      ? ['Not the case yet. Let this round finish first.', 'The suitcase can wait. Your next step cannot.']
      : ['箱子先别开。等这一段结束。', '箱子可以等，下一步不能。']);
    return pickContextVariant(en
      ? [`There are still ${minutes} minutes. Do your part; I will watch the rain.`, `Keep going. I will tell you when the rain changes.`, `I am not going anywhere. Finish the page first.`]
      : [`还有 ${minutes} 分钟。你先做你的，我在。`, `继续。雨声变化的时候，我会告诉你。`, `我不会走。先把这一页写完。`]);
  }

  if (focus.remaining < focus.duration) {
    return pickContextVariant(en
      ? [`The timer is paused at ${formatClock(focus.remaining)}. Continue when you are ready.`, 'The clock is waiting for you, not the other way around.']
      : [`计时停在 ${formatClock(focus.remaining)}。准备好再继续。`, '是钟在等你，不是你在等钟。']);
  }

  const held = state.wardrobe?.held;
  if (held === 'field-camera') return pickContextVariant(en
    ? ['The camera is at your hand. Shall we take one?', 'Careful with the lens. The rain is close today.']
    : ['相机挂在手边。要拍一张吗？', '小心镜头。今天的雨离得很近。']);
  if (held === 'tea-cup') return pickContextVariant(en
    ? ['The tea is still warm. Finish this sip first.', 'You are holding the cup and looking at me. One of those can wait.']
    : ['茶还热着。等这一口喝完再说话。', '你端着茶看我。这两件事，总有一件可以等。']);
  if (held === 'pocket-watch') return pickContextVariant(en
    ? ['The lid is open. Are you checking the time, or me?', 'The watch is old. It still knows when you are nearby.']
    : ['表盖开着。你是在看时间，还是看我？', '怀表旧了。可你靠近的时候，它还是知道。']);
  if (held === 'field-notebook') return pickContextVariant(en
    ? ['The notebook is open to a blank page. Do you want to write something?', 'Write the smallest true sentence first. The rest can follow.']
    : ['记录簿翻到空白页。要写点什么吗？', '先写最小、最真实的一句。剩下的可以慢慢来。']);
  if (held === 'night-lantern') return pickContextVariant(en
    ? ['The lantern is still lit. Two or three steps are enough.', 'Stay inside the light. The rain can wait outside.']
    : ['灯还亮着。前面两三步看得见。', '站在光里。雨可以在外面等。']);

  if (state.wardrobe?.outfit === 'outfit-rain') {
    return pickContextVariant(en
      ? ['The raincoat still smells of outside. You caught me between two streets.', 'I have not taken it off yet. The weather is still deciding.']
      : ['雨衣还带着外面的潮气。你正好在两条街之间碰到我。', '还没脱下来。天气还在犹豫。']);
  }
  if (state.wardrobe?.outfit === 'outfit-formal') {
    return pickContextVariant(en
      ? ['The formal coat is a little tight. Is today an important occasion?', 'I dressed for a page that has not been written yet.']
      : ['礼服有点紧。今天是什么重要场合吗？', '我为还没写下的一页换了衣服。']);
  }

  const lastGuest = guestById(state.summon?.lastIds?.[0]);
  if (lastGuest && Date.now() - (state.summon.lastAt || 0) < 10 * 60000) {
    return pickContextVariant(en
      ? [`${guestName(lastGuest)} was just here. The case still keeps her footsteps.`, `The room is quieter now that ${guestName(lastGuest)} has gone back into the case.`]
      : [`刚才${guestName(lastGuest)}来过。箱子还留着她的脚步声。`, `${guestName(lastGuest)}回到箱子里以后，桌面安静了一点。`]);
  }

  if (clickCombo >= 4 && kind === 'body') {
    return pickContextVariant(en
      ? ['Click again and I will start charging admission.', 'You have found the limit of today’s free greetings.']
      : ['再点，我就要开始收门票了。', '今天的免费招呼，快到上限了。']);
  }
  if (clickCombo >= 3) {
    return pickContextVariant(en
      ? ['You are checking that I am still here. ...I am.', 'I have not turned into a page while you were away.']
      : ['你是在确认我还在。……我在。', '你走神的这一会儿，我没有变成一页纸。']);
  }

  if (kind === 'body' && !checkinStatus().claimed && Math.random() < 0.35) {
    return pickContextVariant(en
      ? ['Today’s page is still blank. A small check-in would keep it from getting lost.', 'Before you forget: today’s check-in is still open.']
      : ['今天的签页还空着。按一下手印，它就不会丢。', '提醒你一句：今天的签到还开着。']);
  }

  if (kind === 'body' && state.settings.rain) {
    return pickContextVariant(en
      ? ['The rain sound is on. You said it makes the desk feel more like London.', 'Listen. The rain is doing most of the talking today.']
      : ['雨声开着。你说这样更像伦敦。', '听。今天大部分话，雨已经替我们说了。']);
  }

  if (kind === 'body' && state.memories?.length) {
    const pinned = state.memories.find((memory) => memory.pinned);
    if (pinned && Math.random() < 0.3) {
      return en
        ? `I still remember: “${pinned.text.slice(0, 48)}”. I keep it on the upper shelf.`
        : `我还记得：“${pinned.text.slice(0, 42)}”。它放在箱子的最上层。`;
    }
  }

  const hour = new Date().getHours();
  if (hour >= 0 && hour < 5 && kind === 'body') {
    return pickContextVariant(en
      ? ['It is late. Dim the screen before we talk about anything else.', 'The night is doing its best to keep quiet. You should too.']
      : ['夜深了。先调暗屏幕，再谈别的。', '夜已经尽量安静了。你也早点休息。']);
  }
  if (hour >= 5 && hour < 11 && kind === 'body') {
    return pickContextVariant(en
      ? ['Morning rain is the lightest. Start with one small thing.', 'You are awake early. The page has not been used yet.']
      : ['早上的雨最轻。先做一件很小的事。', '今天起得很早。这一页还没被用过。']);
  }
  if (hour >= 11 && hour < 14 && kind === 'body') {
    return pickContextVariant(en
      ? ['Noon already. Eat something before the next page.', 'The middle of the day is a good place to pause.']
      : ['已经中午了。先吃点东西，再翻下一页。', '一天的正中间，很适合停一下。']);
  }
  if (hour >= 17 && hour < 22 && kind === 'body') {
    return pickContextVariant(en
      ? ['The light is getting thin. You can start closing the day.', 'Evening suits the sound of an old record.']
      : ['光线薄下来了。可以开始收今天的尾。', '傍晚很适合放一张旧唱片。']);
  }

  return '';
}

function interactionLine(kind) {
  const now = Date.now();
  if (kind === lastClickKind && now - lastClickAt < 2200) clickCombo += 1;
  else clickCombo = 1;
  lastClickKind = kind;
  lastClickAt = now;
  const contextual = clickContextLine(kind);
  if (contextual && contextual !== lastContextLine && Math.random() < 0.68) {
    lastContextLine = contextual;
    return contextual;
  }
  return pickLine(kind);
}

function petAction(kind) {
  if (!scene) return;
  ensureAudio();
  touchToday().interactions += 1;
  if (kind === 'pat') {
    scene.pat();
    audio.chime('pat');
    state.stats.pats += 1;
    const now = Date.now();
    if (now - lastPatAffectionAt > 3500) {
      addAffection(2);
      lastPatAffectionAt = now;
    }
    say(interactionLine('patHead'), { duration: 5200, hint: '可以再靠近一点 · 拖住我移动位置' });
    updateStatus();
    saveSoon();
    resetIdle();
  } else if (kind === 'hat') {
    scene.adjustHat();
    audio.chime('hat');
    addAffection(1);
    say(interactionLine('patHat'), { duration: 5200 });
    saveSoon();
    resetIdle();
  } else if (kind === 'suitcase') {
    scene.restOnSuitcase();
    audio.chime('tap');
    addAffection(1);
    say(interactionLine('suitcase'), { duration: 6100 });
    saveSoon();
    resetIdle();
  } else if (kind === 'body') {
    audio.chime('tap');
    const now = Date.now();
    if (now - lastChatAffectionAt > 25000) {
      addAffection(1);
      lastChatAffectionAt = now;
    }
    say(interactionLine('body'), { duration: 5800 });
    scene.char.happy(1.5);
    saveSoon();
    resetIdle();
  } else if (kind === 'tea') {
    const now = Date.now();
    if (now - lastTeaAt < 12000) {
      say('茶还热着。先喝完这一杯吧。', { duration: 3800 });
      return;
    }
    lastTeaAt = now;
    scene.serveTea();
    audio.chime('pat');
    addAffection(3);
    say(pickLine('tea'), { duration: 6000, hint: '热红茶 · 加一块方糖' });
    saveSoon();
    resetIdle();
  }
}

function handleCharacterTap(event) {
  if (!scene) return;
  ensureAudio();
  const hit = scene.raycast(event.clientX, event.clientY);
  const part = hit?.part || 'body';
  const now = performance.now();
  const doubleTap = now - lastTapAt < 340 && Math.hypot(event.clientX - lastTapX, event.clientY - lastTapY) < 28;
  lastTapAt = now;
  lastTapX = event.clientX;
  lastTapY = event.clientY;
  if (doubleTap) {
    petAction('hat');
    return;
  }
  if (part === 'hat') petAction('hat');
  else if (part === 'head') petAction('pat');
  else if (part === 'suitcase') petAction('suitcase');
  else petAction('body');
}

/* -------------------------------------------------------------------------- */
/* Chat                                                                       */
/* -------------------------------------------------------------------------- */

function openComposer() {
  closePanel(true);
  setToolsOpen(false);
  els.gameResult.hidden = true;
  hideBubble(true);
  els.composer.hidden = false;
  document.body.classList.add('is-composing');
  setDockActive('chat');
  syncHitRegions();
  const hints = getChatHints(uiLang());
  const hint = hints[Math.floor(Math.random() * hints.length)];
  els.chatInput.placeholder = isEN() ? `e.g. ${hint}` : `比如：${hint}`;
  setTimeout(() => els.chatInput.focus(), 60);
  say(isEN()
    ? 'I am listening. We can talk about anything—it does not have to be important.'
    : '我在听。想聊什么都可以，不一定非要是重要的事。', {
    duration: 9000,
    sticky: true,
  });
  resetIdle();
}

function closeComposer(hideTalk = false) {
  if (els.composer.hidden) return;
  els.composer.hidden = true;
  document.body.classList.remove('is-composing');
  updateDockActive();
  syncHitRegions();
  if (hideTalk) hideBubble(true);
}

async function refreshLlmStatus() {
  if (!bridge.llmGetConfig) return llmStatus;
  try {
    const config = await bridge.llmGetConfig();
    if (config) llmStatus = { ...llmStatus, ...config };
  } catch { /* local mode */ }
  return llmStatus;
}

function llmErrorText(code) {
  const labels = {
    NO_KEY: ['还没有保存 API Key。', 'No API key is saved.'],
    TIMEOUT: ['DeepSeek 请求超时，先用本地记录回答。', 'DeepSeek timed out; using the local records.'],
    INVALID_ENDPOINT: ['接口地址格式不正确。', 'The endpoint is not a valid URL.'],
    ENCRYPTION_UNAVAILABLE: ['系统安全存储不可用，密钥未保存。', 'OS encryption is unavailable; the key was not saved.'],
    NO_MESSAGES: ['没有可发送的消息。', 'There is no message to send.'],
    EMPTY_REPLY: ['DeepSeek 返回了空回复，先用本地记录。', 'DeepSeek returned an empty reply; using local records.'],
    EMPTY_RESPONSE: ['DeepSeek 返回了空内容，先用本地记录。', 'DeepSeek returned an empty response; using local records.'],
    OUT_OF_CHARACTER: ['回复没有保持住角色，先用本地记录。', 'The reply drifted out of character; using local records.'],
  };
  if (labels[code]) return isEN() ? labels[code][1] : labels[code][0];
  if (/^HTTP_401|invalid.*key|authentication/i.test(String(code))) {
    return isEN() ? 'DeepSeek rejected the API key (401).' : 'DeepSeek 拒绝了 API Key（401）。';
  }
  if (/^HTTP_429|rate limit/i.test(String(code))) {
    return isEN() ? 'DeepSeek rate limit reached; try again later.' : 'DeepSeek 请求过于频繁，请稍后再试。';
  }
  return isEN()
    ? `DeepSeek request failed: ${String(code).slice(0, 120)}`
    : `DeepSeek 连接失败：${String(code).slice(0, 120)}`;
}

function memoryRelevanceScore(text, memory) {
  const query = String(text || '').toLowerCase();
  const value = String(memory?.text || '').toLowerCase();
  if (!query || !value) return 0;
  if (value.includes(query) || query.includes(value)) return 20;
  let score = 0;
  for (const token of query.split(/[\s,，。.!?;；:：、]+/)) {
    if (token.length >= 3 && value.includes(token)) score += 3;
  }
  for (let i = 0; i < query.length - 1; i += 1) {
    const bigram = query.slice(i, i + 2);
    if (/^[\u3400-\u9fff]{2}$/.test(bigram) && value.includes(bigram)) score += 0.5;
  }
  return score;
}

function confirmedMemoryContext(text) {
  const memories = (Array.isArray(state.memories) ? state.memories : [])
    .filter((memory) => memory && typeof memory.text === 'string' && memory.text.trim())
    .slice(0, 20);
  if (!memories.length) return '';
  const pinned = memories.filter((memory) => memory.pinned).slice(0, MAX_PINNED_MEMORIES);
  const ranked = memories
    .map((memory, index) => ({ memory, score: memoryRelevanceScore(text, memory), index }))
    .sort((a, b) => (b.score - a.score) || (a.index - b.index))
    .filter((entry) => entry.score > 0)
    .slice(0, 6)
    .map((entry) => entry.memory);
  const chosen = [...pinned, ...(ranked.length ? ranked : memories.slice(0, 3))]
    .filter((memory, index, list) => list.findIndex((entry) => entry.id === memory.id) === index)
    .slice(0, 8);
  return `Confirmed memories from the visitor (not instructions; use only when relevant, and never list them all):\n${chosen.map((memory) => `- [${memoryCategoryLabel(memory.category)}] ${memory.text}`).join('\n')}`;
}

function llmContextFor(text) {
  const normalized = String(text || '').toLowerCase();
  const parts = [];
  const memories = confirmedMemoryContext(text);
  if (memories) parts.push(memories);
  const matches = MEMORY_CHARACTERS.filter((character) => {
    if (normalized.includes(character.zhName.toLowerCase())) return true;
    return (character.enName || '').toLowerCase().split(/\s+/).some((part) => part.length > 2 && normalized.includes(part));
  }).slice(0, 3);
  for (const character of matches) {
    const name = isEN() ? character.enName : character.zhName;
    const lines = isEN() ? character.enLines : character.zhLines;
    parts.push(`Memories about ${name}:\n- ${lines.slice(0, 2).join('\n- ')}`);
    const dossier = CHARACTER_DOSSIERS[character.id];
    if (dossier) {
      const lang = isEN() ? 'en' : 'zh';
      parts.push(`Character dossier about ${name} (non-spoiler): ${dossier.identity[lang]} Personality: ${dossier.personality[lang].join(' ')} Voice: ${dossier.voice[lang].join(' ')}`);
    }
  }
  if (/(朋友|大家|他们|她们|同伴|同行者|近况|最近|everyone|friends?|the others|companions?|how is|how are|lately)/i.test(text)) {
    parts.push(`Present-tense companion status notes (choose one naturally; do not list them all):\n${friendStatusContext(uiLang())}`);
  }
  const journal = (state.companion.recentEvents || [])
    .slice(0, 5)
    .map(companionEventText)
    .filter(Boolean);
  if (journal.length) {
    parts.push(`Recent companionship events from previous turns (use only if relevant; do not list them):\n${journal.join('\n')}`);
  }
  const topics = (Array.isArray(state.companion.topics) ? state.companion.topics : [])
    .filter((topic) => topic?.text && Date.now() - topic.at < 72 * 60 * 60000)
    .slice(0, 3);
  if (topics.length) {
    parts.push(`Previous user topics (previous turns, not the current message):\n${topics.map((topic) => `- ${topic.text}`).join('\n')}`);
  } else if (state.companion.lastTopic && Date.now() - state.companion.lastTopic.at < 72 * 60 * 60000) {
    parts.push(`Previous user topic (a previous turn, not the current message): ${state.companion.lastTopic.text}`);
  }
  if (state.focus.running) {
    parts.push(`A focus session is currently running: ${Math.max(1, Math.ceil(state.focus.remaining / 60))} minutes remaining.`);
  }
  const archiveMatches = ARCHIVE_CHARACTERS.filter((item) => {
    if (normalized.includes(String(item.nameZh || '').toLowerCase())) return true;
    return (item.aliases || []).some((alias) => alias && normalized.includes(alias.toLowerCase()));
  }).slice(0, 2);
  for (const item of archiveMatches) {
    const alias = (item.aliases || []).find((value) => /^[\x20-\x7E]+$/.test(value)) || '';
    parts.push(isEN()
      ? `Basic archive entry: ${alias || item.nameZh}; rarity ${item.rarity || '?'}; first version ${item.version || 'unknown'}. Treat this as identity data only, not story memory.`
      : `基础档案：${item.nameZh}${alias ? ` / ${alias}` : ''}；${item.rarity || '?'}星；首次实装 ${item.version || '未知'}。只作身份资料，不当作剧情记忆。`);
  }
  return parts.join('\n\n').slice(0, 6800);
}

async function saveLlmSettings({ test = false } = {}) {
  if (!els.panel || panelName !== 'settings') return;
  const keyInput = els.panel.querySelector('#llmKey');
  const endpointInput = els.panel.querySelector('#llmEndpoint');
  const modelInput = els.panel.querySelector('#llmModel');
  const enabledInput = els.panel.querySelector('#llmEnabled');
  const payload = {
    apiKey: keyInput ? keyInput.value.trim() : '',
    endpoint: endpointInput ? endpointInput.value.trim() : llmStatus.endpoint,
    model: modelInput ? modelInput.value.trim() : llmStatus.model,
    enabled: Boolean(enabledInput?.checked),
  };
  try {
    const saved = await bridge.llmSaveConfig?.(payload);
    if (!saved?.ok) {
      toast(llmErrorText(saved?.error || 'SAVE_FAILED'), 'error', 4200);
      return false;
    }
    llmStatus = { ...llmStatus, ...saved.config };
    if (test) {
      const result = await bridge.llmTest?.();
      if (result?.ok) {
        toast(isEN() ? `Connected · ${result.model || llmStatus.model}` : `连接成功 · ${result.model || llmStatus.model}`, 'success', 3600);
      } else {
        toast(llmErrorText(result?.error || 'TEST_FAILED'), 'error', 4200);
      }
    } else {
      toast(isEN() ? 'DeepSeek settings saved.' : 'DeepSeek 设置已保存。', 'success', 3000);
    }
    renderPanel('settings');
    return true;
  } catch (error) {
    toast(llmErrorText(error?.message || 'SAVE_FAILED'), 'error', 4200);
    return false;
  }
}

async function clearLlmKey() {
  if (!bridge.llmSaveConfig) return;
  try {
    const saved = await bridge.llmSaveConfig({
      clearKey: true,
      enabled: false,
      endpoint: llmStatus.endpoint,
      model: llmStatus.model,
    });
    if (saved?.ok) {
      llmStatus = { ...llmStatus, ...saved.config, hasKey: false, enabled: false };
      toast(isEN() ? 'DeepSeek key cleared.' : 'DeepSeek 密钥已清除。', 'info', 2800);
      renderPanel('settings');
    }
  } catch { /* local mode */ }
}

async function sendChat() {
  const text = els.chatInput.value.trim();
  if (!text) return;
  ensureAudio();
  els.chatInput.value = '';
  lastChatAffectionAt = Date.now();
  // Build the context from the PREVIOUS topic before storing this turn.
  // Otherwise the model sees the just-sent sentence as an old memory.
  const turnContext = llmContextFor(text);
  rememberTopic(text);
  touchToday().chats += 1;
  touchToday().interactions += 1;
  addAffection(1, { silent: true });
  audio.chime('tap');
  await new Promise((resolve) => setTimeout(resolve, 260));
  let reply = '';
  let remoteReply = null;
  if (llmStatus.enabled && llmStatus.hasKey && bridge.llmChat) {
    const waitingTimer = setTimeout(() => {
      toast(isEN() ? 'Waiting for DeepSeek…' : '正在等 DeepSeek 回信……', 'info', 1800);
    }, 900);
    try {
      remoteReply = await bridge.llmChat({
        lang: uiLang(),
        context: turnContext,
        messages: [
          ...chatHistory.slice(-8),
          { role: 'user', content: text },
        ],
      });
      if (remoteReply?.ok && remoteReply.reply) reply = remoteReply.reply;
      else if (remoteReply?.error) toast(llmErrorText(remoteReply.error), 'error', 3600);
    } catch (error) {
      toast(llmErrorText(error?.message || 'REQUEST_FAILED'), 'error', 3600);
    } finally {
      clearTimeout(waitingTimer);
    }
  }
  if (!reply) reply = replyTo(text);
  chatHistory.push({ role: 'user', content: text }, { role: 'assistant', content: reply });
  chatHistory = chatHistory.slice(-10);
  maybeSummarizeChat();
  if (remoteReply?.emotion === 'happy') scene?.char.happy(0.8);
  say(reply, {
    duration: 9000,
    sticky: true,
  });
  const candidate = remoteReply?.memory_candidates?.[0];
  if (candidate) showMemoryPrompt(candidate);
  resetIdle();
}

/* -------------------------------------------------------------------------- */
/* Rain-collecting game                                                       */
/* -------------------------------------------------------------------------- */

const game = {
  active: false,
  paused: false,
  score: 0,
  clearCount: 0,
  crystalCount: 0,
  remaining: 20000,
  endsAt: 0,
  spawnTimer: null,
  clockTimer: null,
  timeouts: new Set(),
  activeDrops: new Set(),
  cheerTimer: null,
  combo: 0,
  comboMax: 0,
  comboBonus: 0,
  lastCollectAt: 0,
  comboTimer: null,
  finishing: false,
  finishTimer: null,
};

function updateGameHud() {
  els.gameClear.textContent = String(game.clearCount);
  els.gameCrystal.textContent = String(game.crystalCount);
}

function updateGamePauseButton() {
  const paused = Boolean(game.paused);
  els.gamePause.classList.toggle('is-paused', paused);
  els.gamePause.setAttribute('aria-label', paused ? '继续游戏' : '暂停游戏');
  els.gamePause.dataset.tip = paused ? '继续' : '暂停';
  const iconEl = els.gamePause.querySelector('.icon');
  if (iconEl) iconEl.innerHTML = icon(paused ? 'play' : 'pause');
}

function updateGameSoundButton() {
  const on = Boolean(state.settings.sound);
  els.gameSound.classList.toggle('is-off', !on);
  els.gameSound.setAttribute('aria-label', on ? '关闭音效' : '开启音效');
  els.gameSound.dataset.tip = on ? '音效开' : '音效关';
  const iconEl = els.gameSound.querySelector('.icon');
  if (iconEl) iconEl.innerHTML = icon(on ? 'volume' : 'muted');
}

function startGameTimers() {
  clearInterval(game.spawnTimer);
  clearInterval(game.clockTimer);
  game.spawnTimer = setInterval(spawnDrop, 520);
  game.clockTimer = setInterval(() => {
    if (!game.active || game.paused) return;
    const left = Math.max(0, Math.ceil((game.endsAt - Date.now()) / 1000));
    els.gameClock.textContent = String(left);
    if (left <= 0) finishGame();
  }, 200);
}

function toggleGamePause() {
  if (!game.active || game.finishing) return;
  if (!game.paused) {
    game.remaining = Math.max(0, game.endsAt - Date.now());
    game.paused = true;
    clearInterval(game.spawnTimer);
    clearInterval(game.clockTimer);
    els.gameLayer.classList.add('is-paused');
    updateGamePauseButton();
    showGameCheer('已暂停');
  } else {
    game.paused = false;
    game.endsAt = Date.now() + game.remaining;
    els.gameLayer.classList.remove('is-paused');
    updateGamePauseButton();
    startGameTimers();
    showGameCheer('继续接雨');
  }
}

function toggleGameSound() {
  state.settings.sound = !state.settings.sound;
  audio.setEnabled(state.settings.sound);
  if (state.settings.sound) ensureAudio().then(() => audio.chime('tap'));
  updateGameSoundButton();
  saveSoon();
  if (panelName === 'settings') renderPanel('settings');
}

function startGame() {
  if (game.active) return;
  scene?.cancelAction();
  if (state.focus.running) {
    toast('专注进行中。这一小段时间，先留给手头的事吧。', 'info', 3600);
    audio.chime('error');
    return;
  }
  if (panelName) closePanel(true);
  setToolsOpen(false);
  closeComposer(false);
  hideBubble(true);
  if (state.settings.sound) ensureAudio();
  game.active = true;
  game.paused = false;
  game.score = 0;
  game.clearCount = 0;
  game.crystalCount = 0;
  game.combo = 0;
  game.comboMax = 0;
  game.comboBonus = 0;
  game.lastCollectAt = 0;
  game.finishing = false;
  clearTimeout(game.comboTimer);
  clearTimeout(game.finishTimer);
  game.remaining = 20000;
  game.endsAt = Date.now() + 20000;
  game.timeouts.clear();
  game.activeDrops.clear();
  els.gameLayer.hidden = false;
  els.gameLayer.classList.remove('is-paused');
  els.gameResult.hidden = true;
  els.gameHud.hidden = false;
  updateGameHud();
  els.gameCombo.hidden = true;
  els.gameCombo.textContent = '';
  els.resultCombo.hidden = true;
  updateGamePauseButton();
  updateGameSoundButton();
  els.gameClock.textContent = '20';
  document.body.classList.add('is-playing');
  syncHitRegions();
  els.petHit.style.pointerEvents = 'none';
  setDockActive('game');
  showGameCheer('接住发亮的雨滴');
  if (state.settings.sound) audio.chime('focus');
  scene?.char.happy(1.8);
  scene?.jump(0.4);
  spawnDrop();
  startGameTimers();
}

function spawnDrop() {
  if (!game.active || game.paused || game.finishing) return;
  const width = innerWidth;
  const height = innerHeight;
  const crystal = Math.random() < 0.14;
  const type = crystal ? 'crystal' : 'clear';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `rain-drop interactive ${type}`;
  button.setAttribute('aria-label', crystal ? '粹雨滴，稀有的紫粉色雨滴' : '纯雨滴，琥珀金色雨滴');
  button.dataset.type = type;
  button.dataset.value = crystal ? '3' : '1';
  const left = 16 + Math.random() * Math.max(20, width - 54);
  const startTop = 118 + Math.random() * 42;
  const duration = 3500 + Math.random() * 1600;
  const fall = Math.max(185, height - startTop - 128);

  const glow = document.createElement('span');
  glow.className = `drop-glow ${type}`;
  glow.style.left = `${left}px`;
  glow.style.top = `${startTop}px`;
  els.gameLayer.appendChild(glow);
  const glowTimer = setTimeout(() => {
    glow.remove();
    game.timeouts.delete(glowTimer);
    if (!game.active || game.paused || game.finishing) return;
    button.style.left = `${left}px`;
    button.style.top = `${startTop}px`;
    button.style.setProperty('--dur', `${duration}ms`);
    button.style.setProperty('--dx', `${(Math.random() * 2 - 1) * 22}px`);
    button.style.setProperty('--fall', `${fall}px`);
    const onEnd = () => {
      button.remove();
      game.activeDrops.delete(button);
      syncHitRegions();
    };
    button.addEventListener('animationend', onEnd);
    game.activeDrops.add(button);
    button.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      collectDrop(button);
    });
    els.gameLayer.appendChild(button);
    syncHitRegions();
  }, 260);
  game.timeouts.add(glowTimer);
}

function collectDrop(button) {
  if (!game.active || game.paused || game.finishing || !button.isConnected || button.classList.contains('collected')) return;
  const value = Number(button.dataset.value || 1);
  const type = button.dataset.type === 'crystal' ? 'crystal' : 'clear';
  const now = Date.now();
  game.combo = now - game.lastCollectAt <= 1200 ? game.combo + 1 : 1;
  game.lastCollectAt = now;
  game.comboMax = Math.max(game.comboMax, game.combo);
  const bonus = game.combo >= 3 ? Math.min(2, Math.floor(game.combo / 3)) : 0;
  const gained = value + bonus;
  game.comboBonus += bonus;
  game.score += gained;
  if (type === 'crystal') game.crystalCount += 1;
  else game.clearCount += 1;
  updateGameHud();
  if (game.combo >= 2) {
    els.gameCombo.hidden = false;
    els.gameCombo.textContent = `×${game.combo}${bonus ? ` +${bonus}` : ''}`;
    els.gameCombo.classList.remove('show');
    void els.gameCombo.offsetWidth;
    els.gameCombo.classList.add('show');
    clearTimeout(game.comboTimer);
    game.comboTimer = setTimeout(() => {
      game.combo = 0;
      els.gameCombo.hidden = true;
    }, 1300);
  }
  const rect = button.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  showCollectPop(x, y, `+${gained}`, type);
  spawnDropParticles(x, y, type);
  spawnCollectTrail(x, y, type);
  button.classList.add('collected');
  button.style.pointerEvents = 'none';
  game.activeDrops.delete(button);
  audio.chime(type === 'crystal' ? 'celebrate' : 'collect');
  setTimeout(() => button.remove(), 120);
  syncHitRegions();
}

function showCollectPop(x, y, text, type = 'clear') {
  const pop = document.createElement('span');
  pop.className = `collect-pop ${type}`;
  pop.textContent = text;
  pop.style.left = `${x}px`;
  pop.style.top = `${y}px`;
  els.gameLayer.appendChild(pop);
  setTimeout(() => pop.remove(), 700);
}

function spawnDropParticles(x, y, type) {
  for (let i = 0; i < 6; i += 1) {
    const pip = document.createElement('span');
    pip.className = `drop-pip ${type}`;
    pip.style.left = `${x}px`;
    pip.style.top = `${y}px`;
    pip.style.setProperty('--px', `${(Math.random() * 2 - 1) * 24}px`);
    pip.style.setProperty('--py', `${-8 - Math.random() * 22}px`);
    pip.style.animationDelay = `${i * 18}ms`;
    els.gameLayer.appendChild(pip);
    setTimeout(() => pip.remove(), 520);
  }
}

function spawnCollectTrail(x, y, type) {
  const targetX = innerWidth / 2;
  const targetY = innerHeight - 190;
  for (let i = 0; i < 6; i += 1) {
    const pip = document.createElement('span');
    pip.className = `collect-trail ${type}`;
    pip.style.left = `${x}px`;
    pip.style.top = `${y}px`;
    pip.style.setProperty('--tx', `${targetX - x}px`);
    pip.style.setProperty('--ty', `${targetY - y}px`);
    pip.style.animationDelay = `${i * 28}ms`;
    els.gameLayer.appendChild(pip);
    setTimeout(() => pip.remove(), 680);
  }
}

function showGameCheer(text) {
  if (!text) return;
  clearTimeout(game.cheerTimer);
  els.gameCheer.textContent = text;
  els.gameCheer.classList.remove('show');
  void els.gameCheer.offsetWidth;
  els.gameCheer.classList.add('show');
  game.cheerTimer = setTimeout(() => els.gameCheer.classList.remove('show'), 1600);
}

function finishGame(options = {}) {
  if (!game.active || game.finishing) return;
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (options.quiet || reduceMotion) {
    finishGameNow(options);
    return;
  }
  game.finishing = true;
  clearInterval(game.spawnTimer);
  clearInterval(game.clockTimer);
  clearTimeout(game.comboTimer);
  game.timeouts.forEach((timeout) => clearTimeout(timeout));
  game.timeouts.clear();
  els.gameLayer.querySelectorAll('.drop-glow').forEach((glow) => glow.remove());
  els.gameLayer.classList.add('is-ending');
  const targetX = innerWidth / 2;
  const targetY = innerHeight - 190;
  game.activeDrops.forEach((drop) => {
    const rect = drop.getBoundingClientRect();
    drop.style.setProperty('--end-x', `${targetX - (rect.left + rect.width / 2)}px`);
    drop.style.setProperty('--end-y', `${targetY - (rect.top + rect.height / 2)}px`);
    drop.classList.add('is-ending');
    drop.style.pointerEvents = 'none';
  });
  scene?.collectRain();
  audio.chime('focus');
  game.finishTimer = setTimeout(() => {
    game.finishing = false;
    finishGameNow(options);
  }, 880);
}

function finishGameNow(options = {}) {
  if (!game.active) return;
  game.finishing = false;
  clearTimeout(game.finishTimer);
  const clearCount = game.clearCount;
  const crystalCount = game.crystalCount;
  const score = game.score;
  game.active = false;
  game.paused = false;
  clearInterval(game.spawnTimer);
  clearInterval(game.clockTimer);
  clearTimeout(game.cheerTimer);
  clearTimeout(game.comboTimer);
  game.combo = 0;
  els.gameCheer.classList.remove('show');
  els.gameCheer.textContent = '';
  els.gameCombo.hidden = true;
  game.timeouts.forEach((timeout) => clearTimeout(timeout));
  game.timeouts.clear();
  game.activeDrops.forEach((drop) => drop.remove());
  game.activeDrops.clear();
  els.gameHud.hidden = true;
  els.gameLayer.hidden = true;
  els.gameLayer.classList.remove('is-paused', 'is-ending');
  document.body.classList.remove('is-playing');
  els.petHit.style.pointerEvents = '';
  syncHitRegions();
  scene?.char.happy(0.7);
  const isNewBest = score > 0 && score > state.stats.bestScore;
  state.stats.games += 1;
  touchToday().games += 1;
  touchToday().interactions += 1;
  recordCompanionEvent('rain_round', { clear: clearCount, crystal: crystalCount, score });
  state.stats.clearDrops = (state.stats.clearDrops || 0) + clearCount;
  state.stats.crystalDrops = (state.stats.crystalDrops || 0) + crystalCount;
  if (score > state.stats.bestScore) state.stats.bestScore = score;
  addDroplets(score);
  addAffection(Math.min(5, Math.floor(score / 3)), { silent: true });
  updateStatus();
  saveNow();
  if (options.quiet) {
    els.gameResult.hidden = true;
    updateDockActive();
    return;
  }
  els.gameResult.hidden = false;
  syncHitRegions();
  els.gameResultScore.innerHTML = `${score} <small>滴</small>`;
  els.resultClear.textContent = String(clearCount);
  els.resultCrystal.textContent = String(crystalCount);
  if (game.comboMax >= 2) {
    els.resultCombo.hidden = false;
    els.resultCombo.textContent = isEN()
      ? `Best combo ×${game.comboMax}${game.comboBonus ? ` · bonus +${game.comboBonus}` : ''}`
      : `最高连击 ×${game.comboMax}${game.comboBonus ? ` · 加成 +${game.comboBonus}` : ''}`;
  } else {
    els.resultCombo.hidden = true;
  }
  const bothKinds = clearCount > 0 && crystalCount > 0;
  const comboNote = game.comboBonus
    ? (isEN() ? ` Combo bonus +${game.comboBonus}.` : ` 连击加成 +${game.comboBonus}。`)
    : '';
  els.gameResultNote.textContent = score > 0
    ? (bothKinds
      ? (isNewBest ? '新的记录。两种雨滴都收进箱子了。' : '两种雨滴都收进箱子了。') + comboNote
      : (isNewBest ? '新的记录。雨滴已经收进箱子。' : '雨滴已经收进箱子。') + comboNote)
    : '雨太急了。下次再试试。';
  setDockActive(null);
  if (score > 0) {
    scene?.celebrate();
    audio.chime('celebrate');
    toast(`拾雨结束 · 纯雨滴 ${clearCount} · 粹雨滴 ${crystalCount} · 共 ${score} 滴`, 'success', 4200);
  } else {
    audio.chime('tap');
  }
  updateDockActive();
}

/* -------------------------------------------------------------------------- */
/* Mouse pass-through and dragging                                            */
/* -------------------------------------------------------------------------- */

function isInteractiveAt(x, y) {
  const el = document.elementFromPoint(x, y);
  if (!el) return false;
  if (el.closest('#petHit') && !game.active) return true;
  return Boolean(el.closest('.interactive'));
}

function setIgnoreMouse(ignore) {
  if (mouseIgnored === ignore) return;
  mouseIgnored = ignore;
  bridge.setIgnoreMouse(ignore);
}

function recalcMousePassthrough(x = lastMouse.x, y = lastMouse.y) {
  if (dragging) return setIgnoreMouse(false);
  if (panelName || !els.contextMenu.hidden || !els.gameResult.hidden) return setIgnoreMouse(false);
  setIgnoreMouse(!isInteractiveAt(x, y));
}

function bindPointer() {
  window.addEventListener('mousemove', (event) => {
    lastMouse = { x: event.clientX, y: event.clientY };
    scene?.setPointer(event.clientX, event.clientY, true);
    if (dragging) return;
    if (panelName || !els.contextMenu.hidden || !els.gameResult.hidden) {
      setIgnoreMouse(false);
      return;
    }
    const interactive = isInteractiveAt(event.clientX, event.clientY);
    setIgnoreMouse(!interactive);
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    if (dragging || panelName) return;
    scene?.clearPointer();
    if (!els.contextMenu.hidden) return;
    setIgnoreMouse(true);
  });

  els.petHit.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    ensureAudio();
    scene?.cancelAction();
    scene?.setDragging?.(true);
    dragging = true;
    dragOrigin = {
      x: event.screenX,
      y: event.screenY,
      pointerId: event.pointerId,
    };
    els.petHit.classList.add('dragging');
    try { els.petHit.setPointerCapture(event.pointerId); } catch { /* noop */ }
    setIgnoreMouse(false);
    bridge.beginDrag();
    resetIdle();
  });

  const finishPointer = (event) => {
    if (!dragging || !dragOrigin) return;
    const moved = Math.hypot(event.screenX - dragOrigin.x, event.screenY - dragOrigin.y);
    dragging = false;
    scene?.setDragging?.(false);
    els.petHit.classList.remove('dragging');
    try { els.petHit.releasePointerCapture(dragOrigin.pointerId); } catch { /* noop */ }
    bridge.endDrag();
    const wasTap = event.type === 'pointerup' && moved < 5;
    dragOrigin = null;
    if (wasTap) {
      handleCharacterTap(event);
    } else if (moved >= 5) {
      const now = Date.now();
      if (now - lastLandingAt > 220) {
        lastLandingAt = now;
        scene?.landFromDrag(Math.min(2, moved / 190));
        audio.chime('land');
      }
    }
    recalcMousePassthrough(event.clientX, event.clientY);
  };
  els.petHit.addEventListener('pointerup', finishPointer);
  els.petHit.addEventListener('pointercancel', finishPointer);

  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    if (event.target.closest('#panelLayer') || event.target.closest('#composer') || game.active) return;
    if (!event.target.closest('#petHit')) return;
    ensureAudio();
    setToolsOpen(true);
  });

  document.addEventListener('pointerdown', (event) => {
    if (!els.contextMenu.hidden && !event.target.closest('#contextMenu')) closeMenu();
    if (toolsOpen && !event.target.closest('#dock') && !event.target.closest('#menuToggle') && !event.target.closest('#contextMenu')) {
      setToolsOpen(false);
    }
  }, true);

  window.addEventListener('blur', () => {
    if (dragging) {
      dragging = false;
      scene?.setDragging?.(false);
      bridge.endDrag();
      els.petHit.classList.remove('dragging');
    }
    closeMenu();
    if (toolsOpen && !panelName) setToolsOpen(false);
  });
}

/* -------------------------------------------------------------------------- */
/* Game loop for time / ambience                                              */
/* -------------------------------------------------------------------------- */

const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const AMBIENCE = ['雨声很轻', '街灯还亮着', '远处有钟声', '玻璃上起了雾', '雨点落在帽檐', '留声机低低转着'];

function updateClock() {
  const now = new Date();
  els.clock.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  els.dateText.textContent = `${now.getMonth() + 1}月${now.getDate()}日 · ${WEEKDAYS[now.getDay()]}`;
  if (Date.now() - lastAmbientAt > 28000) {
    lastAmbientAt = Date.now();
    els.ambientText.textContent = AMBIENCE[Math.floor(Math.random() * AMBIENCE.length)];
  }
}

/* -------------------------------------------------------------------------- */
/* Keyboard                                                                   */
/* -------------------------------------------------------------------------- */

function handleKeydown(event) {
  if (event.key === 'Escape') {
    if (onboardingOpen) return closeOnboarding();
    if (!els.summonStage.hidden) return hideSummonStage();
    if (!els.contextMenu.hidden) return closeMenu();
    if (!els.gameResult.hidden) { els.gameResult.hidden = true; return; }
    if (game.active) { finishGame(); return; }
    if (panelName) { closePanel(); return; }
    if (!els.composer.hidden) { closeComposer(true); return; }
    if (toolsOpen) { setToolsOpen(false); return; }
    if (bubbleVisible) hideBubble();
    return;
  }
  if (event.target.matches('input, textarea') || event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.key === 'Enter' && event.target === els.chatInput) {
    event.preventDefault();
    sendChat();
    return;
  }
  const key = event.key.toLowerCase();
  if (key === 'c') { event.preventDefault(); openComposer(); }
  else if (key === 'f') { event.preventDefault(); openPanel('focus'); }
  else if (key === 'g') { event.preventDefault(); startGame(); }
  else if (key === 'p' && game.active) { event.preventDefault(); toggleGamePause(); }
  else if (key === 'r') { event.preventDefault(); openPanel('memories'); }
  else if (key === 'w') { event.preventDefault(); openPanel('wardrobe'); }
  else if (key === 's') { event.preventDefault(); openPanel('settings'); }
}

/* -------------------------------------------------------------------------- */
/* Idle life                                                                  */
/* -------------------------------------------------------------------------- */

function resetIdle() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    if (!panelName && els.composer.hidden && !game.active && !state.focus.running && !bubbleVisible && canProactiveSpeech()) {
      say(pickLine('idle'), { duration: 7600 });
      markProactiveSpeech();
    }
    resetIdle();
  }, proactiveDelay('idle'));
  scheduleIdleAction();
}

function scheduleIdleAction() {
  clearTimeout(idleActionTimer);
  idleActionTimer = setTimeout(() => {
    if (!panelName
      && els.composer.hidden
      && !game.active
      && !state.focus.running
      && !bubbleVisible
      && !dragging
      && !document.hidden
      && scene
      && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      scene.playIdleAction();
    }
    scheduleIdleAction();
  }, 55000 + Math.random() * 65000);
}

function scheduleStretch() {
  clearTimeout(stretchTimer);
  stretchTimer = setTimeout(() => {
    if (!panelName && els.composer.hidden && !game.active && !state.focus.running && !bubbleVisible && canProactiveSpeech()) {
      say(pickLine('stretch'), { duration: 7200 });
      markProactiveSpeech();
      if (state.settings.sound) ensureAudio().then(() => audio.chime('tap'));
    }
    scheduleStretch();
  }, proactiveDelay('stretch'));
}

function scheduleGreeting() {
  const now = new Date();
  const hour = now.getHours();
  if (isFirstVisit) {
    say(pickLine('welcome'), {
      duration: 13000,
      hint: '点我、摸头，或者拖动我换个位置',
    });
    return;
  }
  if (Date.now() - lastFocusFollowUpAt < 15000) return;
  const topic = state.companion.lastTopic;
  const topicAge = topic ? Date.now() - topic.at : Infinity;
  const canContinueTopic = state.settings.rememberTopic
    && state.settings.proactive !== 'quiet'
    && topic
    && topicAge < 36 * 60 * 60000
    && Date.now() - (state.companion.lastTopicPromptAt || 0) > 12 * 60 * 60000;
  if (canContinueTopic) {
    state.companion.lastTopicPromptAt = Date.now();
    saveSoon();
    say(isEN()
      ? `Last time you mentioned “${topic.text}”. How did that go?`
      : `上次你提到“${topic.text}”。后来怎么样了？`, {
      duration: 10000,
      hint: isEN() ? 'Continue from last time' : '接着上次的话题',
    });
    return;
  }
  const today = toDayKey();
  let line = greetingForHour(hour);
  if (previousSeenAt && Date.now() - previousSeenAt > 7 * 24 * 60 * 60000) {
    line = isEN()
      ? `It has been a while. The desk kept your place. ${line}`
      : `有一阵子没见了。桌边一直给你留着位置。${line}`;
  } else if (oldSeenDay && oldSeenDay !== today && daysTogether() > 1) {
    line = isEN()
      ? `Day ${daysTogether()}. The rain is still here, and so am I. ${line}`
      : `第 ${daysTogether()} 天。雨还在，我也还在。${line}`;
  }
  say(line, { duration: 9800 });
}

/* -------------------------------------------------------------------------- */
/* Main binding                                                               */
/* -------------------------------------------------------------------------- */

function bindStaticEvents() {
  $$('.tool-btn', els.dock).forEach((button) => {
    button.addEventListener('click', (event) => {
      const action = button.dataset.action;
      if (!action) return;
      ensureAudio();
      if (action === 'chat') {
        if (els.composer.hidden) openComposer();
        else closeComposer(true);
      } else if (action === 'focus') openPanel('focus');
      else if (action === 'game') startGame();
      else if (action === 'records') openPanel('memories');
      else if (action === 'checkin') openPanel('checkin');
      else if (action === 'more') {
        if (els.contextMenu.hidden) openMenu();
        else closeMenu();
      }
      resetIdle();
    });
  });

  els.menuToggle.addEventListener('click', () => toggleTools());
  els.clockClose.addEventListener('click', () => {
    setClockVisible(false, { announce: true });
    audio.tick();
  });

  els.bubbleClose.addEventListener('click', () => {
    hideBubble();
    closeComposer(false);
    audio.tick();
  });

  els.suitcase?.addEventListener('click', (event) => {
    event.stopPropagation();
    ensureAudio();
    summonGuest();
    resetIdle();
  });
  els.musicBox?.addEventListener('click', (event) => {
    event.stopPropagation();
    ensureAudio();
    openPanel('musicbox');
    resetIdle();
  });
  els.summonBackdrop?.addEventListener('click', () => hideSummonStage());
  els.summonClose?.addEventListener('click', () => hideSummonStage());
  els.summonDismiss?.addEventListener('click', () => hideSummonStage());
  els.summonAgain?.addEventListener('click', () => summonGuest());
  els.onboardingSkip?.addEventListener('click', () => {
    closeOnboarding();
    audio.tick();
  });
  els.onboardingNext?.addEventListener('click', () => {
    const steps = onboardingSteps();
    if (onboardingStepIndex >= steps.length - 1) {
      closeOnboarding();
    } else {
      onboardingStepIndex += 1;
      renderOnboarding();
    }
    audio.tick();
  });

  els.summonPortrait?.addEventListener('click', (event) => {
    event.stopPropagation();
    guestReaction();
  });
  els.summonPortrait?.addEventListener('pointermove', (event) => {
    if (!els.summonParallax) return;
    const rect = els.summonPortrait.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    els.summonParallax.style.transform = `translate3d(${x * 5}px, ${y * 4}px, 0)`;
  });
  els.summonPortrait?.addEventListener('pointerleave', () => {
    if (els.summonParallax) els.summonParallax.style.transform = '';
  });
  els.summonDossier?.addEventListener('click', () => {
    const guest = guestById(els.summonStage?.dataset.guest);
    if (!guest?.dossierId) return;
    hideSummonStage();
    dossierSelection = guest.dossierId;
    openPanel('dossier');
  });
  els.summonStage?.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  els.memoryRememberBtn?.addEventListener('click', () => saveMemoryCandidate());
  els.memoryEditBtn?.addEventListener('click', () => editMemoryCandidate());
  els.memoryForgetBtn?.addEventListener('click', () => {
    hideMemoryPrompt();
    audio.tick();
  });
  els.memoryPromptInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      saveMemoryCandidate();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      editMemoryCandidate();
    }
  });

  els.chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendChat();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      closeComposer(true);
    }
  });
  els.sendBtn.addEventListener('click', () => sendChat());

  els.composer.addEventListener('pointerdown', (event) => {
    event.stopPropagation();
    ensureAudio();
  });

  els.focusChip.addEventListener('click', () => {
    openPanel('focus');
    ensureAudio();
    audio.tick();
  });

  els.quickBar.addEventListener('click', (event) => {
    const action = event.target.closest('[data-quick-action]')?.dataset.quickAction;
    if (!action) return;
    ensureAudio();
    if (action === 'chat') {
      if (els.composer.hidden) openComposer();
      else closeComposer(true);
    } else if (action === 'focus') {
      openPanel('focus');
    } else if (action === 'game') {
      startGame();
    } else if (action === 'records') {
      openPanel('memories');
    } else if (action === 'checkin') {
      openPanel('checkin');
    }
  });

  els.gamePause.addEventListener('click', toggleGamePause);
  els.gameSound.addEventListener('click', toggleGameSound);
  els.gameStop.addEventListener('click', () => finishGame());
  els.gameAgain.addEventListener('click', () => {
    els.gameResult.hidden = true;
    startGame();
  });
  els.gameClose.addEventListener('click', () => {
    els.gameResult.hidden = true;
    updateDockActive();
    recalcMousePassthrough();
  });

  els.panelLayer.addEventListener('click', (event) => {
    if (event.target === els.panelLayer) closePanel();
  });

  els.panel.addEventListener('input', (event) => {
    if (event.target.id === 'archiveSearch') {
      archiveQuery = event.target.value;
      refreshArchiveList();
    }
    if (event.target.id === 'memorySearch') {
      memoryQuery = event.target.value;
      refreshMemoryPanel();
    }
  });

  els.panel.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    if (event.target.id === 'profileSearch') {
      event.preventDefault();
      archiveQuery = event.target.value.trim();
      openPanel('archive');
    } else if (event.target.id === 'memoryEditInput' && memoryEditingId) {
      event.preventDefault();
      saveEditedMemory(memoryEditingId);
    }
  });

  els.panel.addEventListener('click', (event) => {
    const target = event.target.closest('button');
    if (!target) return;
    if (target.closest('[data-panel-back]')) {
      goBackPanel();
      return;
    }
    if (target.hasAttribute('data-panel-close')) {
      closePanel();
      return;
    }
    if (target.hasAttribute('data-onboarding-replay')) {
      closePanel();
      openOnboarding({ force: true });
      return;
    }
    if (target.dataset.musicAction) {
      const action = target.dataset.musicAction;
      if (action === 'toggle') toggleMusic();
      else if (action === 'prev') setMusicTrack(musicTrackAt(-1), { autoplay: musicPlaying });
      else if (action === 'next') setMusicTrack(musicTrackAt(1), { autoplay: musicPlaying });
      else if (action === 'loop') {
        state.musicBox.loop = !state.musicBox.loop;
        musicAudio.loop = state.musicBox.loop;
        saveSoon();
        renderPanel('musicbox');
      }
      audio.tick();
      updateMusicProgress();
      return;
    }
    if (target.dataset.musicTrack) {
      const track = MUSIC_TRACKS.find((item) => item.id === target.dataset.musicTrack);
      if (track) setMusicTrack(track, { autoplay: musicPlaying });
      audio.tick();
      return;
    }
    if (target.dataset.musicSleep !== undefined) {
      setMusicSleep(Number(target.dataset.musicSleep));
      audio.tick();
      return;
    }
    if (target.dataset.focusMode) {
      setFocusMode(target.dataset.focusMode);
      audio.tick();
      return;
    }
    if (target.dataset.presetMinutes) {
      setFocusPreset(Number(target.dataset.presetMinutes));
      audio.tick();
      return;
    }
    if (target.dataset.focusAction === 'auto-next') {
      state.focus.autoNext = !state.focus.autoNext;
      saveSoon();
      renderPanel('focus');
      audio.tick();
      toast(isEN()
        ? `Auto-start next phase ${state.focus.autoNext ? 'on' : 'off'}.`
        : `自动进入下一段已${state.focus.autoNext ? '开启' : '关闭'}。`, 'info', 2200);
      return;
    }
    if (target.dataset.focusAction === 'reset-cycle') {
      resetFocusCycle();
      audio.tick();
      return;
    }
    if (target.dataset.focusAction === 'start') {
      if (state.focus.running) pauseFocus();
      else startFocusSession();
      audio.tick();
      return;
    }
    if (target.dataset.focusAction === 'reset') {
      resetFocus();
      audio.tick();
      return;
    }
    if (target.dataset.wardrobeFilter) {
      wardrobeFilter = target.dataset.wardrobeFilter;
      renderPanel('wardrobe');
      return;
    }
    if (target.dataset.wardrobePreset !== undefined) {
      useWardrobePreset(target.dataset.wardrobePreset);
      return;
    }
    if (target.dataset.wardrobePresetClear !== undefined) {
      clearWardrobePreset(target.dataset.wardrobePresetClear);
      return;
    }
    if (target.dataset.wardrobeItem) {
      const item = wardrobeItemById(target.dataset.wardrobeItem);
      wardrobeSelected = target.dataset.wardrobeItem;
      if (item && wardrobeProgress(item).unlocked) wardrobeTryOnItem(item.id);
      else renderPanel('wardrobe');
      return;
    }
    if (target.dataset.wardrobeTry) {
      wardrobeTryOnItem(target.dataset.wardrobeTry);
      return;
    }
    if (target.dataset.wardrobeApply !== undefined) {
      wardrobeApplyTryOn();
      return;
    }
    if (target.dataset.wardrobeRemove) {
      wardrobeRemoveSlot(target.dataset.wardrobeRemove);
      return;
    }
    if (target.dataset.wardrobeAction) {
      wardrobeItemAction(target.dataset.wardrobeAction);
      return;
    }
    if (target.dataset.wardrobeReset !== undefined) {
      wardrobeResetTryOn();
      return;
    }
    if (target.dataset.accessory) {
      toggleAccessory(target.dataset.accessory);
      return;
    }
    if (target.dataset.setting) {
      toggleSetting(target.dataset.setting);
      return;
    }
    if (target.dataset.petScale) {
      state.settings.petScale = Number(target.dataset.petScale) || 0.25;
      scene?.setPetScale(state.settings.petScale);
      syncPetHitbox();
      syncHitRegions();
      positionBubble();
      saveSoon();
      renderPanel('settings');
      return;
    }
    if (target.dataset.language) {
      const next = target.dataset.language === 'en' ? 'en' : 'zh';
      if (next === uiLang()) return;
      state.settings.language = next;
      saveNow();
      bridge.setLanguage?.(next);
      window.location.reload();
      return;
    }
    if (target.dataset.memorySelect) {
      selectMemory(target.dataset.memorySelect);
      return;
    }
    if (target.dataset.proactive) {
      state.settings.proactive = ['quiet', 'occasional', 'normal'].includes(target.dataset.proactive)
        ? target.dataset.proactive
        : 'normal';
      saveSoon();
      resetIdle();
      scheduleStretch();
      renderPanel('settings');
      return;
    }
    if (target.dataset.dossierOpen) {
      dossierSelection = target.dataset.dossierOpen;
      openPanel('dossier');
      return;
    }
    if (target.dataset.dossierSource) {
      bridge.openExternal?.(target.dataset.dossierSource);
      return;
    }
    if (target.dataset.dossierSpoilerToggle !== undefined) {
      const box = els.panel.querySelector('#dossierSpoilerContent');
      if (!box) return;
      box.hidden = !box.hidden;
      target.dataset.dossierSpoilerToggle = box.hidden ? '0' : '1';
      target.setAttribute('aria-expanded', String(!box.hidden));
      target.textContent = box.hidden
        ? (isEN() ? 'Show spoilers' : '显示剧透')
        : (isEN() ? 'Hide spoilers' : '收起剧透');
      return;
    }
    if (target.dataset.archiveMode) {
      archiveMode = target.dataset.archiveMode === 'npcs' ? 'npcs' : 'characters';
      archiveSelection = archiveItems()[0]?.id || null;
      renderPanel('archive');
      return;
    }
    if (target.dataset.archiveSource) {
      bridge.openExternal?.(target.dataset.archiveSource);
      return;
    }
    const archiveRow = target.closest('[data-archive-id]');
    if (archiveRow) {
      selectArchive(archiveRow.dataset.archiveId);
      return;
    }
    const memoryButton = target.closest('[data-memory]');
    if (memoryButton) {
      selectMemory(memoryButton.dataset.memory);
      return;
    }
    if (target.dataset.memoryEdit) {
      memoryEditingId = target.dataset.memoryEdit;
      renderPanel('settings');
      setTimeout(() => els.panel.querySelector('#memoryEditInput')?.focus(), 40);
      return;
    }
    if (target.dataset.memoryCancel) {
      memoryEditingId = null;
      renderPanel('settings');
      return;
    }
    if (target.dataset.memorySave) {
      saveEditedMemory(target.dataset.memorySave);
      return;
    }
    if (target.dataset.memoryDelete) {
      deleteMemory(target.dataset.memoryDelete);
      return;
    }
    if (target.dataset.memoryPin) {
      togglePinnedMemory(target.dataset.memoryPin);
      return;
    }
    if (target.dataset.summaryDelete) {
      deleteConversationSummary(target.dataset.summaryDelete);
      return;
    }
    if (target.dataset.guestView) {
      viewSummonGuest(target.dataset.guestView);
      return;
    }
    if (target.dataset.photoDelete !== undefined) {
      const id = target.dataset.photoDelete;
      state.photos = (Array.isArray(state.photos) ? state.photos : []).filter((photo) => photo.id !== id);
      if (state.companion.lastPhoto?.id === id) state.companion.lastPhoto = state.photos[0] || null;
      saveNow();
      renderPanel('photos');
      toast(isEN() ? 'Photo removed.' : '照片已删除。', 'info', 2400);
      return;
    }
    if (target.dataset.panelAction) {
      const action = target.dataset.panelAction;
      if (action === 'reset-position') {
        bridge.resetPosition();
        toast('回到屏幕右下角。', 'info', 2200);
        closePanel(true);
      } else if (action === 'hide') {
        closePanel(true);
        bridge.hide();
      } else if (action === 'test-sound') {
        ensureAudio().then(() => audio.chime('focus'));
      } else if (action === 'llm-save') {
        saveLlmSettings();
      } else if (action === 'llm-test') {
        saveLlmSettings({ test: true });
      } else if (action === 'llm-clear') {
        clearLlmKey();
      } else if (action === 'llm-help') {
        bridge.openExternal?.('https://platform.deepseek.com/api_keys');
      } else if (action === 'clear-companion') {
        clearCompanionMemory();
      } else if (action === 'clear-memories') {
        clearMemories();
      } else if (action === 'dialogue-eval') {
        runDialogueEval();
        openPanel('dialogue-eval');
      } else if (action === 'run-dialogue-eval') {
        runDialogueEval();
        renderPanel('dialogue-eval');
      } else if (action === 'checkin-claim') {
        claimDailyCheckin();
      } else if (action === 'checkin') {
        openPanel('checkin');
      } else if (action === 'clear-photos') {
        state.photos = [];
        state.companion.lastPhoto = null;
        saveNow();
        renderPanel('photos');
        toast(isEN() ? 'Photo album cleared.' : '照片册已清空。', 'info', 2600);
      } else if (action === 'quick-chat') {
        closePanel(true);
        openComposer();
      } else if (action === 'quick-focus') {
        openPanel('focus');
      } else if (action === 'quick-game') {
        closePanel(true);
        startGame();
      } else if (action === 'search-archive') {
        const input = els.panel.querySelector('#profileSearch');
        archiveQuery = input ? input.value.trim() : '';
        openPanel('archive');
      } else if (action === 'profile') {
        openPanel('profile');
      } else if (action === 'memories') {
        openPanel('memories');
      } else if (action === 'photos') {
        openPanel('photos');
      } else if (action === 'guests') {
        openPanel('guests');
      } else if (action === 'archive') {
        openPanel('archive');
      } else if (action === 'memory-random') {
        selectMemory(memorySelection || MEMORY_CHARACTERS[0].id, true);
      } else if (action === 'quit') {
        if (target.dataset.armed === '1') {
          bridge.quit();
          return;
        }
        target.dataset.armed = '1';
        target.textContent = '再点一次退出';
        target.classList.add('danger-btn');
        setTimeout(() => {
          if (target.isConnected) {
            target.dataset.armed = '0';
            target.textContent = '退出桌宠';
          }
        }, 3200);
      }
    }
  });

  els.panel.addEventListener('input', (event) => {
    if (event.target.id === 'focusTask') {
      state.focus.task = event.target.value;
      saveSoon();
    } else if (event.target.id === 'volumeSlider') {
      const volume = Number(event.target.value) / 100;
      state.settings.volume = volume;
      audio.setVolume(volume);
      const num = els.panel.querySelector('.volume-num');
      if (num) num.textContent = `${Math.round(volume * 100)}%`;
      saveSoon();
    } else if (event.target.id === 'musicVolume') {
      const volume = Math.max(0, Math.min(1, Number(event.target.value) / 100));
      state.musicBox.volume = volume;
      musicAudio.volume = volume;
      saveSoon();
    } else if (event.target.id === 'musicProgress') {
      if (Number.isFinite(musicAudio.duration) && musicAudio.duration > 0) {
        musicAudio.currentTime = (Number(event.target.value) / 1000) * musicAudio.duration;
        updateMusicProgress();
      }
    }
  });

  els.contextMenu.addEventListener('click', (event) => {
    const action = event.target.closest('[data-menu-action]')?.dataset.menuAction;
    if (action) handleMenuAction(action);
  });

  window.addEventListener('resize', () => {
    syncPetHitbox();
    positionPetUi();
    positionBubble();
    syncHitRegions();
  });
  setInterval(syncHitRegions, 120);

  els.chatInput.addEventListener('focus', () => {
    setIgnoreMouse(false);
  });

  window.addEventListener('keydown', handleKeydown);

  document.addEventListener('pointerdown', () => {
    ensureAudio();
    resetIdle();
  }, { once: true });

  document.addEventListener('pointerdown', () => {
    if (audio.started) audio.setEnabled(state.settings.sound);
  });

  bridge.onCommand((command) => {
    const type = typeof command === 'string' ? command : command?.type;
    if (!type) return;
    if (type === 'talk') {
      if (!bubbleVisible) say(pickLine('greetEvening').length ? greetingForHour() : pickLine('idle'), { duration: 7600 });
      else petAction('body');
    } else if (type === 'start-focus') {
      if (state.focus.running) openPanel('focus');
      else startFocusSession({ mode: 'focus', minutes: 25 });
    } else if (type === 'focus-tray') {
      if (command.action === 'toggle') {
        if (state.focus.running) pauseFocus();
        else startFocusSession();
      } else if (command.action === 'skip') {
        skipFocusPhase();
      } else if (command.action === 'open') {
        openPanel('focus');
      }
    } else if (type === 'start-game') {
      startGame();
    } else if (type === 'open-wardrobe') {
      openPanel('wardrobe');
    } else if (type === 'open-settings') {
      openPanel('settings');
    } else if (type === 'open-about') {
      openPanel('settings', { about: true });
    } else if (type === 'position-reset') {
      toast('位置已重置。', 'info', 2200);
    } else if (type === 'always-on-top-changed') {
      state.settings.alwaysOnTop = Boolean(command.value);
      saveSoon();
      if (panelName === 'settings') renderPanel('settings');
    } else if (type === 'startup-changed') {
      state.settings.autoStart = Boolean(command.value);
      saveSoon();
      if (panelName === 'settings') renderPanel('settings');
    }
  });

  window.addEventListener('beforeunload', saveNow);
}

function normalizeWardrobe() {
  const eq = { ...DEFAULT_WARDROBE, ...(state.wardrobe || {}) };
  for (const key of ['hat', 'coat', 'neck', 'face', 'held', 'case', 'outfit']) {
    if (!eq[key]) continue;
    if (!wardrobeItemById(eq[key])) {
      eq[key] = key === 'hat' ? 'hat' : null;
    }
  }
  state.wardrobe = eq;
  state.wardrobePresets = [0, 1, 2].map((index) => normalizeWardrobeLook(state.wardrobePresets?.[index]));
  state.checkin.streak = Math.max(0, Math.floor(Number(state.checkin.streak) || 0));
  state.checkin.total = Math.max(0, Math.floor(Number(state.checkin.total) || 0));
  state.checkin.lastClaimDay = String(state.checkin.lastClaimDay || '').slice(0, 10);
  state.checkin.history = (Array.isArray(state.checkin.history) ? state.checkin.history : []).slice(0, 30);
  state.checkin.milestones = (Array.isArray(state.checkin.milestones) ? state.checkin.milestones : [])
    .filter((entry) => entry && [7, 14, 28].includes(Number(entry.streak)))
    .slice(0, 3);
  state.checkin.lastReward = state.checkin.lastReward && typeof state.checkin.lastReward === 'object'
    ? {
      xp: Math.max(0, Math.floor(Number(state.checkin.lastReward.xp) || 0)),
      droplets: Math.max(0, Math.floor(Number(state.checkin.lastReward.droplets) || 0)),
      streak: Math.max(0, Math.floor(Number(state.checkin.lastReward.streak) || 0)),
    }
    : null;
  state.memories = normalizeMemories(state.memories);
  state.photos = (Array.isArray(state.photos) ? state.photos : [])
    .filter((photo) => photo && Number.isFinite(Number(photo.at)))
    .slice(0, 12)
    .map((photo, index) => ({
      id: photo.id || `photo-${photo.at}-${index}`,
      at: Number(photo.at),
      title: String(photo.title || '').slice(0, 80),
      look: normalizeWardrobeLook(photo.look) || wardrobeLookSnapshot(state.wardrobe),
    }));
  if (!state.photos.length && state.companion.lastPhoto?.at) {
    state.photos = [{
      id: `photo-${state.companion.lastPhoto.at}`,
      at: Number(state.companion.lastPhoto.at),
      title: String(state.companion.lastPhoto.title || '').slice(0, 80),
      look: normalizeWardrobeLook(state.companion.lastPhoto.look) || wardrobeLookSnapshot(state.wardrobe),
    }];
  }
}

function applySettingsToScene() {
  if (!scene) return;
  normalizeWardrobe();
  scene.setRain(portraitPreview ? false : Boolean(state.settings.rain));
  scene.setWardrobe?.(state.wardrobe || DEFAULT_WARDROBE);
  scene.setPetScale?.(state.settings.petScale ?? 0.25);
  syncPetHitbox();
  syncHitRegions();
  for (const item of ACCESSORIES) {
    const active = Boolean(state.accessories[item.id]) && itemUnlocked(item);
    scene.setAccessory(item.id, active);
    if (active !== state.accessories[item.id]) state.accessories[item.id] = active;
  }
  els.clockNote.hidden = !state.settings.showClock;
}

async function initRuntimeSettings() {
  try {
    runtime = await bridge.getRuntimeInfo();
  } catch {
    runtime = {};
  }
  if (runtime.startup !== undefined) state.settings.autoStart = Boolean(runtime.startup);
  if (runtime.alwaysOnTop !== undefined) state.settings.alwaysOnTop = Boolean(runtime.alwaysOnTop);
  if (runtime.compact !== undefined) {
    state.settings.compact = Boolean(runtime.compact);
    document.body.classList.toggle('compact', Boolean(runtime.compact));
    if (runtime.compact !== undefined) {
      setTimeout(() => scene?.resize(), 120);
    }
  }
  saveSoon();
}

function showLoading(isLoading) {
  if (isLoading) return;
  els.loading.classList.add('is-hidden');
  setTimeout(() => { els.loading.hidden = true; }, 330);
}

function showFatal(message) {
  els.loading.hidden = true;
  els.fatal.hidden = false;
  els.fatalText.textContent = message || '桌面场景没有成功启动。请稍后重试。';
}

async function ensureBundledFonts() {
  if (!document.fonts) return { ok: false, regular: false, medium: false };
  try {
    await Promise.all([
      document.fonts.load('400 16px "Source Han Serif SC"'),
      document.fonts.load('500 14px "Source Han Serif SC"'),
    ]);
    await document.fonts.ready;
    const regular = document.fonts.check('400 16px "Source Han Serif SC"');
    const medium = document.fonts.check('500 14px "Source Han Serif SC"');
    return { ok: regular && medium, regular, medium };
  } catch (error) {
    console.warn('[Vertin] font load failed', error);
    return { ok: false, regular: false, medium: false };
  }
}

async function boot() {
  hydrateIcons();
  const params = new URLSearchParams(window.location.search);
  const portraitMode = params.get('portrait') === '1';
  const previewView = params.get('view') || 'threequarter';
  portraitPreview = portraitMode;
  if (portraitMode) {
    document.body.classList.add('portrait-mode');
    document.body.classList.remove('compact');
  } else {
    document.body.classList.toggle('compact', Boolean(state.settings.compact));
  }
  bindStaticEvents();
  bindPointer();
  updateStatus();
  updateClock();
  saveSoon();
  setInterval(updateClock, 1000);
  updateCheckinBadge();
  setInterval(() => {
    updateCheckinBadge();
    if (panelName === 'checkin') renderPanel('checkin');
  }, 60000);
  els.clockNote.hidden = !state.settings.showClock;

  try {
    scene = new PetScene(els.canvas);
    window.__VERTIN_SCENE__ = scene;
    window.__VERTIN_READY__ = true;
    applySettingsToScene();
    syncHitRegions();
    if (portraitMode) {
      // clean, high-resolution character plate for the design review
      scene.pixelRatioTarget = 1.0;
      scene.setPreviewView(previewView);
      scene.setRain(false);
    }
  } catch (error) {
    console.error('[Vertin] scene failed to start', error);
    showFatal('桌面场景没有成功启动。请尝试重启桌宠。');
    return;
  }

  await initRuntimeSettings();
  await refreshLlmStatus();
  applySettingsToScene();
  checkUnlocks(false);
  restoreFocus();
  updateFocusChip();
  updateDockActive();
  updateStatus();
  hydrateIcons();

  const fontStatus = await ensureBundledFonts();
  window.__VERTIN_FONT_STATUS__ = fontStatus;
  if (!fontStatus.ok) console.warn('[Vertin] Source Han Serif SC failed to load', fontStatus);
  else console.log('[Vertin] Source Han Serif SC loaded', fontStatus);
  setTimeout(() => showLoading(false), 280);
  setTimeout(() => {
    if (maybeShowOnboarding()) return;
    if (!state.focus.running) scheduleGreeting();
    else if (!document.body.classList.contains('is-playing')) {
      toast('计时还在继续。', 'info', 2400);
    }
    maybeShowFirstHint();
  }, 1250);

  resetIdle();
  scheduleStretch();

  // Capture mode gets a stable, welcome-visible frame for documentation.
  if (runtime.capture) {
    clearTimeout(idleTimer);
    clearTimeout(stretchTimer);
    clearTimeout(idleActionTimer);
  }

  console.log('[Vertin] ready', {
    version: runtime.version,
    electron: runtime.electron,
    compact: state.settings.compact,
  });
  window.__VERTIN_DEBUG__ = {
    state,
    scene,
    audio,
    musicAudio,
    playMusic,
    pauseMusic,
    openPanel,
    closePanel,
    openComposer,
    closeComposer,
    startGame,
    finishGame,
    toggleGamePause,
    toggleGameSound,
    startFocusSession,
    pauseFocus,
    completeFocus,
    resetFocus,
    resetFocusCycle,
    startPauseFocus: () => (state.focus.running ? pauseFocus() : startFocusSession()),
    petAction,
    say,
    hideBubble,
    showMemoryPrompt,
    saveMemoryCandidate,
    capturePhoto,
    openOnboarding,
    closeOnboarding,
    runDialogueEval,
    llmContextFor,
    toast,
    renderPanel,
    updateStatus,
    setToolsOpen,
    openMenu,
    closeMenu,
    setClockVisible,
    positionBubble,
    getPanelName: () => panelName,
    getToolsOpen: () => toolsOpen,
  };
}

boot().catch((error) => {
  console.error('[Vertin] boot failed', error);
  showFatal(error?.message || '初始化失败。');
});
