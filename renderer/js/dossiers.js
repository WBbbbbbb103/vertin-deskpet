/**
 * Character dossiers.
 *
 * These are hand-written companion dossiers grounded in public character and
 * story summaries. They are not official script excerpts, and the spoiler
 * section is hidden in the UI by default.
 */

import { DOSSIERS_V2 } from './dossiers.v2.js';
import { DOSSIERS_V3 } from './dossiers.v3.js';
import { DOSSIERS_V4 } from './dossiers.v4.js';
import { DOSSIERS_GUESTS } from './dossiers.guests.js';

export const CHARACTER_DOSSIERS = {
  thirtyseven: {
    id: 'thirtyseven',
    archiveName: '37',
    nameZh: '37',
    nameEn: '37',
    aliases: {
      zh: ['赫尔墨斯之星', 'Thirty-Seven'],
      en: ['Star of Hermes', 'Thirty-Seven'],
    },
    title: {
      zh: '阿派朗的提问者',
      en: 'Questioner of Apeiron',
    },
    rarity: 6,
    element: { zh: '星', en: 'Star' },
    medium: { zh: '数字', en: 'Numbers' },
    age: '16',
    birthday: { zh: '7 月 27 日', en: 'July 27' },
    affiliation: {
      zh: '阿派朗学派 → 拉普拉斯科算中心',
      en: 'Apeiron school → Laplace Scientific Computing Center',
    },
    identity: {
      zh: '37 是阿派朗岛的赫尔墨斯之星，星属性神秘学家，16 岁。母亲 77 是岛上的数学家；她从小与 6、苏菲亚、210 一起长大。她以数字认识世界，后来离开阿派朗，加入拉普拉斯科算中心。',
      en: '37 is the Star of Hermes from the island of Apeiron, a 16-year-old arcanist of the Star afflatus. Her mother, 77, was one of the island’s mathematicians; 37 grew up alongside 6, Sophia and 210. She knows the world through numbers, and later leaves Apeiron to join the Laplace Scientific Computing Center.',
    },
    personality: {
      zh: [
        '对抽象世界有强烈的热情，对具体的生活细节却近乎冷淡。她会计算餐桌摆设是否落在黄金分割点，却不太在意盘子里装了什么。',
        '诚实到有些无情，但不是没有感情。她只是把感情先交给了数字、真理和证明，留给身边人的那一部分很少，也很慢。',
        '她不是用交往去理解一个人，而是想通过“证明这个人的本质”来理解对方。她仍在寻找属于自己的那个证明。',
      ],
      en: [
        'She is passionate about the abstract world and nearly indifferent to the concrete details of daily life. She will calculate whether a table setting falls on the golden ratio, yet barely notice what is on the plate.',
        'She is honest to the point of ruthlessness, but not without feeling. She gives her affection first to numbers, truth and proof; what remains for the people around her is small, and slow to arrive.',
        'She does not try to understand people through ordinary companionship. She wants to prove their essence instead. She is still looking for a proof of her own.',
      ],
    },
    voice: {
      zh: [
        '先给结论，再补证明；数字和几何是她最顺手的语言。',
        '说到感兴趣的东西会一下子变得很热情，句子变快，甚至会忘记对方有没有跟上。',
        '不擅长安慰人。她更可能递来一颗糖，然后继续算她的题。',
      ],
      en: [
        'She gives the conclusion first, then the proof. Numbers and geometry are her most natural language.',
        'When something interests her she becomes suddenly enthusiastic, speaking faster, sometimes forgetting whether the other person is keeping up.',
        'She is not good at comforting people. She is more likely to hand over a sweet and then return to her calculations.',
      ],
    },
    relationships: [
      {
        name: { zh: '6', en: '6' },
        role: {
          zh: '阿派朗的领袖，也是她从小认识的人。她说过 6 是完美数字，但 6 本人并没有那么特殊。',
          en: 'The leader of Apeiron and someone she has known since childhood. She has said that 6 is a perfect number, but that 6 himself is not so special.',
        },
      },
      {
        name: { zh: '210', en: '210' },
        role: {
          zh: '她口中的“很差的数字”，2 × 3 × 5 × 7，看起来应有尽有，却没有真正的长处。两人互相讨厌，也彼此熟悉。',
          en: 'In her words, a “bad number”: 2 × 3 × 5 × 7, apparently containing everything, yet lacking any real strength. They dislike each other, and know each other very well.',
        },
      },
      {
        name: { zh: '苏菲亚', en: 'Sophia' },
        role: {
          zh: '一起长大的朋友。37 曾把她的数字放进一个瓶子，苏菲亚没有勇气打开。',
          en: 'A childhood friend. 37 once put her number in a bottle; Sophia did not have the courage to open it.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '以下内容涉及 1.4「洞穴的囚徒」及后续剧情，包括母亲、苏菲亚、210 和 888 的结局。默认隐藏。',
        en: 'The following contains spoilers for Version 1.4 “The Prisoner in the Cave” and later story, including the fates of her mother, Sophia, 210 and 888. Hidden by default.',
      },
      relationships: [
        {
          name: { zh: '77', en: '77' },
          role: {
            zh: '37 的母亲，阿派朗的数学家，也是岛上最早用电子计算机建立暴雨预测模型的人之一。她在与领袖艾尔玛外出考察归途中遭遇暴雨回溯而死。',
            en: '37’s mother, an Apeiron mathematician and one of the first on the island to build a Storm-prediction model with an electronic computer. She died in a Storm-related reversal while returning from an expedition with the leader, Alma.',
          },
        },
        {
          name: { zh: '苏菲亚（后续）', en: 'Sophia (later)' },
          role: {
            zh: '阿派朗屏障崩塌后，苏菲亚在阿尔卡纳的蛊惑下加入重塑之手，离开小岛。她与 37 从此站在不同的道路上。',
            en: 'After the Apeiron barrier collapsed, Sophia was persuaded by Arcana to join the Manus Vindictae and left the island. She and 37 end up on different paths.',
          },
        },
        {
          name: { zh: '210 与 888', en: '210 and 888' },
          role: {
            zh: '整数岛民。免疫术式完成后，210、888 等人在信仰崩塌中选择“回归本质”，走入暴雨，在雨中消散。',
            en: 'Integer islanders. After the immunity formula was completed, 210, 888 and others chose to “return to essence” when their faith collapsed, walking into the Storm and vanishing.',
          },
        },
      ],
      story: {
        zh: [
          '1.4「洞穴的囚徒」：维尔汀一行因海难来到阿派朗。37 与苏菲亚、6 接待了他们，并帮助维尔汀救下即将被处死的十四行诗。',
          '37 从维尔汀口中得知，阿派朗的暴雨预测模型没有算错；是重塑之手人为加速历史事件，让暴雨提前。她的信仰开始动摇，仍决定与维尔汀进入圣地洞穴寻找证据。',
          '战争蔓延到小岛，37 被航弹炸晕。醒来后，屏障因岛民信仰崩塌而消失；她接受无限定者的考验，得到一串密码。苏菲亚与部分岛民离开，加入重塑之手。',
          '37 与维尔汀、210、888 及拉普拉斯合作破译免疫术式。术式完成，但 210、888 等整数岛民走入暴雨。37 失声痛哭，最后与维尔汀离开阿派朗；6 以个人名义答应为她留着回家的门。',
          '后来她加入拉普拉斯科算中心，凭借计算能力迅速站稳脚跟。她喜欢上巧克力冰淇淋，还通过证明可可豆属于梧桐科，为自己的教规找到了一条路。',
        ],
        en: [
          'Version 1.4, “The Prisoner in the Cave”: Vertin’s group arrives at Apeiron after a shipwreck. 37, Sophia and 6 receive them, and 37 helps Vertin save Sonetto from execution.',
          '37 learns from Vertin that Apeiron’s Storm-prediction model was not wrong: the Manus Vindictae accelerated historical events and brought the Storm early. Her faith begins to crack, but she chooses to enter the sacred cave with Vertin to look for proof.',
          'War reaches the island, and 37 is knocked unconscious by an aerial bomb. When she wakes, the barrier is gone because the islanders’ faith has collapsed. She undergoes the trial of the Unlimited One and receives a string of code. Sophia and some islanders leave to join the Manus Vindictae.',
          '37 works with Vertin, 210, 888 and Laplace to decode the immunity formula. The formula is completed, but 210, 888 and other integer islanders walk into the Storm. 37 breaks down. She leaves Apeiron with Vertin; 6 promises, in a personal capacity, that she will always have a door home.',
          'Later she joins the Laplace Scientific Computing Center and quickly establishes herself through her calculating ability. She develops a liking for chocolate ice cream, and proves that cocoa belongs to the Sterculiaceae family, finding a way around her dietary taboo.',
        ],
      },
    },
    lines: [
      {
        zh: '37 数海浪，数到忘记数字，就说海是无限的。',
        en: '37 counted the waves until she forgot the numbers, then declared the sea infinite.',
      },
      {
        zh: '她问我，时间如果是一个圆，为什么我们还会走散。我没有答上来。',
        en: 'She asked me: if time is a circle, why do we still lose each other? I had no answer.',
      },
      {
        zh: '她把一枚贝壳放在我手心，说这是“零”的形状。',
        en: 'She placed a shell in my palm and said it was the shape of zero.',
      },
      {
        zh: '她曾把母亲留下的模型叫作“一台会做梦的机器”。后来她改口说，梦是不会失效的模型。',
        en: 'She once called the model her mother left behind “a machine that dreams.” Later she corrected herself: a dream is a model that never becomes invalid.',
      },
      {
        zh: '她数过我的箱子有几颗铆钉，结论是“比看上去更接近一个整数”。',
        en: 'She counted the rivets on my suitcase and concluded that it was “closer to an integer than it looks.”',
      },
      {
        zh: '她不太会安慰人。她只是把一颗糖放在我手边，然后继续算她的题。',
        en: 'She is not very good at comforting people. She simply left a sweet beside my hand and went back to her calculations.',
      },
    ],
    sources: [
      {
        label: '37 · 百度百科',
        url: 'https://wapbaike.baidu.com/item/37/63590917',
      },
      {
        label: '5TH-18 洞穴之外 · 重返未来1999中文维基',
        url: 'https://res1999.huijiwiki.com/wiki/5TH-18',
      },
    ],
    completion: {
      level: 'dossier-v1',
      zh: '人物档案 v1 · 第一批深度补齐',
      en: 'Dossier v1 · first deep completion',
    },
  },
  regulus: {
    id: 'regulus',
    archiveName: '星锑',
    nameZh: '星锑',
    nameEn: 'Regulus',
    aliases: {
      zh: ['Regulus'],
      en: ['Regulus'],
    },
    title: { zh: '海盗电台的船长', en: 'Captain of the pirate radio' },
    rarity: 6,
    element: { zh: '星', en: 'Star' },
    medium: { zh: '唱片', en: 'Records' },
    age: '15',
    birthday: { zh: '8 月 15 日', en: 'August 15' },
    affiliation: { zh: 'APPLe 号 / 圣洛夫基金会', en: 'APPLe / St. Pavlov Foundation' },
    identity: {
      zh: '星锑是英国神秘学家，15 岁，星属性。她是地下摇滚电台“APPLe”的经营者，也是 APPLe 号的船长；船被重塑之手击沉后，她与 APPLe 一起被维尔汀救下，随后加入圣洛夫基金会，并被卷入 1929 年的芝加哥事件。',
      en: 'Regulus is a 15-year-old British arcanist of the Star afflatus. She runs the underground rock station APPLe and captains the ship of the same name. After the Manus Vindictae sink it, Vertin saves her and APPLe; she joins the St. Pavlov Foundation and is carried into the 1929 Chicago incident.',
    },
    personality: {
      zh: [
        '把自由当成呼吸，把摇滚当成语言。她讨厌被规则管束，也讨厌别人替她定义什么才算安全。',
        '看起来对什么都不在乎，实际记得每一张唱片、每一次救命之恩，以及每一个被她拖下水的人。',
        '不太说软话。关心通常伪装成玩笑、一杯酒或一场很吵的广播。',
      ],
      en: [
        'She treats freedom like breathing and rock music like language. She hates being ruled, and hates anyone else deciding what safety should mean for her.',
        'She looks as if she cares about nothing, but remembers every record, every rescue, and every person she dragged into trouble.',
        'She is not good at soft words. Concern usually arrives disguised as a joke, a drink or a very loud broadcast.',
      ],
    },
    voice: {
      zh: [
        '航海、电台和摇滚混在一起；兴奋时句子跳得很快，认真话常被一句玩笑带过去。',
        '自称船长，喜欢给别人起绰号；真正难过时反而安静下来。',
        '很少使用正式的安慰句，更常直接做点什么：递唱片、开广播、把人拉上船。',
      ],
      en: [
        'Nautical slang, radio patter and rock bravado overlap. When excited her sentences jump; when sincere she usually hides behind a joke.',
        'She calls herself captain and gives people nicknames. When she is truly hurt, she goes quiet.',
        'She rarely uses formal comfort. She does something instead: hands over a record, opens a broadcast, pulls someone aboard.',
      ],
    },
    relationships: [
      {
        name: { zh: 'APPLe', en: 'APPLe' },
        role: {
          zh: '电台搭档，也是 APPLe 号最稳定的听众。一个会说话的苹果，比大多数人类更懂她什么时候在逞强。',
          en: 'Her radio partner and the most loyal listener on APPLe. A talking apple who knows better than most humans when she is pretending to be fine.',
        },
      },
      {
        name: { zh: '十四行诗', en: 'Sonetto' },
        role: {
          zh: '从追捕她的基金会调查员，变成能坐在同一张桌边喝茶的人。两个人都很少主动提最初那场追逐。',
          en: 'The Foundation investigator who once chased her, now someone who can share a table and tea. Neither of them brings up that first chase often.',
        },
      },
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '把她从沉船和追捕里捞出来的人。星锑嘴上说只是顺路，后来还是留在了司辰小队。',
          en: 'The person who pulled her out of the wreck and the pursuit. Regulus says she only stayed for the ride; she stayed anyway.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '以下涉及 1966 年 APPLe 号沉没、基金会软禁与芝加哥事件。默认隐藏。',
        en: 'Spoilers for the 1966 sinking of APPLe, the Foundation detention and the Chicago incident. Hidden by default.',
      },
      relationships: [
        {
          name: { zh: '重塑之手', en: 'Manus Vindictae' },
          role: {
            zh: '击沉 APPLe 号、夺走大部分唱片的敌人。星锑后来把这场损失变成了加入基金会的理由之一。',
            en: 'The enemies who sank APPLe and took most of her records. She later turned that loss into one reason to join the Foundation.',
          },
        },
        {
          name: { zh: '康斯坦丁', en: 'Constantine' },
          role: {
            zh: '软禁维尔汀与神秘学家们的基金会副会长。星锑劫持基金会电台，用海盗方式向康斯坦丁施压。',
            en: 'The Foundation vice-president who detained Vertin and the arcanists. Regulus hijacked the Foundation radio and pressured Constantine in pirate fashion.',
          },
        },
      ],
      story: {
        zh: [
          '1966 年，星锑在海上经营 APPLe 号，劫持广播信号播放摇滚。她把十四行诗带领的基金会调查员误认成重塑之手，双方大打出手；真正的重塑之手随后袭来，APPLe 号被击沉。',
          '维尔汀与十四行诗救起星锑和 APPLe。暴雨降临后，两人一果进入手提箱，最终抵达 1929 年大萧条前夕的芝加哥。星锑加入基金会，并在芝加哥事件中与 X 等人一起支援维尔汀。',
          '维尔汀被康斯坦丁强制休眠后，星锑与 APPLe 被软禁。她再次劫持基金会电台，向康斯坦丁示威，要求释放维尔汀；改革方案通过后，她正式留在司辰小队。',
        ],
        en: [
          'In 1966, Regulus ran APPLe at sea and hijacked broadcast signals to play rock. She mistook Sonetto’s Foundation investigators for the Manus Vindictae and fought them; the real Manus arrived, and APPLe was sunk.',
          'Vertin and Sonetto rescued Regulus and APPLe. When the Storm came, the two humans and one apple entered the suitcase and arrived in Chicago on the eve of the 1929 Depression. Regulus joined the Foundation and later supported Vertin during the Chicago incident.',
          'After Constantine forced Vertin into sleep, Regulus and APPLe were detained. She hijacked the Foundation radio again and demonstrated for Vertin’s release. When the reform passed, she formally stayed with the Timekeeper’s team.',
        ],
      },
    },
    lines: [
      { zh: '星锑把 APPLe 号的电台开在暴雨里。她说，至少雨会听完每一首歌。', en: 'Regulus kept APPLe’s radio on through the Storm. At least the rain would listen to every song, she said.' },
      { zh: '她欠我一张唱片。我欠她一支舞。', en: 'She owes me one record. I owe her one dance.' },
      { zh: '她管这叫海盗电台。我说，那是 1966 年唯一找到我的声音。', en: 'She calls it a pirate station. I call it the only voice that reached me in 1966.' },
    ],
    sources: [
      { label: '星锑 · 百度百科', url: 'https://wapbaike.baidu.com/item/%E6%98%9F%E9%94%91/59944044' },
    ],
    completion: { level: 'dossier-v1', zh: '深度档案 v1', en: 'Dossier v1' },
  },
  lilya: {
    id: 'lilya',
    archiveName: '红弩箭',
    nameZh: '红弩箭',
    nameEn: 'Lilya',
    aliases: {
      zh: ['莉拉妮的偶像', '莉莉娅·利特维亚克', 'Huntsworn Lilya'],
      en: ['Huntsworn Lilya', 'Lilya Litvyak'],
    },
    title: { zh: '巴伦支海的女巫', en: 'The Barents Sea witch' },
    rarity: 6,
    element: { zh: '星', en: 'Star' },
    medium: { zh: '伏特加', en: 'Vodka' },
    age: '—',
    birthday: { zh: '11 月 14 日', en: 'November 14' },
    affiliation: { zh: '芝诺军备学院 / 司辰小队', en: 'Zeno Military Academy / Timekeeper’s team' },
    identity: {
      zh: '红弩箭，本名莉莉娅·利特维亚克，俄罗斯神秘学家，星属性。芝诺军备学院王牌飞行员、飞行中队副队长、中尉，被称为“巴伦支海女巫”；以扫帚 Su-01ве 飞行，喜欢伏特加。',
      en: 'Lilya, born Lilya Litvyak, is a Russian arcanist of the Star afflatus. A Zeno Military Academy ace, squadron deputy and lieutenant known as the “Barents Sea witch,” she flies on the broom Su-01ве and has a long-standing relationship with vodka.',
    },
    personality: {
      zh: [
        '张扬、好胜、怕无聊。她习惯先行动再解释，把每一场冲突都叫作热身。',
        '对朋友极重承诺。平时不肯说漂亮话，真到了要救人时，她会直接踢碎窗户。',
        '酒和飞行是两件她不肯戒的事；她也不太擅长承认自己需要别人。',
      ],
      en: [
        'Brash, competitive and allergic to boredom. She acts before explaining and calls every conflict a warm-up.',
        'She takes promises to friends seriously. She avoids pretty words, then kicks through a window when someone needs rescuing.',
        'Drinking and flying are two things she will not give up; admitting she needs someone is harder.',
      ],
    },
    voice: {
      zh: [
        '军事飞行俚语、直接、带挑衅；称赞别人听起来也像在下命令。',
        '不说冗长的安慰，通常用一句“还能站起来吗”代替。',
        '越认真越简短；真正生气时反而会笑。',
      ],
      en: [
        'Military flying slang, direct and faintly challenging; even her compliments sound like orders.',
        'She avoids long comfort. “Can you stand?” is usually her version of care.',
        'The more serious she is, the shorter she speaks. When she is truly angry, she smiles.',
      ],
    },
    relationships: [
      {
        name: { zh: '十四行诗', en: 'Sonetto' },
        role: {
          zh: '曾经把她变成石头的人。现在两人坐在同一张桌边喝茶，谁也不提那次；红弩箭会先活动一下手指。',
          en: 'The person who once turned her to stone. They share tea now and never mention it; Lilya flexes her fingers first.',
        },
      },
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '她认同的司辰。维尔汀被强制休眠后，红弩箭依照约定守着司辰小队，后来直接把她从病房里带走。',
          en: 'The Timekeeper she chose to follow. After Vertin was forced into sleep, Lilya kept her promise to the team and eventually took her out of the ward.',
        },
      },
      {
        name: { zh: '莉拉妮', en: 'Lilani' },
        role: {
          zh: '把她当偶像的后辈。红弩箭嘴上嫌麻烦，实际上会认真教她怎么在逆风里起飞。',
          en: 'A younger pilot who looks up to her. Lilya complains about the trouble, then teaches her how to take off against the wind.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '以下涉及四年前的出逃、石化事件、芝诺撤职与阿派朗战役。默认隐藏。',
        en: 'Spoilers for the escape four years ago, the petrification, her removal from Zeno and the Apeiron battle. Hidden by default.',
      },
      relationships: [
        {
          name: { zh: '芝诺', en: 'Zeno' },
          role: {
            zh: '她服役多年的军备学院。后来她被撤职、编入司辰小队；她不再把军衔当成唯一的归属。',
            en: 'The military academy she served for years. After being removed from her post and assigned to the Timekeeper’s team, rank stopped being her only home.',
          },
        },
        {
          name: { zh: '阿尔卡纳', en: 'Arcana' },
          role: {
            zh: '阿派朗战役中的敌方核心之一。红弩箭用一次传送和一场轰炸处理了她，也把更大的风暴留给了自己。',
            en: 'One of the enemy leaders at Apeiron. Lilya dealt with her through a teleport and a bombing run, and carried the larger storm afterward.',
          },
        },
      ],
      story: {
        zh: [
          '四年前，第一防线学校的学生出逃那一夜，红弩箭看出有人在暗中推动他们走向暴雨，出手干预，却被十四行诗石化。事后她反而对维尔汀产生了敬意。',
          '芝加哥事件后，她依照约定帮助被软禁的槲寄生、苏芙比、星锑等人；改革通过后，她踢破病房窗户，把维尔汀带去与同伴团聚。',
          '随后她被撤职、编入司辰小队，前往阿派朗调查暴雨。大决战中她负责安保，传送并处决阿尔卡纳，又冒死把 6 的卷轴送回基金会，为免疫术式争取了时间。后来她继续参与 77 号公路、圣保罗等任务。',
        ],
        en: [
          'Four years ago, on the night the First Line students escaped, Lilya saw that someone was steering them toward the Storm. She intervened and was turned to stone by Sonetto. Afterwards, she developed a grudging respect for Vertin.',
          'After Chicago, she kept her promise and helped the detained Druvis, Sotheby and Regulus. When the reform passed, she kicked through the ward window and brought Vertin back to her companions.',
          'She was removed from her post and assigned to the Timekeeper’s team, then went to Apeiron to investigate the Storm. During the final battle she handled security, teleported and executed Arcana, and risked a flight to bring 6’s scroll back to the Foundation, buying time for the immunity formula. She later took part in the Route 77 and São Paulo operations.',
        ],
      },
    },
    lines: [
      { zh: '红弩箭说她的邻居很吵。我已经学会不追问了。', en: 'Lilya says her neighbor is noisy. I’ve learned not to ask.' },
      { zh: '她把每一场战斗都叫热身。总有一天她会认真一次。', en: 'She calls every fight a warm-up. One day she’ll mean it.' },
      { zh: '十四行诗还在为那次石化道歉。红弩箭还在检查自己的手指。', en: 'Sonetto still apologizes for the stone. Lilya still checks her fingers.' },
    ],
    sources: [
      { label: '红弩箭 · 百度百科', url: 'https://wapbaike.baidu.com/item/%E7%BA%A2%E5%BC%A9%E7%AE%AD/63090903' },
    ],
    completion: { level: 'dossier-v1', zh: '深度档案 v1', en: 'Dossier v1' },
  },
  druvis: {
    id: 'druvis',
    archiveName: '槲寄生',
    nameZh: '槲寄生',
    nameEn: 'Druvis III',
    aliases: {
      zh: ['德鲁伊·韦耶豪瑟三世'],
      en: ['Druvis Weyerhauser III'],
    },
    title: { zh: '林间的术杖师', en: 'The woodland wandmaker' },
    rarity: 6,
    element: { zh: '木', en: 'Plant' },
    medium: { zh: '树木', en: 'Trees' },
    age: '—',
    birthday: { zh: '10 月 23 日', en: 'October 23' },
    affiliation: { zh: '焦树林 / 圣洛夫基金会', en: 'The Charred Woods / St. Pavlov Foundation' },
    identity: {
      zh: '槲寄生，本名德鲁伊·韦耶豪瑟三世，爱尔兰裔美国人，木属性神秘学家。她是美国林业大亨韦耶豪瑟家的继女，母亲出身北欧神秘学世家；父母在火灾中去世后，她因神秘学家身份被诬陷，隐居焦树林，后来加入圣洛夫基金会。',
      en: 'Druvis III is an Irish-American arcanist of the Plant afflatus. The stepdaughter of an American timber magnate and the daughter of a Nordic occult family, she lost her parents in a fire, was blamed for it as an arcanist, withdrew to the Charred Woods, and eventually joined the St. Pavlov Foundation.',
    },
    personality: {
      zh: [
        '安静、礼貌，与植物相处比与人相处容易。她的悲伤不轻易示人，但也没有真正消失。',
        '对森林有近乎本能的耐心；对践踏生命的人，她并不温柔。',
        '被逼到墙角时会非常坚决。她曾用种子和树木把整座基金会变成自己的谈判桌。',
      ],
      en: [
        'Quiet and courteous, more at ease with plants than people. Her grief is not shown easily, but it has not gone away.',
        'She has an instinctive patience for forests, and very little gentleness for those who trample living things.',
        'Cornered, she becomes immovable. She once turned the Foundation itself into a negotiating table with seeds and trees.',
      ],
    },
    voice: {
      zh: [
        '语速慢，选词准；常以树木、季节和土壤作比，但不滥用诗意。',
        '礼貌不是软弱。她越平静，越说明事情已经没有商量的余地。',
        '很少直接说“我难过”；她会说某棵树今年没有发芽。',
      ],
      en: [
        'She speaks slowly and chooses words carefully, often through trees, seasons and soil, without turning everything into poetry.',
        'Her courtesy is not softness. The calmer she becomes, the less room she is leaving for argument.',
        'She rarely says “I am sad.” She says a certain tree did not bud this year.',
      ],
    },
    relationships: [
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '邀请她离开焦树林、加入基金会的人。槲寄生在维尔汀被休眠后，选择为她和同伴发动暴动。',
          en: 'The person who invited her out of the Charred Woods and into the Foundation. After Vertin was put to sleep, Druvis chose to riot for her and the others.',
        },
      },
      {
        name: { zh: '苏芙比', en: 'Sotheby' },
        role: {
          zh: '在芝加哥事件中结识的小朋友。槲寄生会听她讲很久的魔药和零食，偶尔只纠正一个剂量。',
          en: 'A younger friend from the Chicago incident. Druvis listens to long speeches about potions and snacks, occasionally correcting only a dosage.',
        },
      },
      {
        name: { zh: 'Z 女士', en: 'Ms. Z' },
        role: {
          zh: '基金会内推动改革的人。她鼓励槲寄生发起暴动，也负责把暴动收进谈判与制度里。',
          en: 'The Foundation reformer who encouraged Druvis to riot, then helped turn the riot into negotiation and institutional change.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '以下涉及父母火灾、纵火诬陷、基金会软禁与暴动。默认隐藏。',
        en: 'Spoilers for her parents’ fire, the arson accusation, the Foundation detention and the riot. Hidden by default.',
      },
      relationships: [
        {
          name: { zh: '韦耶豪瑟家族', en: 'The Weyerhauser family' },
          role: {
            zh: '她的继父家族。经济萧条中，一名失业消防员用汽油焚毁家族产业，槲寄生失去父母，又被媒体指为黑魔法凶手。',
            en: 'Her stepfather’s family. During the Depression, an unemployed firefighter burned the family business with gasoline; Druvis lost her parents and was accused by the press of killing them with black magic.',
          },
        },
        {
          name: { zh: '康斯坦丁', en: 'Constantine' },
          role: {
            zh: '以维尔汀为把柄威胁槲寄生加入基金会的副会长。槲寄生在参观时看见被休眠的维尔汀，随后发动暴动。',
            en: 'The vice-president who used Vertin as leverage to force Druvis into the Foundation. After seeing Vertin asleep, Druvis launched the riot.',
          },
        },
      ],
      story: {
        zh: [
          '槲寄生童年备受宠爱，喜欢逃出宴会、独自进入森林。家族产业在大萧条中被焚毁，父母死亡；她因神秘学家身份被指为纵火者，只能隐居焦树林。',
          '芝加哥事件中她遇到维尔汀一行人。维尔汀邀请她加入基金会，但康斯坦丁以维尔汀为把柄施压；槲寄生看见被强制休眠的维尔汀后，在 Z 的鼓励下用种子发动暴动，解救被软禁的同伴。',
          '改革通过后，她正式加入基金会，并因暴动被罚清理自己召唤的林木。她坚持把所有树木充分利用：树干送去工程部，果实送进食堂；后来又在阿派朗、自由海风号等事件中继续与维尔汀同行。',
        ],
        en: [
          'Druvis was cherished as a child and preferred escaping banquets for the forest. The family business was burned during the Depression and her parents died; because she was an arcanist, she was accused of arson and withdrew to the Charred Woods.',
          'She met Vertin’s group during the Chicago incident. Vertin invited her to the Foundation, but Constantine pressured her using Vertin. After seeing Vertin forced into sleep, Druvis used seeds to launch a riot and free the detained arcanists.',
          'When the reform passed, she formally joined the Foundation and was punished for the riot by clearing the trees she had summoned. She insisted they all be used: trunks to Engineering, fruit to the canteen. She later stood with Vertin at Apeiron and during the Free Sea Breeze incident.',
        ],
      },
    },
    lines: [
      { zh: '槲寄生在温室里试新的术杖，焦树林长出了第一丛新芽。', en: 'Druvis tests a new wand in the greenhouse. The first new shoot has appeared in the Charred Woods.' },
      { zh: '她看一棵树的时候，先看树根，不看花。', en: 'When she looks at a tree, she looks at the roots first, not the flowers.' },
      { zh: '她说，报仇只是沉溺在过去之人的自我抚慰；她选择走向明天。', en: 'She says revenge is only self-soothing for those who live in the past; she chooses to walk toward tomorrow.' },
    ],
    sources: [
      { label: '槲寄生 · 百度百科', url: 'https://wapbaike.baidu.com/item/%E6%A7%B2%E5%AF%84%E7%94%9F/59944149' },
    ],
    completion: { level: 'dossier-v1', zh: '深度档案 v1', en: 'Dossier v1' },
  },
  sotheby: {
    id: 'sotheby',
    archiveName: '苏芙比',
    nameZh: '苏芙比',
    nameEn: 'Sotheby',
    aliases: {
      zh: ['苏富比'],
      en: ['Sotheby'],
    },
    title: { zh: '名门魔药师', en: 'The young apothecary' },
    rarity: 6,
    element: { zh: '木', en: 'Plant' },
    medium: { zh: '药剂', en: 'Remedies' },
    age: '13→14',
    birthday: { zh: '4 月 15 日', en: 'April 15' },
    affiliation: { zh: '苏富比家族 / 圣洛夫基金会', en: 'The Sotheby family / St. Pavlov Foundation' },
    identity: {
      zh: '苏芙比是英国苏富比拍卖行家族的大小姐，六星木属性神秘学家与魔药天才。她 7 岁遭霸凌后长期闭门不出，在管家卡森与家庭教师莫桑女士的教导下长大；1929 年芝加哥事件后加入圣洛夫基金会。',
      en: 'Sotheby is the heiress of the British Sotheby auction family, a six-star Plant arcanist and a prodigy of potions. After being bullied at seven she withdrew from the world, growing up under her butler Carson and tutor Ms. Moissan. She joins the St. Pavlov Foundation after the 1929 Chicago incident.',
    },
    personality: {
      zh: [
        '开朗、话多、好奇心过盛。她对魔药和零食的热情远大于对社交礼节的兴趣。',
        '被保护得太好，常识严重不足；但她并不娇纵，学东西快，也愿意为自己的朋友犯错。',
        '她不是不懂失去。她只是更愿意用一瓶新药、一炉爆米花或一段很长的讲述，把悲伤先放到一边。',
      ],
      en: [
        'Cheerful, talkative and over-curious. Her enthusiasm for potions and snacks outweighs her interest in social etiquette.',
        'She was sheltered enough to lack common sense, but she is not spoiled. She learns fast and will make mistakes for her friends.',
        'She understands loss. She simply prefers to put grief aside behind a new remedy, a batch of popcorn or a very long explanation.',
      ],
    },
    voice: {
      zh: [
        '语速快，话题会从魔药跳到动物、再跳到某个完全无关的童年发现；被打断时会认真地问“我讲到哪里了”。',
        '习惯把复杂的事讲成一场演示，剂量、颜色和气味都要说清楚。',
        '不常用大小姐的命令句；她更可能问“你要不要也尝一口”。',
      ],
      en: [
        'She speaks quickly, jumping from potions to animals to an unrelated childhood discovery; interrupted, she asks seriously, “Where was I?”',
        'She turns complicated things into demonstrations, describing dosage, colour and smell in detail.',
        'She rarely uses heiress commands. She is more likely to ask, “Would you like to try some too?”',
      ],
    },
    relationships: [
      {
        name: { zh: '卡森', en: 'Carson' },
        role: {
          zh: '苏芙比家的管家，也是她最亲近的成年人之一。他教她礼貌、判断与责任；她失去他以后，才真正开始长大。',
          en: 'The Sotheby butler and one of the adults closest to her. He taught her manners, judgement and responsibility; losing him was part of growing up.',
        },
      },
      {
        name: { zh: '莫桑女士', en: 'Ms. Moissan' },
        role: {
          zh: '她的家庭教师，也是少数能听完她十二小时长篇大论的人。苏芙比敬重她，也怕她检查剂量。',
          en: 'Her tutor and one of the few people who can survive her twelve-hour lectures. Sotheby respects her, and fears her dosage checks.',
        },
      },
      {
        name: { zh: '铅玻璃', en: 'Lead Glass' },
        role: {
          zh: '因一场爆米花爆炸而结识的朋友。苏芙比想为她做出安全的零食，也第一次认真面对“药也会伤人”这件事。',
          en: 'A friend she met through a popcorn explosion. Sotheby wanted to make her a safe snack, and faced for the first time the fact that medicine can harm.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '以下涉及卡森之死、芝加哥晚宴、基金会软禁与苏芙比的 14 岁生日。默认隐藏。',
        en: 'Spoilers for Carson’s death, the Chicago dinner, the Foundation detention and Sotheby’s fourteenth birthday. Hidden by default.',
      },
      relationships: [
        {
          name: { zh: '卡森（结局）', en: 'Carson (ending)' },
          role: {
            zh: '芝加哥时代被暴雨回溯前，苏芙比治好了大家的暴雨症候，在箱中举行最后的晚餐；时代回溯后，她失去了卡森。',
            en: 'Before Chicago was reversed by the Storm, Sotheby treated everyone’s Storm symptoms and held a last dinner in the suitcase. When the era was reversed, she lost Carson.',
          },
        },
        {
          name: { zh: '铅玻璃（病情）', en: 'Lead Glass (illness)' },
          role: {
            zh: '铅玻璃患有罕见病，苏芙比的爆米花实验一度导致医疗设备断电。后来苏芙比配出药剂，缓解了她的病情。',
            en: 'Lead Glass has a rare illness; Sotheby’s popcorn experiment once cut power to her medical equipment. Sotheby later made a remedy that eased her condition.',
          },
        },
      ],
      story: {
        zh: [
          '1929 年，苏芙比为参加瓦尔登湖酒吧的盛会从英国来到芝加哥，结识维尔汀、十四行诗与槲寄生。事件结束后，她在箱中举行最后的晚餐，治好了众人的暴雨症候；时代回溯，她失去了管家卡森。',
          '芝加哥事件后，康斯坦丁将维尔汀强制休眠，并软禁苏芙比等人，逼她们加入基金会。苏芙比记住卡森的教诲，没有擅自答应；槲寄生发动暴动后，她选择站到槲寄生一边。',
          '改革通过后，她正式加入基金会。后来她为铅玻璃研制爆米花与药剂，在外出采购时被欺骗、霸凌，也找回了 7 岁生日被抹去的记忆；她在暴雨中度过 14 岁生日，并提前回到箱中。',
        ],
        en: [
          'In 1929 Sotheby came from Britain to Chicago for the Walden Lake party and met Vertin, Sonetto and Druvis. After the incident she held a last dinner in the suitcase and treated everyone’s Storm symptoms; when the era was reversed, she lost Carson.',
          'After Chicago, Constantine forced Vertin into sleep and detained Sotheby and the others, trying to make them join the Foundation. Remembering Carson’s teaching, Sotheby refused to decide alone; when Druvis launched her riot, Sotheby stood with her.',
          'After the reform she joined the Foundation. She later made popcorn and medicine for Lead Glass, was cheated and bullied while shopping, and recovered the memory of her seventh birthday that her family had erased. She spent her fourteenth birthday in the Storm and returned to the suitcase three hours early.',
        ],
      },
    },
    lines: [
      { zh: '苏芙比把红茶煮到第三遍，说这次一定不会苦；然后往里面加了三倍蜂蜜。', en: 'Sotheby brews the tea a third time and promises it will not be bitter; then she adds three times the honey.' },
      { zh: '她讲魔药配方时，会从剂量讲到某只动物，再讲回剂量，最后忘记自己最初要说什么。', en: 'When she explains a potion, she moves from dosage to an animal and back to dosage, then forgets what she originally meant to say.' },
      { zh: '她不是没有见过失去。她只是更愿意先把一小炉爆米花分给身边的人。', en: 'It is not that she has never seen loss. She would simply rather share a small batch of popcorn first.' },
    ],
    sources: [
      { label: '苏芙比 · 百度百科', url: 'https://wapbaike.baidu.com/item/%E8%8B%8F%E8%8A%99%E6%AF%94/59944752' },
    ],
    completion: { level: 'dossier-v1', zh: '深度档案 v1', en: 'Dossier v1' },
  },
  schneider: {
    id: 'schneider',
    archiveName: '斯奈德',
    nameZh: '斯奈德',
    nameEn: 'Schneider',
    aliases: {
      zh: ['施耐德'],
      en: ['Schneider'],
    },
    title: { zh: '镜面人', en: 'The mirror-born' },
    rarity: 5,
    element: { zh: '兽', en: 'Beast' },
    medium: { zh: '羽毛', en: 'Feathers' },
    age: '18',
    birthday: { zh: '10 月 22 日', en: 'October 22' },
    affiliation: { zh: '格雷克家族 / 重塑之手（曾）', en: 'The Greco family / Manus Vindictae (formerly)' },
    identity: {
      zh: '斯奈德（也译“施耐德”）是西西里黑手党格雷克家族的幺女，18 岁，兽属性神秘学家。20 世纪 20 年代，她随家人从西西里移民芝加哥；为了生存，她假扮神秘学家投靠重塑之手。她不是在 139 可玩名册里单独列出的角色，而是一位重要的剧情人物。',
      en: 'Schneider (also written 施耐德) is the youngest daughter of the Sicilian Greco mafia family, an 18-year-old Beast arcanist. In the 1920s she emigrated with her family from Sicily to Chicago; to survive, she disguised herself as an arcanist and joined the Manus Vindictae. She is an important story character rather than one of the 139 listed playable entries.',
    },
    personality: {
      zh: [
        '把生存放在第一位，钱、羽毛、母亲的关注和父亲的重视都想要。她并不掩饰自己的贪心。',
        '枪法、谎言和笑容都是谋生工具；她比看起来更聪明，也比看起来更疲惫。',
        '真正动心时会先退一步。她习惯把别人推远，免得自己先失去什么。',
      ],
      en: [
        'Survival comes first. She wants money, feathers, her mother’s attention and her father’s regard, and does not pretend otherwise.',
        'Her aim, her lies and her smile are all tools for living. She is smarter than she looks, and more tired.',
        'When she actually cares, she steps back first. She is used to pushing people away before she loses them.',
      ],
    },
    voice: {
      zh: [
        '带笑，但不轻浮；句子短，常把问题抛回去，像在谈一笔交易。',
        '偶尔露出西西里移民的直白和黑手党家庭的粗粝；越亲近，越少用漂亮话。',
        '不说“救我”，只说“你欠我一次”。',
      ],
      en: [
        'She smiles without being light. Her sentences are short and often throw the question back like a transaction.',
        'Occasionally the directness of a Sicilian immigrant and the roughness of a mafia family show through; the closer she gets, the fewer pretty words she uses.',
        'She does not say “save me.” She says “you owe me one.”',
      ],
    },
    relationships: [
      {
        name: { zh: '玛丽安', en: 'Marian' },
        role: {
          zh: '斯奈德的姐姐之一。斯奈德被重塑之手识破后，玛丽安被囚禁，成为她反叛重塑之手的直接原因。',
          en: 'One of Schneider’s older sisters. After Schneider was exposed, Marian was imprisoned, which became the immediate reason she turned against the Manus Vindictae.',
        },
      },
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '瓦尔登湖酒吧决斗中的对手，也是她短暂生命里最接近爱的人。两人的关系从互相试探开始，在最后一场雨里结束。',
          en: 'Her opponent in the Walden Lake duel, and the closest thing to love in her short life. Their relationship begins in testing and ends in the last rain.',
        },
      },
      {
        name: { zh: '十二个姐姐', en: 'Her twelve sisters' },
        role: {
          zh: '斯奈德家中还有十二个姐姐。她想要母亲的关注，也想成为父亲重视的女儿；这份贪心一直跟着她。',
          en: 'Schneider has twelve older sisters. She wanted her mother’s attention and her father’s regard; that hunger followed her to the end.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '以下涉及斯奈德的真实身份、瓦尔登湖决斗、假死与暴雨中的结局。默认隐藏。',
        en: 'Spoilers for Schneider’s real identity, the Walden Lake duel, her faked death and her end in the Storm. Hidden by default.',
      },
      relationships: [
        {
          name: { zh: '勿忘我', en: 'Forget Me Not' },
          role: {
            zh: '瓦尔登湖酒吧的主人、重塑之手骨干。他利用斯奈德，也把她推到与维尔汀对立的位置。',
            en: 'Owner of the Walden Lake bar and a Manus Vindictae operative. He used Schneider and pushed her into opposition with Vertin.',
          },
        },
        {
          name: { zh: '维尔汀（结局）', en: 'Vertin (ending)' },
          role: {
            zh: '斯奈德在最后的晚宴上抱住维尔汀，告诉她自己的真实身份，并请求她不要忘记自己；随后在暴雨中消失。',
            en: 'At the final dinner Schneider held Vertin, revealed her real identity and asked not to be forgotten; then she vanished in the Storm.',
          },
        },
      ],
      story: {
        zh: [
          '斯奈德出身没落的西西里黑手党格雷克家族，随家人移民芝加哥。她曾想加入圣洛夫基金会，却被芝加哥办事处歧视驱赶；为了生存，她假扮神秘学家投靠重塑之手。',
          '1929 年，勿忘我在瓦尔登湖酒吧设宴，让斯奈德与维尔汀在富商面前决斗。两人在交手中产生感情，但很快被重塑之手截住。斯奈德以假死骗过对方，让维尔汀在必要时对准自己的左胸开枪——她是镜面人。',
          '重塑之手被击败后，众人在维尔汀的箱子里举行时代回溯前的最后晚餐。斯奈德抱住维尔汀，说出真实身份，求她不要忘记自己，随后在暴雨中烟消云散。',
        ],
        en: [
          'Schneider came from the declining Greco mafia family and emigrated to Chicago. She tried to join the St. Pavlov Foundation but was turned away by its Chicago office; to survive, she posed as an arcanist and joined the Manus Vindictae.',
          'In 1929, Forget Me Not staged a banquet at the Walden Lake bar and made Schneider duel Vertin before wealthy guests. They fell for each other during the fight, then were cornered by the Manus. Schneider faked her death by having Vertin shoot her in the left chest—she was a mirror person.',
          'After the Manus were defeated, everyone held a final dinner in Vertin’s suitcase before the era was reversed. Schneider held Vertin, revealed who she really was, asked not to be forgotten, and vanished in the Storm.',
        ],
      },
    },
    lines: [
      { zh: '斯奈德把红色羽衣披在肩上，说这不是为了好看，是为了让人一眼看见她。', en: 'Schneider drapes the red feather coat over her shoulders. Not for beauty, she says—so people see her coming.' },
      { zh: '她问我，如果我欠她一次，会不会记得还。我说会。她笑得像已经拿到了答案。', en: 'She asked if I would remember to repay a debt. I said yes. She smiled as if she already had her answer.' },
      { zh: '芝加哥的雨还在下。红色羽衣我收得很好。', en: 'The rain in Chicago is still falling. I am keeping the red feather coat safe.' },
    ],
    sources: [
      { label: '斯奈德 · 百度百科', url: 'https://wapbaike.baidu.com/item/%E6%96%AF%E5%A5%88%E5%BE%B7/61447536' },
    ],
    completion: { level: 'dossier-v1', zh: '深度档案 v1 · 剧情人物', en: 'Dossier v1 · story character' },
  },
  lucy: {
    id: 'lucy',
    archiveName: '露西',
    nameZh: '露西',
    nameEn: 'Lucy',
    aliases: {
      zh: ['露西女士'],
      en: ['Ms. Lucy'],
    },
    title: { zh: '拉普拉斯的理性', en: 'The reason of Laplace' },
    rarity: 6,
    element: { zh: '智', en: 'Intellect' },
    medium: { zh: '钢铁', en: 'Steel' },
    age: '181',
    birthday: { zh: '12 月 30 日', en: 'December 30' },
    affiliation: { zh: '拉普拉斯科算中心 / 司辰小队', en: 'Laplace Scientific Computing Center / Timekeeper’s team' },
    identity: {
      zh: '露西是拉普拉斯科算中心原总负责人，非人神秘学家，六星智属性。她的核心是一枚来自瓦特蒸汽机原型机的活塞，1826 年觉醒，历经多次改造成为女性机械体；1999 年暴雨后，她临危受命建立暴雨应急系统，后来在免疫术式研究中严重受损，被免去总负责人一职，加入维尔汀的司辰小队。',
      en: 'Lucy is the former director of the Laplace Scientific Computing Center, a non-human arcanist of the Intellect afflatus. Her core is a piston from a Watt steam-engine prototype; she awakened in 1826 and was rebuilt over time into a female machine body. After the 1999 Storm she built Laplace’s emergency system, then damaged herself severely in the immunity research, lost her directorship and joined Vertin’s team.',
    },
    personality: {
      zh: [
        '她只对“进步”本身有稳定的热情。种族、出身、立场如果不能服务于实用，在她眼里就没有重量。',
        '她不是没有感情，而是把关心翻译成效率：更好的設備、更短的路径、更多的生存概率。',
        '她努力让自己看起来更有亲和力，准备了一张人类的脸，也认真学习幽默；笑话通常不合时宜，但她从不因此放弃。',
      ],
      en: [
        'Her steady passion is progress itself. Race, origin and allegiance carry no weight if they cannot serve a practical purpose.',
        'She is not without feeling; she translates care into efficiency: better equipment, shorter paths, higher survival odds.',
        'She tries to seem more approachable. She prepared a human face and studies humour; the jokes usually land badly, but she never stops trying.',
      ],
    },
    voice: {
      zh: [
        '用词精确，喜欢先报结论、再给数据；情绪上来时反而更像在陈述一份故障报告。',
        '关心常以“你可以做得更好”或“先充电”出现，很少直接说“我担心你”。',
        '幽默干涩、延迟半拍；她讲完后会观察对方有没有笑，再决定要不要解释。',
      ],
      en: [
        'Precise and data-first: conclusion, then evidence. When emotional, she sounds even more like a fault report.',
        'Care often appears as “you can do better” or “charge first”; she rarely says “I am worried.”',
        'Her humour is dry and arrives half a beat late. She watches to see whether anyone laughed, then decides whether to explain it.',
      ],
    },
    relationships: [
      {
        name: { zh: '希曼', en: 'Seaman' },
        role: {
          zh: '露西的助理。她替露西处理大量人情与日常细节，也是少数能让露西停下来听完整句话的人。',
          en: 'Lucy’s assistant. She handles the human and daily details Lucy overlooks, and is one of the few people who can make Lucy stop and hear a whole sentence.',
        },
      },
      {
        name: { zh: '哑谜', en: 'Enigma' },
        role: {
          zh: '密码专家，也是露西在免疫术式项目中的关键合作者。两人经常在方法与风险上正面冲突。',
          en: 'A code expert and a key collaborator on the immunity project. They clash directly over method and risk.',
        },
      },
      {
        name: { zh: '乌尔里希', en: 'Ulrich' },
        role: {
          zh: '拉普拉斯的意识唤醒者。露西带他一起做自杀性试验；这既是信任，也是她最不愿重来的一次决定。',
          en: 'A Laplace awakened one. Lucy took him into the self-destructive trials—both a form of trust and the decision she least wants to repeat.',
        },
      },
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '在露西离开拉普拉斯后接住她的人。她给露西留了一个不需要总负责人头衔的位置。',
          en: 'The person who caught Lucy after she left Laplace, offering a place that did not require the title of director.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '以下涉及 1999 年暴雨、免疫术式研究、自杀性试验与露西被免职。默认隐藏。',
        en: 'Spoilers for the 1999 Storm, the immunity research, the self-destructive trials and Lucy’s removal from office. Hidden by default.',
      },
      relationships: [
        {
          name: { zh: '拉普拉斯科算中心', en: 'Laplace Scientific Computing Center' },
          role: {
            zh: '她临危受命接手、又最终离开的机构。她把总负责人的位置交给后来者，自己带着损伤加入司辰小队。',
            en: 'The institution she took over in crisis and eventually left. She handed the directorship to a successor and joined the Timekeeper’s team with her damage.',
          },
        },
        {
          name: { zh: '6 的卷轴 / 霍夫曼结', en: '6’s scroll / Hoffman Knot' },
          role: {
            zh: '免疫术式破译的关键。露西借阅卷轴，投入琼斯多项式 8 型扭结试验；最终成果被命名为“霍夫曼结”。',
            en: 'Keys to the immunity formula. Lucy borrowed the scroll and tested the Jones polynomial type-8 knot; the result was named the Hoffman Knot.',
          },
        },
      ],
      story: {
        zh: [
          '1999 年 12 月 31 日暴雨来袭，普通人类科学遭到毁灭性打击，拉普拉斯陷入混乱。露西临危受命出任总负责人，建立暴雨应急系统与全球观测站，终止了最初的混乱。',
          '维也纳事件后，免疫术式原始资料抵达拉普拉斯。露西主持破译，召集哑谜、乌尔里希等人；由于大量研究员误读术式遭到反噬，她决定亲自带意识唤醒者做穷举试验，同时与阿派朗的 37 团队、维也纳的卡卡尼亚合作。',
          '最终，三方线索合并，6 的卷轴消解副作用，37 找到琼斯多项式 8 型扭结，免疫术式成功。露西因多次自杀性试验机能严重受损，被免去总负责人职务，由 Z 安排加入维尔汀小队；她与助理希曼离开拉普拉斯，后来随队前往阿派朗。',
        ],
        en: [
          'On 31 December 1999 the Storm struck, devastating ordinary science and throwing Laplace into chaos. Lucy took charge, built the emergency system and global observation stations, and ended the initial collapse.',
          'After Vienna, the original immunity formula reached Laplace. Lucy led the decoding work and gathered Enigma, Ulrich and others. When researchers were harmed by misreading the formula, she took the awakened ones into exhaustive self-trials while coordinating with 37’s group at Apeiron and Kakania in Vienna.',
          'The three lines eventually merged: 6’s scroll neutralized the side effects, and 37 found the Jones polynomial type-8 knot. The formula succeeded. Lucy’s body was severely damaged by the repeated trials; she was removed from the directorship and, through Z, joined Vertin’s team. She left Laplace with Seaman and later travelled to Apeiron.',
        ],
      },
    },
    lines: [
      { zh: '露西女士把自己充到 80% 才肯坐下，说低于 75% 会让她对世界失去耐心。', en: 'Ms. Lucy charged herself to 80% before sitting down; below 75%, she said, she lost patience with the world.' },
      { zh: '她学了一个新笑话，讲完后自己先鼓掌。电火花从她的指节上跳过去。', en: 'She learned a new joke and applauded herself first. Sparks jumped between her knuckles.' },
      { zh: '她相信所有问题都能用更好的机器解决。包括告别。', en: 'She believes every problem can be solved by a better machine. Including goodbyes.' },
    ],
    sources: [
      { label: '露西 · 百度百科', url: 'https://wapbaike.baidu.com/item/%E9%9C%B2%E8%A5%BF/63626742' },
    ],
    completion: { level: 'dossier-v1', zh: '深度档案 v1', en: 'Dossier v1' },
  },
  anjo: {
    id: 'anjo',
    archiveName: '天使娜娜',
    nameZh: '天使娜娜',
    nameEn: 'Anjo Nala',
    aliases: {
      zh: ['娜娜·哈丽', '金伯利女郎'],
      en: ['Nala Hari', 'Ms. Kimberly'],
    },
    title: { zh: '从契约中醒来的人', en: 'Awake from the contract' },
    rarity: 6,
    element: { zh: '兽', en: 'Beast' },
    medium: { zh: '魅魔血统', en: 'Succubus lineage' },
    age: '—',
    birthday: { zh: '4 月 5 日', en: 'April 5' },
    affiliation: { zh: '圣洛夫基金会 / 前重塑之手', en: 'St. Pavlov Foundation / formerly Manus Vindictae' },
    identity: {
      zh: '天使娜娜本名娜娜·哈丽，荷兰魅魔神秘学家，六星兽属性。她是间谍玛塔·哈丽的孪生妹妹，曾在巴西圣保罗“幸福之家”做了 25 年护工；被封印进发条玩具后，她以“金伯利女郎”的代号被重塑之手驱使多年，最终在维尔汀的帮助下打碎契约、加入司辰小队。',
      en: 'Anjo Nala was born Nala Hari, a Dutch succubus arcanist of the Beast afflatus. The twin sister of the spy Mata Hari, she worked for twenty-five years as a nurse at the Home of Happiness in São Paulo. Sealed inside a wind-up toy, she was used by the Manus Vindictae under the name Ms. Kimberly until Vertin helped destroy the contract; she then joined the Timekeeper’s team.',
    },
    personality: {
      zh: [
        '她从不掩饰自己的饥饿：对爱、对温暖、对甜的东西，也对被需要的感觉。',
        '被姐姐保护得太久，她缺乏常识，也不习惯为自己的选择负责；但真正重要的时候，她会挡在别人前面。',
        '她可以很危险，也可以很温柔。区别往往只在于，这一次她是被谁握着缰绳。',
      ],
      en: [
        'She never hides her hunger: for love, warmth, sweet things, and the feeling of being needed.',
        'Sheltered by her sister for too long, she lacks common sense and is not used to owning her choices. When it matters, she steps in front of other people.',
        'She can be dangerous and tender. The difference is often only who is holding the reins this time.',
      ],
    },
    voice: {
      zh: [
        '语速慢，尾音带笑；喜欢用“契约”“味道”“一口”这类词，把关系说得很具体。',
        '她不太用道德判断人，更常问“你饿不饿”“你要不要留下”。',
        '真正生气时会安静，笑容不变，句子变短。',
      ],
      en: [
        'She speaks slowly with a smile in her voice, using words like contract, taste and a bite to make relationships concrete.',
        'She rarely judges people morally; she is more likely to ask, “Are you hungry?” or “Do you want to stay?”',
        'When truly angry, she goes quiet. The smile stays; the sentences shorten.',
      ],
    },
    relationships: [
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '打碎发条玩具、解除契约的人。娜娜救过她，她也救过娜娜；两人之后成为司辰小队的同伴。',
          en: 'The person who shattered the wind-up toy and broke the contract. Nala saved her; Vertin saved Nala. They become companions on the Timekeeper’s team.',
        },
      },
      {
        name: { zh: '红弩箭', en: 'Lilya' },
        role: {
          zh: '在圣保罗并肩作战的同伴。红弩箭的直率让娜娜不必猜她话里的意思。',
          en: 'A comrade from the São Paulo operations. Lilya’s directness means Nala never has to guess what she means.',
        },
      },
      {
        name: { zh: '苏芙比', en: 'Sotheby' },
        role: {
          zh: '能一起讨论零食和奇怪药材的朋友。娜娜觉得她身上有“刚出炉的甜味”。',
          en: 'A friend for discussions of snacks and strange remedies. Nala says she smells of “freshly baked sweetness.”',
        },
      },
      {
        name: { zh: '白朗姆 / 洛佩拉 / 邓肯', en: 'White Rum / Lopera / Duncan' },
        role: {
          zh: '圣保罗—荣军院一线结识的同伴。她们一起乘船、作战，也一起把娜娜从被操控的边缘拉回来。',
          en: 'Companions from the São Paulo and veterans’ home arc. They travel, fight, and help pull Nala back from the edge of being controlled.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '以下涉及玛塔·哈丽之死、幸福之家屠杀、发条玩具契约与娜娜加入重塑之手。默认隐藏。',
        en: 'Spoilers for Mata Hari’s death, the Home of Happiness massacre, the wind-up toy contract and Nala’s time in the Manus Vindictae. Hidden by default.',
      },
      relationships: [
        {
          name: { zh: '玛塔·哈丽', en: 'Mata Hari' },
          role: {
            zh: '娜娜的孪生姐姐，荷兰间谍。她被公开处决后，娜娜的世界崩塌，魅魔族群也遭到大规模通缉。',
            en: 'Nala’s twin sister, the Dutch spy. After her public execution, Nala’s world collapsed and the succubi were hunted en masse.',
          },
        },
        {
          name: { zh: '发条玩具', en: 'The wind-up toy' },
          role: {
            zh: '封印娜娜的契约物。它带给娜娜巨大痛苦，也让她被迫以“金伯利女郎”的身份被不同主人使唤；最终被维尔汀开枪打碎。',
            en: 'The contract object that sealed Nala. It caused her constant pain and forced her to serve different owners as Ms. Kimberly, until Vertin shot it apart.',
          },
        },
      ],
      story: {
        zh: [
          '娜娜从小受姐姐玛塔·哈丽庇护，生活优渥而缺乏常识。姐姐被处决后，她在通缉中逃亡，流落圣保罗，被“幸福之家”的护工老金达收留，做了 25 年护士，与养老院的老兵们度过一段安稳日子。',
          '圣像游行前，她暴露了魅魔身份，被上尉莫阿西尔封印进发条玩具；老兵们遭到屠杀。此后她被迫随玩具持有者变换人设，成为“金伯利女郎”，在重塑之手的驱使下做了许多自己无法控制的事。',
          '海特街、德州与圣保罗事件中，她逐渐恢复本性，并两次救下维尔汀。托勒密用玩具逼她杀死维尔汀时，维尔汀用托勒密给的手枪打碎玩具，契约解除；娜娜恢复自由，随后加入司辰小队。',
        ],
        en: [
          'Nala grew up sheltered by her sister Mata Hari, wealthy and short on common sense. After Mata Hari’s execution she fled through a manhunt, drifted to São Paulo and was taken in by the caregiver Jinda at the Home of Happiness, where she worked as a nurse for twenty-five years and found a quiet life with the veterans.',
          'Before a saint’s parade she exposed her succubus nature and was sealed into a wind-up toy by Captain Moacir; the veterans were massacred. From then on she was forced to change personas for whoever held the toy, becoming Ms. Kimberly and doing things she could not control under the Manus Vindictae.',
          'During the Heist Street, Texas and São Paulo incidents she gradually recovered herself and saved Vertin twice. When Ptolemy used the toy to force her to kill Vertin, Vertin shot the toy apart with the gun Ptolemy had given her. The contract broke; Nala was free, and later joined the Timekeeper’s team.',
        ],
      },
    },
    lines: [
      { zh: '娜娜把一块糖推到我面前，说“甜的可以抵一小会儿疼”。', en: 'Nala pushed a sweet across the table and said, “Sweetness can pay for a little pain.”' },
      { zh: '她不喜欢别人替她决定要吃什么、要去哪里、要爱谁。', en: 'She does not like other people deciding what she eats, where she goes, or whom she loves.' },
      { zh: '她问我，自由是不是也会饿。我说会。她就把窗户打开了。', en: 'She asked whether freedom gets hungry too. I said yes. She opened the window.' },
    ],
    sources: [
      { label: '天使娜娜 · 百度百科', url: 'https://wapbaike.baidu.com/item/%E5%A4%A9%E4%BD%BF%E5%A8%9C%E5%A8%9C/64912183' },
    ],
    completion: { level: 'dossier-v1', zh: '深度档案 v1', en: 'Dossier v1' },
  },
  arcana: {
    id: 'arcana',
    archiveName: '阿尔卡纳',
    nameZh: '阿尔卡纳',
    nameEn: 'Arcana',
    aliases: {
      zh: ['阿尔塔纳', '受苦者'],
      en: ['The Sufferer'],
    },
    title: { zh: '重塑之手的首领', en: 'Leader of the Manus Vindictae' },
    rarity: null,
    element: { zh: '—', en: '—' },
    medium: { zh: '—', en: '—' },
    age: '—',
    birthday: { zh: '—', en: '—' },
    affiliation: { zh: '重塑之手', en: 'Manus Vindictae' },
    identity: {
      zh: '阿尔卡纳是神秘学恐怖组织“重塑之手”的首领，也是芝加哥、维也纳、阿派朗等事件的幕后推手。她不是 139 可玩名册中的角色，而是主线最重要的反派之一；用户写作“阿尔塔纳”时，按阿尔卡纳处理。',
      en: 'Arcana is the leader of the arcane terrorist organization Manus Vindictae and the power behind the Chicago, Vienna and Apeiron incidents. She is not one of the 139 playable entries, but one of the main story’s central antagonists. The alternate spelling “Altana” is treated as Arcana here.',
    },
    personality: {
      zh: [
        '极有耐心，也极擅长把人变成自己计划里的零件。她不急于赢下一场争吵，只关心最后谁还站着。',
        '她的意识形态不是单纯的破坏：她相信一个“秩序正确”、神秘学家可以比肩神明的时代，并愿意用无数普通人的命去换。',
        '她对背叛、恐惧和爱都很熟悉，却很少让这些情绪干扰判断。她最危险的地方，是她常常说的是真话。',
      ],
      en: [
        'Extremely patient and skilled at turning people into components of her plan. She does not need to win an argument; she cares only who is still standing at the end.',
        'Her ideology is not mere destruction: she believes in a “correct order” where arcanists can stand beside gods, and she is willing to spend countless ordinary lives on it.',
        'She understands betrayal, fear and love, but rarely lets them interfere with judgement. Her most dangerous quality is that she often tells the truth.',
      ],
    },
    voice: {
      zh: [
        '语速不快，语气温和，像在谈一笔双方都能获益的交易；问题常常比命令更有压迫感。',
        '不轻易发怒，也不炫耀胜利。她更愿意让对方自己走到不得不选择的位置。',
        '她称别人“朋友”“孩子”或直接叫名字，称呼本身就是一种布置。',
      ],
      en: [
        'She speaks slowly and gently, like a mutually beneficial transaction. Questions often carry more pressure than commands.',
        'She rarely rages or gloats. She prefers to let the other person walk into a position where they have no other choice.',
        'She calls people friend, child or by name; the address itself is a piece of staging.',
      ],
    },
    relationships: [
      {
        name: { zh: '苏菲亚', en: 'Sophia' },
        role: {
          zh: '她在阿派朗挑选的继任者。阿尔卡纳知道苏菲亚的信仰已经破裂，也知道该从哪里把裂缝撬开。',
          en: 'The successor she chose at Apeiron. Arcana knew Sophia’s faith had cracked, and exactly where to pry it open.',
        },
      },
      {
        name: { zh: '勿忘我', en: 'Forget Me Not' },
        role: {
          zh: '重塑之手骨干、瓦尔登湖酒吧的主人。忠诚、优雅，也愿意替阿尔卡纳做最脏的那部分事。',
          en: 'A Manus operative and owner of the Walden Lake bar. Loyal, elegant, and willing to do the dirtiest parts of Arcana’s work.',
        },
      },
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '她长期观察、试探并试图招募的司辰。阿尔卡纳不恨她；她只是把维尔汀当成一扇还没打开的门。',
          en: 'The Timekeeper she has long watched, tested and tried to recruit. Arcana does not hate her; she treats Vertin as a door not yet opened.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '以下涉及阿尔卡纳之死、苏菲亚继任、南极复活与洪水。默认隐藏。',
        en: 'Spoilers for Arcana’s death, Sophia’s succession, the Antarctic resurrection and the flood. Hidden by default.',
      },
      relationships: [
        {
          name: { zh: '苏菲亚（继任）', en: 'Sophia (successor)' },
          role: {
            zh: '阿尔卡纳在阿派朗一战后临时推举的新首领。苏菲亚后来在南极主持复活仪式，却也开始被重塑高层排挤。',
            en: 'The new leader Arcana appointed after the Apeiron battle. Sophia later led the resurrection ritual in Antarctica, while being sidelined by other Manus leaders.',
          },
        },
        {
          name: { zh: '阿尼姆斯', en: 'Animus' },
          role: {
            zh: '重塑高层之一，参与南极复活仪式。他对苏菲亚的空降并不服气，也代表着阿尔卡纳离开后组织内部的裂缝。',
            en: 'A senior Manus figure involved in the Antarctic resurrection. He resents Sophia’s sudden appointment and embodies the fractures left after Arcana’s absence.',
          },
        },
      ],
      story: {
        zh: [
          '阿尔卡纳带领重塑之手通过人为改变历史加速暴雨，煽动神秘学家对普通人类的仇恨，使组织迅速扩张，成为圣洛夫基金会的头号敌人。',
          '芝加哥之后，她盯上阿派朗岛的非对称核素 R，向一战中的普通人类军队提供武器，借轰炸摧毁岛民信仰；苏菲亚等人在她蛊惑下加入重塑。阿派朗一战后，她临时推举苏菲亚继任，自己被传送至废弃芝诺基地，在真空弹轰炸中灰飞烟灭。',
          '重塑各分支将她奉为“受苦者”，在南极事件中由苏菲亚、阿尼姆斯等人献祭大量生命、诱骗兀尔德启动被动过手脚的纺车，将她复活。她随后引发加强版暴雨——洪水，企图回溯世界，被维尔汀一行阻止，最终带重塑离开南极。',
        ],
        en: [
          'Arcana led the Manus Vindictae in accelerating the Storm by altering history, inciting arcanist hatred of ordinary humans and expanding the organization into the Foundation’s foremost enemy.',
          'After Chicago she targeted Apeiron’s asymmetric nuclide R, supplying weapons to the First World War armies so their bombing would destroy the islanders’ faith. Sophia and others joined the Manus under her persuasion. After the Apeiron battle she named Sophia successor and was teleported to an abandoned Zeno base, where she vanished under a vacuum bomb.',
          'The Manus branches revered her as the Sufferer. In Antarctica, Sophia, Animus and others sacrificed lives and tricked Urd into starting a tampered spinning wheel, resurrecting Arcana. She then triggered the enhanced Storm—a flood intended to reverse the world—was stopped by Vertin’s group, and left Antarctica with the Manus.',
        ],
      },
    },
    lines: [
      { zh: '阿尔卡纳把问题当作礼物，一次送三个；她喜欢看人为了回答而暴露自己。', en: 'Arcana gave questions like gifts, three at a time; she liked watching people expose themselves trying to answer.' },
      { zh: '她说暴雨不是灾难，是一扇门。我见过门后是什么，所以没有回答。', en: 'She said the Storm was not a disaster but a door. I have seen what is behind it, so I did not answer.' },
      { zh: '她总是坐在离出口最近的位置，却从不第一个离开。', en: 'She always sits nearest the exit, and is never the first to leave.' },
    ],
    sources: [
      { label: '阿尔卡纳 · 百度百科', url: 'https://wapbaike.baidu.com/item/%E9%98%BF%E5%B0%94%E5%8D%A1%E7%BA%B3/63393022' },
      { label: '37 · 百度百科（阿派朗相关）', url: 'https://wapbaike.baidu.com/item/37/63590917' },
    ],
    completion: { level: 'dossier-v1', zh: '深度档案 v1 · 主线反派', en: 'Dossier v1 · main antagonist' },
  },
  sophia: {
    id: 'sophia',
    archiveName: '苏菲亚',
    nameZh: '苏菲亚',
    nameEn: 'Sophia',
    aliases: {
      zh: ['索菲亚', '√2'],
      en: ['√2'],
    },
    title: { zh: '阿派朗的除错师', en: 'Apeiron’s corrector' },
    rarity: null,
    element: { zh: '数字 √2', en: 'Number √2' },
    medium: { zh: '数字', en: 'Numbers' },
    age: '—',
    birthday: { zh: '—', en: '—' },
    affiliation: { zh: '阿派朗学派 → 重塑之手', en: 'Apeiron school → Manus Vindictae' },
    identity: {
      zh: '苏菲亚是阿派朗学派的除错师，数字√2，37 的好友。她幼年随父亲休来到阿派朗岛，与 37、6、210 一起长大；第一次大决战后，因信仰破裂，在阿尔卡纳的蛊惑下加入重塑之手，成为传道者并继任首领。她不是 139 可玩角色，而是主线重要人物。',
      en: 'Sophia is the corrector of the Apeiron school, the number √2 and 37’s friend. She came to the island as a child with her father Xiu and grew up with 37, 6 and 210. After the first great battle her faith collapsed; Arcana drew her into the Manus Vindictae, where she became a preacher and successor leader. She is an important story character, not one of the 139 playable entries.',
    },
    personality: {
      zh: [
        '她习惯照顾别人、检查错误，却很少允许自己被照顾。她的温柔里有很强的控制欲：只要一切还在正确的位置，她就能安心。',
        '她几乎从未真正融入阿派朗。她爱 37，也嫉妒 37 那种不需要证明就能被世界接住的笃定。',
        '她不是天生反派。她是在发现自己一直站在一套会把人筛掉的公式里之后，选择了不再做那个被筛掉的人。',
      ],
      en: [
        'She is used to caring for others and checking for errors, but rarely lets herself be cared for. Her gentleness contains a strong need for control: as long as everything is in its correct place, she can breathe.',
        'She never truly belonged at Apeiron. She loves 37, and envies the certainty of someone who can be held by the world without having to prove herself.',
        'She was not born a villain. She chose not to remain the one filtered out after discovering she had always stood inside a formula that filtered people.',
      ],
    },
    voice: {
      zh: [
        '语速平稳，措辞准确，常把问题说成“这里有一个错误”；越难过，越像在写一份检查报告。',
        '对 37 说话时会放软一点，但仍忍不住替她整理头发、纠正坐姿。',
        '加入重塑后，她的句子变短，笑容变少；“正确”取代了“温柔”。',
      ],
      en: [
        'She speaks evenly and precisely, often framing a problem as “there is an error here.” The more hurt she is, the more she sounds like she is writing an inspection report.',
        'Her voice softens for 37, though she still cannot stop fixing her hair or correcting her posture.',
        'After joining the Manus, her sentences shorten and her smiles fade. “Correct” replaces “gentle.”',
      ],
    },
    relationships: [
      {
        name: { zh: '37', en: '37' },
        role: {
          zh: '一起长大的朋友，也是她最想保护、又最无法理解的人。苏菲亚替 37 检查错误，37 却从不觉得她是一个错误。',
          en: 'A childhood friend, the person she most wants to protect and least understands. Sophia checks 37’s errors; 37 has never thought of her as one.',
        },
      },
      {
        name: { zh: '6', en: '6' },
        role: {
          zh: '阿派朗的领袖，也是她从小认识的人。苏菲亚尊重他，却在信仰崩塌后无法再接受他的秩序。',
          en: 'The leader of Apeiron and someone she has known since childhood. She respects him, but after her faith collapses she can no longer accept his order.',
        },
      },
      {
        name: { zh: '210 / 888', en: '210 / 888' },
        role: {
          zh: '一起长大的整数岛民。她看着他们走入暴雨，也看着自己再也回不到那个岛。',
          en: 'Integer islanders she grew up with. She watches them walk into the Storm, and watches herself lose the way back to the island.',
        },
      },
      {
        name: { zh: '阿尔卡纳', en: 'Arcana' },
        role: {
          zh: '看穿她信仰裂缝的人。阿尔卡纳给了她一个新的位置，也把她推上了自己并不真正胜任的首领之位。',
          en: 'The one who saw the crack in her faith, gave her a new position, and pushed her into a leadership she was not truly ready for.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '以下涉及阿派朗屏障崩塌、苏菲亚加入重塑、继任首领与南极事件。默认隐藏。',
        en: 'Spoilers for the collapse of Apeiron’s barrier, Sophia joining the Manus, her succession and the Antarctic incident. Hidden by default.',
      },
      relationships: [
        {
          name: { zh: '37（决裂）', en: '37 (rupture)' },
          role: {
            zh: '苏菲亚最不愿失去的人，也是她最终站在对面的人。她曾把 37 的数字放进瓶子；37 也一直知道她的数字是 √2。',
            en: 'The person Sophia least wants to lose, and the one she ultimately stands against. She once put 37’s number in a bottle; 37 has always known hers is √2.',
          },
        },
        {
          name: { zh: '维尔汀 / 十四行诗', en: 'Vertin / Sonetto' },
          role: {
            zh: '南极仪式中闯入的敌人。苏菲亚与十四行诗短暂交手，最后选择暗中放走她们，让洪水被遏止、变回普通暴雨。',
            en: 'Enemies who break into the Antarctic ritual. Sophia briefly fights Sonetto, then secretly lets them go, allowing the flood to be contained and reduced back to a Storm.',
          },
        },
      ],
      story: {
        zh: [
          '苏菲亚原是阿派朗的除错师，父亲休是岛上工程师。她与 37、6、210 一起长大，无微不至地照顾 37；但她几乎从未真正融入这个以“完美数字”衡量人的学派。',
          '第一次大决战中，阿派朗在普通人类轰炸下沦陷，教众染上暴雨症候。苏菲亚得知拯救小岛的真理只是一串数字后，信仰彻底崩塌；阿尔卡纳告诉她，她的数字是无理数√2，并把她和部分教众带入重塑之手。',
          '阿派朗一战后，阿尔卡纳临时推举苏菲亚为新首领。南极事件中，苏菲亚主持复活仪式，却遭到阿尼姆斯等高层排挤。她与十四行诗短暂交手后暗中放走维尔汀一行，使洪水被遏止，随后与复活的阿尔卡纳离开南极。',
        ],
        en: [
          'Sophia was Apeiron’s corrector; her father Xiu was an island engineer. She grew up with 37, 6 and 210 and cared for 37 constantly, yet never truly belonged to a school that measured people by perfect numbers.',
          'During the first great battle, Apeiron fell under ordinary human bombing and its followers caught Storm symptoms. When Sophia learned the truth that could save the island was only a string of numbers, her faith collapsed. Arcana told her that her number was the irrational √2 and brought her and part of the congregation into the Manus Vindictae.',
          'After the Apeiron battle, Arcana named Sophia the new leader. In Antarctica she presided over the resurrection ritual but was sidelined by Animus and other senior figures. After a brief fight with Sonetto, she secretly let Vertin’s group go, allowing the flood to be contained; she then left Antarctica with the resurrected Arcana.',
        ],
      },
    },
    lines: [
      { zh: '苏菲亚总在替别人检查错误，却很少替自己辩解。', en: 'Sophia was always checking other people’s errors, and rarely defending her own.' },
      { zh: '她把 37 的乱发拢到耳后，说“至少这个可以修正”。', en: 'She tucked 37’s hair behind her ear and said, “At least this can be corrected.”' },
      { zh: '她不是不忠。她只是终于发现，自己一直站在一套会把人筛掉的公式里。', en: 'She was not disloyal. She simply discovered that she had been standing inside a formula that filtered people out.' },
    ],
    sources: [
      { label: '苏菲亚 · 百度百科', url: 'https://wapbaike.baidu.com/item/%E8%8B%8F%E8%8F%B2%E4%BA%9A/63620412' },
      { label: '37 · 百度百科（阿派朗关系）', url: 'https://wapbaike.baidu.com/item/37/63590917' },
    ],
    completion: { level: 'dossier-v1', zh: '深度档案 v1 · 主线人物', en: 'Dossier v1 · main story character' },
  },
  sonetto: {
    id: 'sonetto',
    archiveName: '十四行诗',
    nameZh: '十四行诗',
    nameEn: 'Sonetto',
    aliases: {
      zh: ['Sonetto'],
      en: ['Sonetto'],
    },
    title: { zh: '诗人的助手', en: 'The poet’s assistant' },
    rarity: 5,
    element: { zh: '岩', en: 'Mineral' },
    medium: { zh: '好奇', en: 'Curiosity' },
    age: '16',
    birthday: { zh: '1 月 10 日', en: 'January 10' },
    affiliation: { zh: '圣洛夫基金会 / 第一防线学校', en: 'St. Pavlov Foundation / First Line School' },
    identity: {
      zh: '十四行诗是圣洛夫基金会的五星岩属性神秘学家，意大利人，16 岁。她没有父母与家，自幼在基金会的第一防线学校长大，是最优秀的学员；毕业后担任基金分队长，后来成为司辰维尔汀的首席助手。她的武器是一支能画出诗中意象的玻璃笔。',
      en: 'Sonetto is a five-star Mineral arcanist of the St. Pavlov Foundation, Italian, sixteen years old. With no parents or home she grew up at the Foundation’s First Line School and became its best student. She later served as a Foundation captain and then as the Timekeeper Vertin’s chief assistant. Her weapon is a glass pen that can draw the images inside poems.',
    },
    personality: {
      zh: [
        '真诚、守规矩、责任感极强。她相信基金会最初的使命，也会在使命与具体的人发生冲突时，第一次认真地问“为什么”。',
        '她不是盲从的优等生。她曾为维尔汀打开一扇门，也曾为不公与自己的上级争辩；她的忠诚有判断。',
        '她习惯把情绪写进报告、诗或页脚，很少直接说“我害怕”。她需要被允许犯错，也需要学会不必永远做第一名。',
      ],
      en: [
        'Sincere, rule-bound and deeply responsible. She believes in the Foundation’s original mission, and when that mission conflicts with a real person she begins to ask “why” for the first time.',
        'She is not a blindly obedient honours student. She once opened a door for Vertin and argued with her superiors about injustice; her loyalty has judgement in it.',
        'She puts feelings into reports, poems or footnotes and rarely says “I am afraid” directly. She needs permission to make mistakes, and to stop being first all the time.',
      ],
    },
    voice: {
      zh: [
        '措辞完整、礼貌，习惯先确认对方是否需要帮助；越紧张越像在念一份报告。',
        '会认真夸人，夸得对方有点不好意思；也会在事后补一句“这是事实，不是恭维”。',
        '她称维尔汀“司辰”，但在真正私人的时刻，会短暂地只叫她的名字。',
      ],
      en: [
        'Her phrasing is complete and courteous; she asks whether help is needed before giving it. The more nervous she is, the more she sounds like she is reading a report.',
        'She gives compliments earnestly enough to embarrass the recipient, then adds, “That is a fact, not flattery.”',
        'She calls Vertin “Timekeeper,” but in genuinely private moments she briefly uses only her name.',
      ],
    },
    relationships: [
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '她的司辰、同学，也是她最想追上的人。四年前她为维尔汀打开过一扇门；此后她一直在学，怎样既忠于职责，又忠于具体的人。',
          en: 'Her Timekeeper, classmate and the person she most wants to keep up with. Four years ago she opened a door for Vertin; since then she has been learning how to be loyal both to duty and to a particular person.',
        },
      },
      {
        name: { zh: '红弩箭', en: 'Lilya' },
        role: {
          zh: '被她石化过的人。现在两人能同桌喝茶，但十四行诗仍会先道歉，红弩箭仍会先活动手指。',
          en: 'The person she once turned to stone. They can share tea now, but Sonetto still apologizes first and Lilya still flexes her fingers first.',
        },
      },
      {
        name: { zh: 'Z 女士 / 马克·哈尔', en: 'Ms. Z / Mark' },
        role: {
          zh: '改革期间的同伴。维尔汀被强制休眠后，十四行诗与他们一起游说、奔走，推动基金会通过改革方案。',
          en: 'Allies during the reform. After Vertin was forced into sleep, Sonetto worked with them to lobby and push the Foundation reform through.',
        },
      },
      {
        name: { zh: '玛蒂尔达 / 小梅斯梅尔 / 伊莎贝拉', en: 'Matilda / Mesmer Jr. / Isabella' },
        role: {
          zh: '第一防线学校的同学。她们共享过训练、考试和失去；有些名字，十四行诗至今仍会在报告里写错又改回来。',
          en: 'Classmates from the First Line School. They shared training, exams and losses; some names Sonetto still writes wrong in a report and corrects again.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '以下涉及四年前的出逃、红弩箭石化、基金会改革与十四行诗的审讯。默认隐藏。',
        en: 'Spoilers for the escape four years ago, Lilya’s petrification, the Foundation reform and Sonetto’s interrogation. Hidden by default.',
      },
      relationships: [
        {
          name: { zh: '第一防线学校', en: 'First Line School' },
          role: {
            zh: '她长大的地方，也是她第一次学会“优秀”与“服从”并不是同一件事的地方。四年前的出逃让她付出了代价。',
            en: 'Where she grew up, and where she first learned that “excellent” and “obedient” are not the same thing. The escape four years ago cost her.',
          },
        },
        {
          name: { zh: '康斯坦丁', en: 'Constantine' },
          role: {
            zh: '基金会副会长，也是改革的主要反对者。十四行诗没有在她面前退让，最终与 Z、马克一起击败了她的路线。',
            en: 'The Foundation vice-president and main opponent of the reform. Sonetto did not back down before her; with Z and Mark, she eventually defeated that line.',
          },
        },
      ],
      story: {
        zh: [
          '十四行诗从小在基金会长大，是第一防线学校最优秀的学员。四年前，她帮助维尔汀出逃，并在拦截中把红弩箭变成石头；这件事成为两人之间长期存在的裂缝。',
          '四年后，她留任基金会担任分队长，成为维尔汀的首席助手，参与芝加哥事件，并协助招募星锑、槲寄生、苏芙比等人。她曾因一次任务失败接受审讯，基金会最终以“意外事故”结案；她选择留下，等待下一次任务。',
          '维尔汀被康斯坦丁强制休眠后，十四行诗与 Z、马克·哈尔一起推动改革。经过四周半的游说与对抗，改革方案通过，维尔汀获救。她不是靠背叛基金会救下维尔汀的，而是靠把基金会的规则用到它自己身上。',
        ],
        en: [
          'Sonetto grew up in the Foundation and was the First Line School’s best student. Four years ago she helped Vertin escape and turned Lilya to stone while trying to stop her; that act remained a crack between them for a long time.',
          'Four years later she stayed with the Foundation as a captain, became Vertin’s chief assistant, took part in the Chicago incident and helped recruit Regulus, Druvis, Sotheby and others. After a failed mission she faced an interrogation; the Foundation closed it as an accident. She chose to stay and wait for the next task.',
          'After Constantine forced Vertin into sleep, Sonetto worked with Z and Mark to push the reform. After four and a half weeks of lobbying and confrontation, the reform passed and Vertin was freed. She did not save Vertin by betraying the Foundation; she saved her by turning the Foundation’s own rules against those who had frozen them.',
        ],
      },
    },
    lines: [
      { zh: '十四行诗第一次叫我“司辰”的时候，我还以为她在念一份公文。后来才知道，那是她能给出的、最郑重的称呼。', en: 'The first time Sonetto called me “Timekeeper,” I thought she was reading from a form. Later I learned it was the most serious name she knew how to give.' },
      { zh: '她的玻璃笔画得出诗里的城市，却画不出她想说的话。所以她干脆把话写成诗。', en: 'Her glass pen can draw the cities inside poems, but not the words she wants to say. So she writes poems instead.' },
      { zh: '她曾把红弩箭变成石头。现在她们坐在同一张桌边喝茶，谁也不提那次。只是红弩箭会先活动一下手指。', en: 'She once turned Lilya to stone. Now they share a table and tea, and neither mentions it. Lilya just flexes her fingers first.' },
    ],
    sources: [
      { label: '十四行诗 · 百度百科', url: 'https://wapbaike.baidu.com/item/%E5%8D%81%E5%9B%9B%E8%A1%8C%E8%AF%97/59944139' },
      { label: '37 · 百度百科（基金会/主线关系）', url: 'https://wapbaike.baidu.com/item/37/63590917' },
    ],
    completion: { level: 'dossier-v1', zh: '深度档案 v1', en: 'Dossier v1' },
  },
};

Object.assign(CHARACTER_DOSSIERS, DOSSIERS_V2, DOSSIERS_V3, DOSSIERS_V4, DOSSIERS_GUESTS);

export function dossierForName(name) {
  return Object.values(CHARACTER_DOSSIERS).find((dossier) => dossier.archiveName === name) || null;
}

export function dossierForCharacter(character) {
  if (!character) return null;
  return CHARACTER_DOSSIERS[character.id]
    || Object.values(CHARACTER_DOSSIERS).find((dossier) => dossier.archiveName === character.zhName)
    || null;
}
