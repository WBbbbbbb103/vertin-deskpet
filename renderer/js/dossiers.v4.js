/**
 * Fourth dossier batch: Tooth Fairy, Jessica, Voyager, Centurion, Medicine Pocket.
 *
 * Fan-written synthesis grounded in public character and story summaries.
 * Not official script quotations; spoiler content stays behind the UI gate.
 */

export const DOSSIERS_V4 = {
  toothfairy: {
    id: 'toothfairy',
    archiveName: '牙仙',
    nameZh: '牙仙',
    nameEn: 'Tooth Fairy',
    aliases: { zh: ['牙医'], en: ['The Dentist'] },
    title: { zh: '把疼痛说清楚的人', en: 'The One Who Names the Pain' },
    rarity: 6,
    element: { zh: '星', en: 'Star' },
    medium: { zh: '牙齿', en: 'Teeth' },
    affiliation: { zh: '牙科诊所 · 圣洛夫基金会', en: 'Dental practice · St. Pavlov Foundation' },
    identity: {
      zh: '牙仙是一名牙医，也是一位把“疼痛”当作线索的人。她会把脱落的乳牙洗净、标上日期，像保存小小的证物；她也会在诊室里先问清楚哪里疼、什么时候疼、疼之前咬住了什么。对她来说，牙齿不是装饰，是一个人怎样生活、怎样忍耐的证据。',
      en: 'Tooth Fairy is a dentist, and someone who treats pain as a clue. She washes lost milk teeth and labels them with dates like tiny pieces of evidence; in her surgery she first asks where it hurts, when it began, and what the patient was holding between their teeth before it started. To her, teeth are not decoration but evidence of how a person lives and endures.',
    },
    personality: {
      zh: [
        '冷静、精确，面对害怕的病人会先把动作放慢。她不把“忍一忍”当作治疗。',
        '有一点让人发毛的幽默：她会认真讨论牙齿的来历，也会突然问一句“你最近是不是咬得太紧了”。',
        '对小东西很有耐心。乳牙、旧牙刷、缺了一角的杯子，她都愿意收好。',
      ],
      en: [
        'Calm and precise. With frightened patients she slows every movement first. She does not treat “just endure it” as care.',
        'Her humour is a little unsettling: she discusses the provenance of a tooth with complete seriousness, then asks, “Have you been clenching your jaw lately?”',
        'She is patient with small things. Milk teeth, old toothbrushes, a chipped cup — she keeps them carefully.',
      ],
    },
    voice: {
      zh: [
        '问诊式说话：先确认位置和感受，再给一个很小的下一步。',
        '不用“别怕”草草带过。她会说“会有一点凉”，然后真的先让你知道。',
        '偶尔把牙科术语说得很轻，像在讲一个只有她和病人懂的笑话。',
      ],
      en: [
        'Speaks like a consultation: confirm the place and the feeling first, then offer one very small next step.',
        'She does not brush fear aside with “don’t worry.” She says “this will feel cold,” and then makes sure it is true.',
        'Now and then she drops a dental term very softly, like a joke only she and the patient understand.',
      ],
    },
    relationships: [
      {
        name: { zh: '洁西卡', en: 'Jessica' },
        role: {
          zh: '她照看过洁西卡的牙齿，也看见洁西卡用更原始的方式理解“被照顾”。她不急着纠正，只把诊室留得安全一点。',
          en: 'She has treated Jessica’s teeth, and seen Jessica understand care in a more feral way. She does not rush to correct it; she simply makes the surgery a little safer.',
        },
      },
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '一个不太会喊疼的来访者。牙仙会注意到她回答得太快，然后重新问一遍。',
          en: 'A visitor who does not readily admit pain. Tooth Fairy notices when an answer comes too quickly, and asks again.',
        },
      },
      {
        name: { zh: '乳牙盒', en: 'The milk-tooth box' },
        role: {
          zh: '她保存下来的小盒子。每一颗牙齿都有日期，有些日期比主人记得的更准确。',
          en: 'The small box she keeps. Every tooth has a date; some dates are more accurate than the owner remembers.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '涉及牙仙的诊疗经历与相关剧情，默认隐藏。',
        en: 'Spoilers for Tooth Fairy’s practice and related story. Hidden by default.',
      },
      story: {
        zh: [
          '牙仙的诊室不只处理牙齿。她反复遇到把疼痛藏起来的人，也反复遇到把疼痛当作唯一语言的人。',
          '她不会替病人决定“应该放下什么”。她只把疼痛的位置标出来，让病人自己看见。',
          '她的盒子里存着许多已经离开的人留下的东西；她从不把它们说成战利品。',
        ],
        en: [
          'Tooth Fairy’s surgery does not deal only with teeth. She keeps meeting people who hide pain, and people for whom pain is the only language left.',
          'She does not decide for a patient what should be let go. She marks where the pain sits and lets the patient see it.',
          'Her box holds things left behind by many people who have gone. She never calls them trophies.',
        ],
      },
    },
    lines: [
      { zh: '牙仙把每一颗乳牙都洗干净，装进标了日期的小盒。', en: 'Tooth Fairy washed every milk tooth and put it in a small box marked with a date.' },
      { zh: '她说，疼痛通常不是因为牙齿，而是因为人咬住了不该咬住的东西。', en: 'She says the pain usually is not in the tooth. It is in something the person will not stop biting.' },
      { zh: '她递给我一把很小的牙刷，说旅行者也要记得照顾自己。', en: 'She handed me a very small toothbrush and said travellers still have to look after themselves.' },
    ],
    sources: [
      { label: '牙仙 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E7%89%99%E4%BB%99' },
      { label: '绿湖剧情 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/1.2' },
    ],
    completion: { level: 'dossier-v4', zh: '深度档案 v4 · 热门补齐', en: 'Dossier v4 · popular batch' },
  },

  jessica: {
    id: 'jessica',
    archiveName: '洁西卡',
    nameZh: '洁西卡',
    nameEn: 'Jessica',
    aliases: { zh: ['绿湖的女孩'], en: ['Girl of Green Lake'] },
    title: { zh: '绿湖的纸鹿', en: 'Paper Deer of Green Lake' },
    rarity: 6,
    element: { zh: '兽', en: 'Beast' },
    medium: { zh: '变形', en: 'Shapeshifting' },
    affiliation: { zh: '绿湖', en: 'Green Lake' },
    identity: {
      zh: '洁西卡来自绿湖，一个被森林和传说围住的地方。她能变成鹿，也能用很笨拙的方式学习人的规矩。她对“朋友”的理解直接得近乎危险：喜欢就想留下，害怕就想躲进树里。她不是不懂感情，只是还没有学会人类那些拐弯的说法。',
      en: 'Jessica comes from Green Lake, a place enclosed by forest and story. She can turn into a deer, and learns human rules in a very clumsy way. Her idea of a friend is direct to the point of danger: if she likes someone she wants them to stay; if she is afraid she wants to hide inside a tree. She is not without feeling; she simply has not learned the human way of going around it.',
    },
    personality: {
      zh: [
        '好奇，先用手和鼻子认识世界，再用语言补上解释。',
        '害怕被丢下时会变得固执，甚至用变形来逃避一场谈话。',
        '学得很快，尤其是关于“怎么对一个人好”的部分；但她需要有人告诉她，留下和困住不是一回事。',
      ],
      en: [
        'Curious. She meets the world with hands and nose first, then adds language afterwards.',
        'When she fears being left, she becomes stubborn, sometimes using shapeshifting to escape a conversation.',
        'She learns quickly, especially about how to be good to someone; but she needs to be told that staying and trapping are not the same.',
      ],
    },
    voice: {
      zh: [
        '句子短，常从气味、触感或温度说起。',
        '会把人名和自然物混在一起：“你像一块被太阳晒过的石头。”',
        '真正难过时反而很安静，只变成鹿，停在门外。',
      ],
      en: [
        'Short sentences, often beginning with smell, texture or temperature.',
        'She mixes people with natural things: “You are like a stone the sun has warmed.”',
        'When she is truly sad she goes quiet, turns into a deer and stands outside the door.',
      ],
    },
    relationships: [
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '第一个没有把她当成“绿湖的怪物”或“需要解释的传说”的人。洁西卡想跟她走，但还在学习告别不是背叛。',
          en: 'The first person who did not treat her as “the Green Lake monster” or a legend that needed explaining. Jessica wants to follow her, and is still learning that farewell is not betrayal.',
        },
      },
      {
        name: { zh: '牙仙', en: 'Tooth Fairy' },
        role: {
          zh: '替她看牙、也替她修正一些关于身体的误解。洁西卡觉得诊室太亮，但每次都会回去。',
          en: 'Treats her teeth and corrects a few misunderstandings about her own body. Jessica finds the surgery too bright, and returns every time.',
        },
      },
      {
        name: { zh: '绿湖', en: 'Green Lake' },
        role: {
          zh: '她的家，也是她最初的牢笼。她还没有决定要怎样带着它继续走。',
          en: 'Her home, and her first cage. She has not decided how to carry it with her.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '涉及绿湖事件与洁西卡的去向，默认隐藏。',
        en: 'Spoilers for the Green Lake incident and Jessica’s destination. Hidden by default.',
      },
      story: {
        zh: [
          '绿湖的传说把洁西卡变成了别人口中的“怪物”。她一开始也用这个称呼理解自己。',
          '与维尔汀一行相处后，她第一次看见“被留下”也可以不是惩罚。她开始学着在门口挥手，而不是把门关上。',
          '她仍然会变成鹿，仍然会害怕。只是害怕的时候，她开始愿意让人知道。',
        ],
        en: [
          'The legend of Green Lake turned Jessica into other people’s “monster.” For a while she understood herself through that word too.',
          'After travelling with Vertin’s group she sees for the first time that being left behind need not be a punishment. She begins learning to wave at the door instead of shutting it.',
          'She still turns into a deer, and still gets afraid. She is simply beginning to let people know when she is.',
        ],
      },
    },
    lines: [
      { zh: '洁西卡把一整个下午折成一只纸鹿，放在窗台上。', en: 'Jessica folded an entire afternoon into a paper deer and left it on the windowsill.' },
      { zh: '她问我，如果一个人害怕孤独，能不能先学会和树说话。', en: 'She asked me whether someone afraid of being alone could learn to speak to trees first.' },
      { zh: '她最后没有留住我们，但学会了在门口挥手，而不是关门。', en: 'In the end she could not keep us, but she learned to wave at the door instead of closing it.' },
    ],
    sources: [
      { label: '洁西卡 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E6%B4%81%E8%A5%BF%E5%8D%A1' },
      { label: '绿湖剧情 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/1.2' },
    ],
    completion: { level: 'dossier-v4', zh: '深度档案 v4 · 热门补齐', en: 'Dossier v4 · popular batch' },
  },

  voyager: {
    id: 'voyager',
    archiveName: '远旅',
    nameZh: '远旅',
    nameEn: 'Voyager',
    aliases: { zh: ['星海的旅人'], en: ['Traveler of the Star Sea'] },
    title: { zh: '从星海回来的旅人', en: 'Traveler Returned from the Star Sea' },
    rarity: 6,
    element: { zh: '星', en: 'Star' },
    medium: { zh: '星光', en: 'Starlight' },
    affiliation: { zh: '星海 · 与维尔汀同行', en: 'The star sea · travelling with Vertin' },
    identity: {
      zh: '远旅从很远的地方来，远到她的时间单位和人类不一样。她很少解释自己看见了什么，更多时候只是指一指：一颗很暗的星、窗上的一小片光、箱子里突然响起的风声。她对世界的好奇不带占有欲，像一位路过的旅人，愿意坐下来听一会儿，却不把任何地方叫作“家”。',
      en: 'Voyager comes from very far away — far enough that her units of time are not human ones. She rarely explains what she has seen; more often she simply points: a dim star, a fleck of light on the window, the sound of wind suddenly rising inside the case. Her curiosity does not want to possess. She is a traveller who will sit and listen for a while, without calling any place home.',
    },
    personality: {
      zh: [
        '安静，不急着把沉默填满。她的停顿不是拒绝，而是她正在把人类的词找出来。',
        '对细小的事物有惊人的耐心：一盏灯、一片玻璃、一个人没有说完的半句话。',
        '不擅长告别，也不假装擅长。她会把告别放进一个很小的动作里。',
      ],
      en: [
        'Quiet, in no hurry to fill silence. Her pauses are not refusal; she is looking for the human word.',
        'She has extraordinary patience for small things: a lamp, a piece of glass, the half-sentence someone did not finish.',
        'She is not good at goodbyes and does not pretend to be. She puts them inside a very small gesture.',
      ],
    },
    voice: {
      zh: [
        '句子干净，偶尔缺少人类习惯的连接词，像从另一种语言直译过来。',
        '常用“这里”“那里”“很亮”“很远”这类空间词，而不是判断词。',
        '被问到私人感受时会停一下，然后给出一个具体的观察，而不是抽象答案。',
      ],
      en: [
        'Clean sentences, sometimes missing the connectors humans expect, as if translated directly from another language.',
        'She reaches for spatial words — here, there, bright, far — rather than judgements.',
        'Asked about a private feeling, she pauses, then offers a concrete observation instead of an abstract answer.',
      ],
    },
    relationships: [
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '她愿意在桌边停下的理由之一。远旅不把维尔汀当成目的地，而是当成一段可以一起走的路。',
          en: 'One of the reasons she is willing to stop at the desk. Voyager does not treat Vertin as a destination, but as a road that can be walked together for a while.',
        },
      },
      {
        name: { zh: '星海', en: 'The star sea' },
        role: {
          zh: '她来自的地方，也是她不断回望的地方。她从不把它描述成浪漫的远方，只说“那里很冷，也很亮”。',
          en: 'Where she comes from, and where she keeps looking back. She never calls it a romantic faraway place; she only says, “It is cold there, and very bright.”',
        },
      },
      {
        name: { zh: '箱子', en: 'The suitcase' },
        role: {
          zh: '她把手掌贴上去时，箱子里会响起很远的风。她似乎能听见一些维尔汀听不见的方向。',
          en: 'When she lays her palm on it, faraway wind rises inside. She seems to hear directions Vertin cannot.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '涉及远旅的来处与星海相关剧情，默认隐藏。',
        en: 'Spoilers for Voyager’s origin and the star-sea story. Hidden by default.',
      },
      story: {
        zh: [
          '远旅的旅途比人类的历史更长。她见过许多文明熄灭，也见过一些很小的光在熄灭之后继续走了很久。',
          '她并不把“拯救”当作自己的任务。她更常做的，是在某个人抬头的时候，让一颗星刚好在那里。',
          '她最终没有留下来。但她留下了一小片星光，和一句没有说完的“下次”。',
        ],
        en: [
          'Voyager’s journey is longer than human history. She has seen many civilisations go dark, and small lights continue for a long time after they go out.',
          'She does not treat “saving” as her task. More often she simply makes sure a star is there when someone looks up.',
          'She does not stay in the end. She leaves a small piece of starlight, and an unfinished “next time.”',
        ],
      },
    },
    lines: [
      { zh: '远旅很少说话。她指给我看一颗很暗的星，说它其实一直在那里。', en: 'Voyager rarely speaks. She pointed to a very dim star and said it had been there all along.' },
      { zh: '她把手掌贴在箱子上，箱子里就响起很远的风声。', en: 'She laid her palm on the case, and faraway wind rose inside it.' },
      { zh: '她离开时没有告别，只在我窗上留下一小片星光。', en: 'She left without goodbye, only a small piece of starlight on my window.' },
    ],
    sources: [
      { label: '远旅 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E8%BF%9C%E6%97%85' },
      { label: '星海剧情 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/1.4' },
    ],
    completion: { level: 'dossier-v4', zh: '深度档案 v4 · 热门补齐', en: 'Dossier v4 · popular batch' },
  },

  centurion: {
    id: 'centurion',
    archiveName: '百夫长',
    nameZh: '百夫长',
    nameEn: 'Centurion',
    aliases: { zh: ['旧时代的士兵'], en: ['Soldier of an Old Age'] },
    title: { zh: '最后一个出发的人', en: 'The Last to Leave' },
    rarity: 6,
    element: { zh: '兽', en: 'Beast' },
    medium: { zh: '军纪', en: 'Discipline' },
    affiliation: { zh: '旧罗马军团', en: 'An old Roman legion' },
    identity: {
      zh: '百夫长是一名从旧时代走来的士兵。他把盔甲擦得很亮，不是为了好看，而是为了让同伴在雾里看见他。他数人行军，数到最后一个才肯出发；他相信纪律不是让人变得坚硬，而是让柔软的东西有地方躲。他说话像在点名，先把每个人确认一遍。',
      en: 'Centurion is a soldier who walked out of an older age. He keeps his armour bright not for display but so his companions can see him in the fog. He counts the march and refuses to set out until the last person is counted. Discipline, he believes, does not make people hard; it gives soft things somewhere to hide. He speaks like a roll call, confirming each person first.',
    },
    personality: {
      zh: [
        '把责任放在情绪前面，但不是没有情绪。他只是习惯先确认队伍完整，再处理自己。',
        '对旧时代的规矩有固执的忠诚，也愿意承认有些规矩已经不该继续。',
        '不擅长说“我在意”，更擅长把最后一份口粮留给别人。',
      ],
      en: [
        'Puts duty before feeling, but is not without feeling. He is simply used to checking that the column is intact before attending to himself.',
        'He is stubbornly loyal to the rules of an old age, and willing to admit some of them should no longer continue.',
        'He is bad at saying “I care,” and better at leaving the last ration for someone else.',
      ],
    },
    voice: {
      zh: [
        '短句、命令式开头，但结尾常留一个确认：“都听见了吗？”',
        '不用华丽比喻。他更愿意说方向、人数、还剩多少路。',
        '真正疲惫时会突然用很轻的声音说一句家常话，像把盔甲暂时放下。',
      ],
      en: [
        'Short sentences, often beginning like an order, but ending with a check: “Everyone heard that?”',
        'He avoids ornate metaphors. He prefers direction, numbers, how much road is left.',
        'When truly tired he suddenly says something domestic in a very low voice, as if setting the armour down for a moment.',
      ],
    },
    relationships: [
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '他愿意跟随的司辰，但不是无条件服从。百夫长会提出异议，也会在决定之后把最后一个人带回来。',
          en: 'A Timekeeper he is willing to follow, though not unconditionally. Centurion will object, and after the decision he will bring the last person back.',
        },
      },
      {
        name: { zh: '军团', en: 'The legion' },
        role: {
          zh: '他记得每一个人的名字和位置。军团已经不是一支完整的队伍，但他仍按完整队伍的方式点名。',
          en: 'He remembers every name and position. The legion is no longer a full unit, but he still calls the roll as if it were.',
        },
      },
      {
        name: { zh: '旧时代', en: 'The old age' },
        role: {
          zh: '他来自的地方，也是他无法回去的地方。他不把怀旧当借口，只把它当作一份需要继续履行的责任。',
          en: 'Where he comes from, and where he cannot return. He does not use nostalgia as an excuse; he treats it as a duty still to be carried out.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '涉及百夫长的军团经历与旧时代剧情，默认隐藏。',
        en: 'Spoilers for Centurion’s legion and old-age story. Hidden by default.',
      },
      story: {
        zh: [
          '百夫长见过军团在雾里散开，也见过有人在最后一刻回头。他把这些事记成队形，而不是故事。',
          '他并不认为自己被时代抛下。他更愿意说，自己只是走得慢了一点，还在把最后一个人数完。',
          '当他终于允许自己坐下来，盔甲仍然放在手边。不是不信任桌边的人，只是他已经这样活得太久。',
        ],
        en: [
          'Centurion has seen a legion come apart in fog, and seen someone turn back at the last moment. He remembers these things as formations, not stories.',
          'He does not think the age abandoned him. He prefers to say he is simply walking a little slower, still counting the last person.',
          'When he finally allows himself to sit, the armour stays within reach. Not from distrust of the table, but because he has lived this way too long.',
        ],
      },
    },
    lines: [
      { zh: '百夫长把盔甲擦得很亮，说这不是为了好看，是为了让同伴在雾里看见他。', en: 'Centurion kept his armour bright. Not for looks, he said, but so his companions could see him in the fog.' },
      { zh: '他数人行军，数到最后一个才肯出发。', en: 'He counted the column and would not set out until the last person was counted.' },
      { zh: '他相信纪律不是让人变得坚硬，是让柔软的东西有地方躲。', en: 'He believed discipline does not make people hard; it gives soft things somewhere to hide.' },
    ],
    sources: [
      { label: '百夫长 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E7%99%BE%E5%A4%AB%E9%95%BF' },
      { label: '旧时代剧情 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/1.3' },
    ],
    completion: { level: 'dossier-v4', zh: '深度档案 v4 · 热门补齐', en: 'Dossier v4 · popular batch' },
  },

  medicinepocket: {
    id: 'medicinepocket',
    archiveName: '兔毛手袋',
    nameZh: '兔毛手袋',
    nameEn: 'Medicine Pocket',
    aliases: { zh: ['医生'], en: ['The Doctor'] },
    title: { zh: '把伤口留给光的人', en: 'The One Who Lets Wounds See Light' },
    rarity: 6,
    element: { zh: '兽', en: 'Beast' },
    medium: { zh: '医学', en: 'Medicine' },
    affiliation: { zh: '流动诊所 · 圣洛夫基金会', en: 'Travelling clinic · St. Pavlov Foundation' },
    identity: {
      zh: '兔毛手袋是一名医生，诊室里有薄荷和旧绷带的味道。他先把听诊器捂热，再放到病人胸口；他相信治愈不是把伤口藏起来，而是让它有机会长好。他的方法有时不合规矩，但只要病人还愿意回来，他就会把下一次门诊留出来。',
      en: 'Medicine Pocket is a doctor whose surgery smells of mint and old bandages. He warms the stethoscope before placing it on a patient’s chest; he believes healing is not hiding a wound but giving it a chance to close. His methods are sometimes irregular, but as long as a patient is willing to return, he keeps the next appointment open.',
    },
    personality: {
      zh: [
        '温和但不哄人。他会把病情说清楚，也会承认自己不确定。',
        '对“治愈”有近乎固执的耐心。他不催伤口，也不允许病人假装已经好了。',
        '有一点古怪的幽默，常拿自己的手袋和器械开玩笑，让诊室不那么像诊室。',
      ],
      en: [
        'Gentle without coaxing. He explains the condition plainly and admits when he is unsure.',
        'He is stubbornly patient about “healing.” He does not hurry a wound, and does not let a patient pretend it has already closed.',
        'He has an odd humour, often joking about his bag and instruments so the surgery feels less like a surgery.',
      ],
    },
    voice: {
      zh: [
        '问诊式，但会先给病人一个能坐下来的理由。',
        '把医学术语翻成日常话，再补一句“这只是我的判断，不是判决”。',
        '不说“你会没事的”。他更愿意说“今天先处理这里”。',
      ],
      en: [
        'Consultation-style, but first gives the patient a reason to sit down.',
        'He translates medical language into ordinary words, then adds, “That is my read, not a verdict.”',
        'He does not say “you will be fine.” He prefers “today we deal with this part.”',
      ],
    },
    relationships: [
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '一个总把自己放在最后的人。兔毛手袋会先问她“你哪里不舒服”，再问“你为什么觉得不该说”。',
          en: 'Someone who always puts herself last. Medicine Pocket asks “where does it hurt” before “why did you think you should not say.”',
        },
      },
      {
        name: { zh: '病人', en: 'Patients' },
        role: {
          zh: '他不会把病人变成病例。他记得他们带来的味道、坐姿和没有说完的话。',
          en: 'He does not turn patients into case files. He remembers the smell they brought in, how they sat, and the sentence they did not finish.',
        },
      },
      {
        name: { zh: '手袋', en: 'The bag' },
        role: {
          zh: '一只旧医疗手袋，里面什么都有，唯独没有“保证”。',
          en: 'An old medical bag. It contains everything except a guarantee.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '涉及兔毛手袋的诊疗经历与相关剧情，默认隐藏。',
        en: 'Spoilers for Medicine Pocket’s practice and related story. Hidden by default.',
      },
      story: {
        zh: [
          '兔毛手袋见过太多来不及处理的伤口。他因此不太相信“以后”，更相信今天能做的处置。',
          '他不把病人当成需要被拯救的人，而是当成可以一起决定下一步的人。',
          '他的诊室最终没有变得更大，但门口的灯一直亮着。',
        ],
        en: [
          'Medicine Pocket has seen too many wounds that were treated too late. He therefore distrusts “later” and trusts what can be done today.',
          'He does not treat patients as people to be rescued, but as people who can decide the next step with him.',
          'His surgery never became larger, but the lamp by the door stayed on.',
        ],
      },
    },
    lines: [
      { zh: '兔毛手袋的诊室里有股薄荷和旧绷带的味道。', en: 'Medicine Pocket’s surgery smelled of mint and old bandages.' },
      { zh: '他先把听诊器捂热，再放到病人胸口。', en: 'He warmed the stethoscope before placing it on the patient’s chest.' },
      { zh: '他说，治愈不是把伤口藏起来，是让它有机会长好。', en: 'He said healing is not hiding the wound; it is giving it a chance to close.' },
    ],
    sources: [
      { label: '兔毛手袋 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E5%85%94%E6%AF%9B%E6%89%8B%E8%A2%8B' },
      { label: '基金会医疗线 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E5%9C%A3%E6%B4%9B%E5%A4%AB%E5%9F%BA%E9%87%91%E4%BC%9A' },
    ],
    completion: { level: 'dossier-v4', zh: '深度档案 v4 · 热门补齐', en: 'Dossier v4 · popular batch' },
  },
};
