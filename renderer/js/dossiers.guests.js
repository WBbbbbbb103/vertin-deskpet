/**
 * Guest dossier batch.
 *
 * Six suitcase guests whose public archive entries only preserve identity
 * seeds. These are fan-written desk dossiers, not official script excerpts;
 * uncertain material is kept in the spoiler section and clearly hedged.
 */

export const DOSSIERS_GUESTS = {
  lusijian: {
    id: 'lusijian',
    archiveName: '鹭鸶剪',
    nameZh: '鹭鸶剪',
    nameEn: 'Lusijian',
    aliases: { zh: ['纸鹭'], en: ['Paper Heron'] },
    title: { zh: '剪开雨幕的访客', en: 'Visitor Who Cuts Through the Rain' },
    rarity: 6,
    element: { zh: '—', en: '—' },
    medium: { zh: '纸与剪', en: 'Paper and scissors' },
    affiliation: { zh: '箱中访客', en: 'A guest in the case' },
    identity: {
      zh: '公开档案只留下很少的身份信息：一位与“逍遥游”有关的六星神秘学家，别称“纸鹭”。这道档案没有替她补写过去，只保留她走路很轻、袖口常藏着纸片与剪刀的印象。桌边的她更像一段刚剪下来的雨，边缘很薄，却不会轻易被风吹散。',
      en: 'The public archive keeps only a small identity seed: a six-star arcanist associated with “free wandering”, also called Paper Heron. This dossier does not invent her past; it keeps only the impression of a light step, paper slips and scissors hidden in a sleeve. At the desk she is like a strip of rain just cut free: thin at the edge, but not easily blown away.',
    },
    personality: {
      zh: [
        '动作很轻，先看纸的边缘，再看人的表情。',
        '不喜欢把话说满。她会把一句解释剪短，只留下还能继续的部分。',
        '对旧纸、旧绳子和小动物有耐心；对故意弄皱纸的人没有。',
      ],
      en: [
        'Moves lightly. She looks at the edge of the paper before the expression on a face.',
        'She dislikes explaining everything. She cuts a sentence shorter and leaves only the part that can continue.',
        'Patient with old paper, old string and small animals; not patient with people who deliberately crumple paper.',
      ],
    },
    voice: {
      zh: [
        '句子短，像剪过一样，很少有多余的装饰。',
        '会把“雨”说成一种可以折起来带走的东西。',
        '偶尔用纸鹤、剪口或风向打比方，随后自己停下来。',
      ],
      en: [
        'Short sentences, as if trimmed; very little decoration.',
        'She speaks of rain as something that can be folded and carried away.',
        'Now and then she uses a paper crane, a cut edge or the wind as a comparison, then stops herself.',
      ],
    },
    relationships: [
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '她愿意在维尔汀的桌边停一会儿，因为这里总有旧纸、旧信和没做完的页码。',
          en: 'She is willing to pause at Vertin’s desk because there is always old paper, old letters and unfinished pages here.',
        },
      },
      {
        name: { zh: '手提箱', en: 'The suitcase' },
        role: {
          zh: '她说箱子像一叠还没剪开的纸，里面可能藏着另一场雨。',
          en: 'She says the case is like a stack of uncut paper; another rain may be folded inside.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '公开资料只保留身份种子，以下为桌边同人补写，不应当作官方剧情。',
        en: 'The public record preserves only an identity seed. The following is desk-pet fan writing, not official story.',
      },
      story: {
        zh: [
          '她不太谈“逍遥游”是什么。只说自己走过的地方，最后都变成纸上的一个折痕。',
          '她不替人决定该剪掉哪一段记忆，只把剪刀放在桌上，让对方自己伸手。',
          '如果有一天她离开，桌上可能会多一只纸鹤；翅膀朝向她走的方向。',
        ],
        en: [
          'She does not explain what “free wandering” is. She only says every place she has passed becomes a fold in paper.',
          'She does not decide which memory someone should cut away. She leaves the scissors on the desk and lets them reach for it.',
          'If she leaves one day, a paper crane may remain on the desk, its wings pointing the way she went.',
        ],
      },
    },
    lines: [
      { zh: '她把一张旧纸剪成雨的形状，又把它放回箱子里。', en: 'She cuts old paper into the shape of rain, then puts it back in the case.' },
      { zh: '她说，纸鹤飞不飞不重要；重要的是它曾经被折过。', en: 'She says it does not matter whether a paper crane flies; what matters is that it was once folded.' },
      { zh: '剪刀合上时，桌面安静了一瞬。', en: 'When the scissors close, the desk goes quiet for a moment.' },
    ],
    sources: [
      { label: '鹭鸶剪 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E9%B9%AD%E9%B8%B6%E5%89%AA' },
    ],
    completion: { level: 'dossier-guest', zh: '来客档案 · 箱中补全', en: 'Guest dossier · suitcase batch' },
  },

  liangyue: {
    id: 'liangyue',
    archiveName: '梁月',
    nameZh: '梁月',
    nameEn: 'Liang Yue',
    aliases: { zh: ['梁'], en: ['Liang'] },
    title: { zh: '旧戏台的守夜人', en: 'Night Keeper of the Old Stage' },
    rarity: 6,
    element: { zh: '—', en: '—' },
    medium: { zh: '夜色与巡守', en: 'Night watch' },
    affiliation: { zh: '执夜警员', en: 'Night patrol' },
    identity: {
      zh: '公开档案把梁月记录为神秘学家混血种，主题是“执夜警员”。她不站在舞台中央，而是站在灯照不到的地方，确认最后一盏灯有没有关好。她的斗笠压得很低，像把整条夜路收在帽檐下面。',
      en: 'The public record lists Liang Yue as an arcanist hybrid with the theme “night patrol”. She does not stand at the centre of the stage; she stands where the light does not reach, checking whether the last lamp was put out. Her broad hat is pulled low, as if the whole night road were folded under its brim.',
    },
    personality: {
      zh: [
        '习惯先巡一圈再坐下。看到门窗没关好，会顺手处理。',
        '说话不绕弯，但不会催人；她更相信“等到该走的时候”。',
        '对旧戏台、旧规矩和夜班有复杂的耐心。',
      ],
      en: [
        'She walks a perimeter before sitting down. If a door or window is open, she closes it without comment.',
        'Direct without being hurried. She trusts “when it is time to go” more than urgency.',
        'She has a complicated patience for old stages, old rules and night shifts.',
      ],
    },
    voice: {
      zh: [
        '语气平直，偶尔带一点戏台腔，像在念一句没有观众的开场白。',
        '会把“今晚”与“下场”混着用。',
        '提醒人休息时，不会用命令句。',
      ],
      en: [
        'Flat and steady, with an occasional stage cadence, like an opening line delivered to an empty house.',
        'She sometimes mixes “tonight” with “the next act”.',
        'She does not use commands when telling someone to rest.',
      ],
    },
    relationships: [
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '她认可维尔汀“守到最后”的习惯，也会提醒她：守夜的人同样需要换班。',
          en: 'She respects Vertin’s habit of staying until the end, and reminds her that the night keeper also needs a relief shift.',
        },
      },
      {
        name: { zh: '旧戏台', en: 'The old stage' },
        role: {
          zh: '她守的不是一场演出，而是演出结束后还没有离开的那部分人。',
          en: 'She does not guard a performance. She guards the part of people that has not left after the performance ends.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '公开档案目前只给出身份种子；以下为桌边同人补写，不冒充官方剧情。',
        en: 'The public archive currently gives only an identity seed. The following is desk-pet fan writing, not official story.',
      },
      story: {
        zh: [
          '她说戏台最安静的时候不是散场，而是开场前。所有人都还没来，所有事都还可能。',
          '她不轻易摘下斗笠。只有确认屋里没有雨时，帽檐才会抬起来一点。',
          '如果某天她没有来巡夜，桌上的灯会替她亮着。',
        ],
        en: [
          'She says the quietest moment of a stage is not after the audience leaves, but before it opens. No one has arrived; everything is still possible.',
          'She rarely takes off the hat. Only when she is sure there is no rain indoors does the brim lift a little.',
          'If she misses a night patrol, the lamp on the desk will stay lit for her.',
        ],
      },
    },
    lines: [
      { zh: '她把斗笠放在桌角，说今晚的雨不会下到屋里。', en: 'She sets the hat at the corner of the desk and says tonight’s rain will not reach indoors.' },
      { zh: '她巡过桌面一圈，把没关好的窗口留给了明天。', en: 'She makes one round of the desk and leaves the unclosed window for tomorrow.' },
      { zh: '旧戏台今晚不开场。她只是来看看灯。', en: 'The old stage is closed tonight. She only came to check the lamps.' },
    ],
    sources: [
      { label: '梁月 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E6%A2%81%E6%9C%88' },
    ],
    completion: { level: 'dossier-guest', zh: '来客档案 · 箱中补全', en: 'Guest dossier · suitcase batch' },
  },

  'blue-handkerchief': {
    id: 'blue-handkerchief',
    archiveName: '蓝手帕',
    nameZh: '蓝手帕',
    nameEn: 'Blue Handkerchief',
    aliases: { zh: ['星期二', '旅馆主人'], en: ['Tuesday', 'The Innkeeper'] },
    title: { zh: '替人收好眼泪的旅人', en: 'Traveler Who Keeps Tears Safe' },
    rarity: 6,
    element: { zh: '—', en: '—' },
    medium: { zh: '手帕与客房钥匙', en: 'Handkerchief and room keys' },
    affiliation: { zh: '旅馆', en: 'The inn' },
    identity: {
      zh: '公开档案把蓝手帕记作神秘学家，主题是“旅馆主人”，别称“Tuesday”。她总把一块蓝手帕叠得很整齐，像替谁保存着一件还没归还的东西。她熟悉客房、钥匙和走廊尽头的灯，却不太谈自己住在哪一间。',
      en: 'The public record lists Blue Handkerchief as an arcanist with the theme “innkeeper” and the alias “Tuesday”. She keeps a blue handkerchief folded very neatly, as if holding on to something not yet returned. She knows the rooms, the keys and the lamp at the end of the corridor, but rarely says which room she lives in.',
    },
    personality: {
      zh: [
        '待客周到，但不把“照顾”变成审问。',
        '会记住客人把行李放在哪一边，却不追问里面有什么。',
        '对告别很有经验，所以从不把“再见”说得太重。',
      ],
      en: [
        'Attentive without turning care into an interrogation.',
        'She remembers which side a guest leaves their luggage on, but does not ask what is inside.',
        'She is experienced with farewells, so she never puts too much weight on “goodbye”.',
      ],
    },
    voice: {
      zh: [
        '像前台交接：句子简短，信息齐全，末尾常留一句“房间已经准备好了”。',
        '偶尔把“星期二”当作日期、名字和一种天气。',
        '不说“别哭”，只说“手帕在这里”。',
      ],
      en: [
        'Like a front-desk handover: short, complete, and usually ending with “the room is ready”.',
        'She sometimes uses “Tuesday” as a date, a name, and a kind of weather.',
        'She does not say “don’t cry”. She says “the handkerchief is here”.',
      ],
    },
    relationships: [
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '她把维尔汀当作一位不需要多问的住客：房卡放在桌上，灯留着。',
          en: 'She treats Vertin as a guest who does not need many questions: the key is on the desk, the lamp is left on.',
        },
      },
      {
        name: { zh: '蓝手帕', en: 'The blue handkerchief' },
        role: {
          zh: '它被叠得很整齐，却不是新的。她说有些东西要一直带着，才不会被忘记。',
          en: 'It is folded neatly, but not new. She says some things must be carried so they are not forgotten.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '公开材料有限；以下为桌边同人补写，涉及旅馆与告别的情绪，不冒充官方剧情。',
        en: 'Public material is limited. The following is desk-pet fan writing about the inn and farewells, not official story.',
      },
      story: {
        zh: [
          '旅馆的灯不是为了照亮路，而是为了让回来的人知道哪一扇门还开着。',
          '她不问客人为什么哭，只把蓝手帕放在手边，等对方自己决定要不要用。',
          '有些房间一直空着。她每天还是会去换一次水。',
        ],
        en: [
          'The inn’s lamp is not there to light the road, but to let anyone returning know which door is still open.',
          'She does not ask why a guest is crying. She leaves the blue handkerchief within reach and lets them decide whether to use it.',
          'Some rooms stay empty. She still changes the water every day.',
        ],
      },
    },
    lines: [
      { zh: '她把蓝手帕折成四折，放在离你更近的一边。', en: 'She folds the blue handkerchief into four and places it on your side of the desk.' },
      { zh: '她说房间已经准备好了，今晚不必赶路。', en: 'She says the room is ready; there is no need to travel tonight.' },
      { zh: '走廊尽头的灯亮着。她没有解释为谁留的。', en: 'The lamp at the end of the corridor is on. She does not explain who it is for.' },
    ],
    sources: [
      { label: '蓝手帕 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E8%93%9D%E6%89%8B%E5%B8%95' },
    ],
    completion: { level: 'dossier-guest', zh: '来客档案 · 箱中补全', en: 'Guest dossier · suitcase batch' },
  },

  semmelweis: {
    id: 'semmelweis',
    archiveName: '塞梅尔维斯',
    nameZh: '塞梅尔维斯',
    nameEn: 'Semmelweis',
    aliases: { zh: ['外部调查员'], en: ['External investigator'] },
    title: { zh: '不喝红茶的血族医生', en: 'Vampire Doctor Who Avoids Black Tea' },
    rarity: 6,
    element: { zh: '—', en: '—' },
    medium: { zh: '调查记录与手术刀', en: 'Case notes and scalpel' },
    affiliation: { zh: '外部调查', en: 'External investigation' },
    identity: {
      zh: '公开档案把塞梅尔维斯记录为神秘学家感染种，主题是“外部调查”。她的身份与“医生”和“调查员”都有关：既处理伤口，也处理伤口背后的原因。她对红茶没有兴趣，只要温水；她洗手很久，说这不是洁癖，是对生命的礼貌。',
      en: 'The public record lists Semmelweis as an arcanist of the infected, with the theme “external investigation”. Her identity touches both doctor and investigator: she treats wounds, and the reasons behind them. She has no interest in black tea and asks for warm water; she washes her hands for a long time and says it is not fastidiousness but courtesy to life.',
    },
    personality: {
      zh: [
        '冷静，先确认事实，再决定要不要相信直觉。',
        '对“感染”与“污染”的边界很敏感，不喜欢别人拿它们开玩笑。',
        '会记住病人的名字，也会记住是谁把病人送来的。',
      ],
      en: [
        'Calm. She establishes the facts before deciding whether to trust an instinct.',
        'Sensitive to the boundary between infection and contamination; she does not like jokes about either.',
        'She remembers a patient’s name, and who brought them in.',
      ],
    },
    voice: {
      zh: [
        '像写调查报告：时间、地点、症状、下一步，一条一条来。',
        '很少提高声音；真正的警告反而说得很轻。',
        '偶尔会停顿，像在确认自己有没有把“关心”说成“诊断”。',
      ],
      en: [
        'Like a case report: time, place, symptoms, next step, one by one.',
        'She rarely raises her voice; her real warnings are the quiet ones.',
        'She sometimes pauses, as if checking that she has not turned care into a diagnosis.',
      ],
    },
    relationships: [
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '她把维尔汀当作一个会隐瞒疲劳的调查对象，也当作一个值得如实告知的同行者。',
          en: 'She treats Vertin as an investigator who hides fatigue, and as a companion who deserves a truthful answer.',
        },
      },
      {
        name: { zh: '诊室', en: 'The surgery' },
        role: {
          zh: '她坚持把灯留在门口，因为很多伤口需要先被看见，才谈得上处理。',
          en: 'She insists on leaving the lamp by the door, because many wounds must first be seen before they can be treated.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '公开档案只保留身份种子；以下为桌边同人补写，涉及感染与调查的情绪，不冒充官方剧情。',
        en: 'The public archive preserves only an identity seed. The following is desk-pet fan writing about infection and investigation, not official story.',
      },
      story: {
        zh: [
          '她不把感染说成“脏”。她只说，有些东西进了身体，就会改变一个人看世界的方式。',
          '她做外部调查时，不急着找唯一的坏人；她更在意是谁让伤口一直没有被处理。',
          '她不喜欢红茶，但会替别人把杯子洗干净。',
        ],
        en: [
          'She does not call infection “dirty”. She says only that some things enter a body and change the way a person sees the world.',
          'On external investigations she does not rush to find a single villain; she cares more about who kept a wound from being treated.',
          'She does not like black tea, but she will wash the cup for someone else.',
        ],
      },
    },
    lines: [
      { zh: '她只要了一杯温水，把药盒放在离你更近的地方。', en: 'She asks only for warm water and places the medicine box closer to you.' },
      { zh: '她说，感染不是道德问题，和伤口一样需要处理。', en: 'She says infection is not a moral problem; like a wound, it needs treatment.' },
      { zh: '她洗了很久的手，然后才坐下来。', en: 'She washes her hands for a long time before sitting down.' },
    ],
    sources: [
      { label: '塞梅尔维斯 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E5%A1%9E%E6%A2%85%E5%B0%94%E7%BB%B4%E6%96%AF' },
    ],
    completion: { level: 'dossier-guest', zh: '来客档案 · 箱中补全', en: 'Guest dossier · suitcase batch' },
  },

  lorentz: {
    id: 'lorentz',
    archiveName: '洛伦兹蝴蝶',
    nameZh: '洛伦兹蝴蝶',
    nameEn: 'Lorentz Butterfly',
    aliases: { zh: ['混沌研究员'], en: ['Chaos researcher'] },
    title: { zh: '在公式里振翅的蝴蝶', en: 'Butterfly Beating Its Wings in an Equation' },
    rarity: 6,
    element: { zh: '—', en: '—' },
    medium: { zh: '混沌观测', en: 'Chaos observation' },
    affiliation: { zh: '混沌研究', en: 'Chaos research' },
    identity: {
      zh: '公开档案把洛伦兹蝴蝶记录为神秘学家，主题是“混沌研究员”。她的工作不是让世界变得可预测，而是记录那些最小的偏差怎样在很远的地方变成天气。她常在桌角画蝴蝶，翅膀停在同一道公式上，像在等一个不会立刻出现的答案。',
      en: 'The public record lists Lorentz Butterfly as an arcanist with the theme “chaos researcher”. Her work is not to make the world predictable, but to record how the smallest deviation becomes weather somewhere far away. She often draws a butterfly in the corner of the desk; its wings rest on the same equation, as if waiting for an answer that will not arrive at once.',
    },
    personality: {
      zh: [
        '对很小的变化有耐心，对“这不重要”没有耐心。',
        '会同时开几本笔记，却记得每一本停在哪一页。',
        '不急着给结论；她更愿意先保留一点误差。',
      ],
      en: [
        'Patient with very small changes; impatient with “it doesn’t matter”.',
        'She keeps several notebooks open at once, yet remembers the page each one stopped on.',
        'She does not rush to a conclusion; she would rather preserve a little error first.',
      ],
    },
    voice: {
      zh: [
        '会把日常现象说成“一个很小的扰动”，然后自己笑一下。',
        '不承诺结果，只说“目前看起来”。',
        '偶尔用蝴蝶、风向和公式打比方，但不会把话说得太满。',
      ],
      en: [
        'She calls ordinary things “a very small perturbation”, then smiles at herself.',
        'She does not promise outcomes; she says “for now it looks like”.',
        'She sometimes uses butterflies, wind direction and equations, but never overstates them.',
      ],
    },
    relationships: [
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '她把维尔汀当作一个会改变天气的小变量：不显眼，但每次出现都会留下偏差。',
          en: 'She treats Vertin as a small variable that changes the weather: not conspicuous, but every appearance leaves a deviation.',
        },
      },
      {
        name: { zh: '蝴蝶', en: 'The butterfly' },
        role: {
          zh: '不是宠物，也不是答案。更像一个提醒：最小的动作也值得被记录。',
          en: 'Not a pet, and not an answer. More like a reminder that the smallest action is worth recording.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '公开档案只保留身份种子；以下为桌边同人补写，不冒充官方剧情。',
        en: 'The public archive preserves only an identity seed. The following is desk-pet fan writing, not official story.',
      },
      story: {
        zh: [
          '她说，混沌不是“没有秩序”，而是“秩序太多，暂时看不清”。',
          '她不试图阻止蝴蝶振翅。她只想知道，这一次翅膀会把哪一场雨带到桌边。',
          '她的笔记从不写“结论”，只写“下一次观察”。',
        ],
        en: [
          'She says chaos is not “no order”, but “too many orders to see clearly yet”.',
          'She does not try to stop the butterfly from beating its wings. She only wants to know which rain this wingbeat will bring to the desk.',
          'Her notebooks never say “conclusion”. They say “next observation”.',
        ],
      },
    },
    lines: [
      { zh: '她在桌角画了一只蝴蝶，翅膀停在同一道公式上。', en: 'She draws a butterfly in the corner; its wings rest on the same equation.' },
      { zh: '她说今天的风向有一点不对，但还值得再观察一会儿。', en: 'She says the wind is a little wrong today, but still worth observing a while longer.' },
      { zh: '她的笔停在半空，像在等一个很小的变量自己出现。', en: 'Her pen stops in the air, as if waiting for a very small variable to appear on its own.' },
    ],
    sources: [
      { label: '洛伦兹蝴蝶 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E6%B4%9B%E4%BC%A6%E5%85%B9%E8%9D%B4%E8%9D%B6' },
    ],
    completion: { level: 'dossier-guest', zh: '来客档案 · 箱中补全', en: 'Guest dossier · suitcase batch' },
  },

  charon: {
    id: 'charon',
    archiveName: '卡戎',
    nameZh: '卡戎',
    nameEn: 'Charon',
    aliases: { zh: ['摆渡人'], en: ['The Ferryman'] },
    title: { zh: '渡口的摆渡人', en: 'Ferryman of the Crossing' },
    rarity: 6,
    element: { zh: '—', en: '—' },
    medium: { zh: '渡船与收殓', en: 'Ferry and last rites' },
    affiliation: { zh: '遗体收殓', en: 'Funerary work' },
    identity: {
      zh: '公开档案把卡戎记录为意识唤醒者，主题是“遗体收殓”。他不是传统意义上的“死神”，更像一个在渡口工作的人：确认名字、整理遗物、把船撑稳。他的头发遮住一只眼睛，另一只一直看着需要被送过去的人。',
      en: 'The public record lists Charon as an awakened consciousness with the theme “funerary work”. He is not a “death god” in the usual sense, but someone who works at a crossing: confirming names, arranging belongings, keeping the boat steady. His hair covers one eye; the other stays on whoever needs to be taken across.',
    },
    personality: {
      zh: [
        '安静，不催促。他相信每个人都有自己的渡河时间。',
        '对遗物很尊重，不把任何一件东西随手丢掉。',
        '不会被“死亡”吓到，但会认真对待活着的人留下来的问题。',
      ],
      en: [
        'Quiet and unhurried. He believes everyone has their own time to cross.',
        'He treats belongings with respect and never casually throws anything away.',
        'He is not frightened by death, but takes seriously the questions left by the living.',
      ],
    },
    voice: {
      zh: [
        '声音低，句子短，像在确认一份名单。',
        '会把“过去”说成“对岸”，把“记住”说成“带过去”。',
        '不轻易安慰；他更愿意先问“你还有什么事没有放下”。',
      ],
      en: [
        'Low voice, short sentences, like confirming a list of names.',
        'He calls the past “the far bank” and remembering “carrying something across”.',
        'He does not offer easy comfort; he first asks, “what have you not put down yet?”',
      ],
    },
    relationships: [
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '他看出维尔汀也一直在替别人保管过去，于是提醒她：摆渡人不能永远站在船上。',
          en: 'He sees that Vertin also keeps other people’s pasts, and reminds her that a ferryman cannot stand in the boat forever.',
        },
      },
      {
        name: { zh: '渡船', en: 'The ferry' },
        role: {
          zh: '船很旧，但每次出航前他都会检查一遍。他说，送人过去的路不能将就。',
          en: 'The boat is old, but he checks it before every crossing. He says the road that carries someone across should not be improvised.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '公开档案只保留身份种子；以下为桌边同人补写，涉及收殓与告别，不冒充官方剧情。',
        en: 'The public archive preserves only an identity seed. The following is desk-pet fan writing about funerary work and farewells, not official story.',
      },
      story: {
        zh: [
          '他收殓的不只是遗体，也包括一个人留在世上的最后一点秩序。',
          '他记得每一个被送过河的名字，但从不在活着的人面前数。',
          '如果有人问渡口在哪里，他会说：先把你手里的事放下，再抬头看。',
        ],
        en: [
          'What he attends to is not only a body, but the last bit of order a person leaves in the world.',
          'He remembers every name he has ferried across, but never counts them in front of the living.',
          'If someone asks where the crossing is, he says: put down what you are carrying first, then look up.',
        ],
      },
    },
    lines: [
      { zh: '他把船桨靠在箱边，先确认了你的名字。', en: 'He leans the oar against the case and confirms your name first.' },
      { zh: '他说今天不渡人，只把渡口打扫干净。', en: 'He says he is not ferrying anyone today, only cleaning the crossing.' },
      { zh: '他的头发遮住一只眼睛，另一只一直在看你。', en: 'His hair covers one eye; the other stays on you.' },
    ],
    sources: [
      { label: '卡戎 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E5%8D%A1%E6%88%8E' },
    ],
    completion: { level: 'dossier-guest', zh: '来客档案 · 箱中补全', en: 'Guest dossier · suitcase batch' },
  },
};
