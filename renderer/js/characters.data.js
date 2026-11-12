/**
 * Suitcase guests.
 *
 * Fan-written short introductions for the suitcase guests.
 * Character images are local transparent pixel renders supplied for this project.
 */

export const GUEST_CHARACTERS = [
  {
    id: 'sonetto',
    name: { zh: '十四行诗', en: 'Sonetto' },
    title: { zh: '第一防线学校的书记员', en: 'The Foundation’s careful student' },
    image: '../assets/characters/sonetto.png',
    accent: '#C77A58',
    dossierId: 'sonetto',
    line: {
      zh: '桌面很干净。她先把礼帽摆正，才肯坐下来。',
      en: 'The desk is clean. She straightens the hat first, then sits.',
    },
    reactions: [
      { zh: '她抬起眼，像在确认你有没有把话说完。', en: 'She looks up, as if checking whether you have finished.' },
      { zh: '帽檐下的视线停了一瞬，又移回桌面。', en: 'Her gaze rests under the brim for a moment, then returns to the desk.' },
    ],
  },
  {
    id: 'thirtyseven',
    name: { zh: '37', en: '37' },
    title: { zh: '阿派朗的入世者', en: 'The one who came down from Apeiron' },
    image: '../assets/characters/thirtyseven.png',
    accent: '#7D9BC9',
    dossierId: 'thirtyseven',
    line: {
      zh: '她数了数桌角的雨滴，说今天少了一颗。',
      en: 'She counts the raindrops at the corner of the desk and says one is missing today.',
    },
    reactions: [
      { zh: '她伸出手指，在空中点了一下，像在数一颗看不见的星。', en: 'She lifts a finger and taps the air, counting a star no one else can see.' },
      { zh: '她看着你，认真地等下一个问题。', en: 'She looks at you and waits, seriously, for the next question.' },
    ],
  },
  {
    id: 'voyager',
    name: { zh: '远旅', en: 'Voyager' },
    title: { zh: '星海的旅人', en: 'Traveler of the star sea' },
    image: '../assets/characters/voyager.png',
    accent: '#4A568C',
    dossierId: 'voyager',
    line: {
      zh: '她先听了一会儿窗外，才问这里能不能听见星星。',
      en: 'She listens to the window for a while, then asks whether stars can be heard here.',
    },
    reactions: [
      { zh: '她微微侧耳，像在听很远的地方。', en: 'She tilts her head slightly, listening to somewhere very far away.' },
      { zh: '一点星光从她袖口滑下来，很快不见了。', en: 'A fleck of starlight slips from her sleeve and disappears.' },
    ],
  },
  {
    id: 'isolde',
    name: { zh: '伊索尔德', en: 'Isolde' },
    title: { zh: '维也纳的歌剧演员', en: 'Opera singer of Vienna' },
    image: '../assets/characters/isolde.png',
    accent: '#3A3540',
    dossierId: 'isolde',
    line: {
      zh: '她把帽子摘下来，像把一场演出轻轻放在桌边。',
      en: 'She takes off her hat as if setting a performance gently beside the desk.',
    },
    reactions: [
      { zh: '她轻轻抬起帽檐，像谢幕前确认台下还有人。', en: 'She lifts the brim slightly, like checking for an audience before a curtain call.' },
      { zh: '她没有说话，只把目光停在你看她的地方。', en: 'She says nothing; her gaze simply rests where you are looking at her.' },
    ],
  },
  {
    id: 'lusijian',
    name: { zh: '鹭鸶剪', en: 'Lusijian' },
    title: { zh: '剪开雨幕的访客', en: 'Visitor who cuts through the rain' },
    image: '../assets/characters/lusijian.png',
    accent: '#8B2E3A',
    dossierId: 'lusijian',
    line: {
      zh: '她剪开一段雨，像剪开一封迟到的信。',
      en: 'She cuts through the rain as if opening a letter that arrived too late.',
    },
    reactions: [
      { zh: '她侧过脸，剪刀在袖口里轻轻碰了一声。', en: 'She turns her head; the scissors click softly inside her sleeve.' },
      { zh: '她把一截雨丝收进掌心，像收好一条红绳。', en: 'She gathers a thread of rain into her palm like a red cord.' },
    ],
  },
  {
    id: 'liangyue',
    name: { zh: '梁月', en: 'Liang Yue' },
    title: { zh: '旧戏台的守夜人', en: 'Night keeper of the old stage' },
    image: '../assets/characters/liangyue.png',
    accent: '#5A6B4E',
    dossierId: 'liangyue',
    line: {
      zh: '她把帽檐压低，说旧戏台今晚不开场。',
      en: 'She lowers the brim and says the old stage is closed tonight.',
    },
    reactions: [
      { zh: '她扶了扶斗笠，像在听戏台后面有没有人。', en: 'She adjusts her hat, listening for someone behind the stage.' },
      { zh: '一片绿叶从帽檐上落下来，她没有去接。', en: 'A green leaf slips from her brim; she lets it fall.' },
    ],
  },
  {
    id: 'blue-handkerchief',
    name: { zh: '蓝手帕', en: 'Blue Handkerchief' },
    title: { zh: '替人收好眼泪的旅人', en: 'Traveler who keeps tears safe' },
    image: '../assets/characters/blue-handkerchief.png',
    accent: '#8B7AB8',
    dossierId: 'blue-handkerchief',
    line: {
      zh: '蓝手帕叠得很整齐。她说这是替别人收好的。',
      en: 'The blue handkerchief is folded neatly. She says she keeps it for someone else.',
    },
    reactions: [
      { zh: '她把袖口抚平，像在整理一句没说完的话。', en: 'She smooths her cuff, tidying a sentence left unfinished.' },
      { zh: '她望了望窗外，把蓝手帕换到了更靠近心口的位置。', en: 'She glances outside and moves the blue handkerchief closer to her heart.' },
    ],
  },
  {
    id: 'rabbit-bag',
    name: { zh: '兔毛手袋', en: 'Medicine Pocket' },
    title: { zh: '箱底的软耳朵医生', en: 'Soft-eared doctor at the bottom of the case' },
    image: '../assets/characters/rabbit-bag.png',
    accent: '#D8A24A',
    dossierId: 'medicinepocket',
    line: {
      zh: '他先摸了摸箱底，才问这里有没有薄荷。',
      en: 'He checks the bottom of the case first, then asks whether there is mint.',
    },
    reactions: [
      { zh: '他的耳朵动了一下，像听见了很远的诊室铃声。', en: 'His ear twitches, as if hearing a clinic bell from far away.' },
      { zh: '他把袖口挽好，说坐诊之前要先把手暖热。', en: 'He rolls up his sleeves and says a doctor warms his hands first.' },
    ],
  },
  {
    id: 'angel-nana',
    name: { zh: '天使娜娜', en: 'Anjo Nala' },
    title: { zh: '带角的守护天使', en: 'Horned guardian angel' },
    image: '../assets/characters/angel-nana.png',
    accent: '#5A3A6E',
    dossierId: 'anjo',
    line: {
      zh: '她收起角，像把一段危险的旧约藏进袖子。',
      en: 'She folds her horns away like an old and dangerous pact.',
    },
    reactions: [
      { zh: '她垂下眼，角尖的金饰跟着轻轻晃了一下。', en: 'She lowers her eyes; the gold at her horns sways once.' },
      { zh: '她把裙摆理好，问这里的人是不是都睡得很晚。', en: 'She smooths her skirt and asks whether everyone here sleeps late.' },
    ],
  },
  {
    id: 'semmelweis',
    name: { zh: '塞梅尔维斯', en: 'Semmelweis' },
    title: { zh: '不喝红茶的血族医生', en: 'Vampire doctor who avoids black tea' },
    image: '../assets/characters/semmelweis.png',
    accent: '#8C2E2E',
    dossierId: 'semmelweis',
    line: {
      zh: '她没有点红茶，只要了一杯温水。',
      en: 'She orders warm water instead of black tea.',
    },
    reactions: [
      { zh: '她抬起红眼睛，像在确认你昨晚有没有好好睡觉。', en: 'She raises her red eyes, checking whether you slept properly last night.' },
      { zh: '她把袖口扣好，说医生不该把疲惫带给病人。', en: 'She fastens her cuff and says a doctor should not bring fatigue to a patient.' },
    ],
  },
  {
    id: 'lorentz',
    name: { zh: '洛伦兹蝴蝶', en: 'Lorentz Butterfly' },
    title: { zh: '在公式里振翅的蝴蝶', en: 'Butterfly beating its wings in an equation' },
    image: '../assets/characters/lorentz.png',
    accent: '#A08B6C',
    dossierId: 'lorentz',
    line: {
      zh: '她在桌角画了一只蝴蝶，翅膀停在同一道公式上。',
      en: 'She draws a butterfly in the corner; its wings rest on the same equation.',
    },
    reactions: [
      { zh: '她的视线落在空处，像在等一只蝴蝶飞回来。', en: 'Her gaze rests on nothing, as if waiting for a butterfly to return.' },
      { zh: '她用指尖敲了敲桌面，敲出一段很轻的节拍。', en: 'She taps the desk with one finger, a very light rhythm.' },
    ],
  },
  {
    id: 'marianne',
    name: { zh: '玛丽安娜', en: 'Marianne' },
    title: { zh: '把旧日别在领口的访客', en: 'Visitor with yesterday pinned to her collar' },
    image: '../assets/characters/marianne.png',
    accent: '#9B8C72',
    dossierId: 'marianne',
    line: {
      zh: '她把一枚旧别针放在桌上，说这样今天就不会走散。',
      en: 'She sets an old pin on the desk so today will not get lost.',
    },
    reactions: [
      { zh: '她碰了碰领口，像在确认那枚别针还在。', en: 'She touches her collar, checking that the pin is still there.' },
      { zh: '她没有笑，只把目光在你脸上多停了一小会儿。', en: 'She does not smile; her gaze simply stays on your face a little longer.' },
    ],
  },
  {
    id: 'charon',
    name: { zh: '卡戎', en: 'Charon' },
    title: { zh: '渡口的摆渡人', en: 'Ferryman of the crossing' },
    image: '../assets/characters/charon.png',
    accent: '#7A6E78',
    dossierId: 'charon',
    line: {
      zh: '船桨靠在箱边。她问这里是不是也有要渡过去的人。',
      en: 'An oar leans against the case. She asks whether anyone here needs ferrying.',
    },
    reactions: [
      { zh: '她侧耳听了听桌面，像在辨认水声的方向。', en: 'She listens to the desk, trying to place the sound of water.' },
      { zh: '她的头发遮住一只眼睛，另一只一直看着你。', en: 'Her hair covers one eye; the other stays on you.' },
    ],
  },
];

export function guestById(id) {
  return GUEST_CHARACTERS.find((guest) => guest.id === id) || null;
}
