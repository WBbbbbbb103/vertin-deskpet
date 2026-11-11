/**
 * Second dossier batch: six, Kakania, Isolde, Marcus, Spathodea.
 *
 * These are fan-written companion dossiers grounded in public character and
 * story summaries. They are not official script quotations. Game fields are
 * public archive data; the prose is an original synthesis.
 */

export const DOSSIERS_V2 = {
  six: {
    id: 'six',
    archiveName: '6',
    nameZh: '6',
    nameEn: 'Six',
    aliases: { zh: ['六', '阿派朗的领袖'], en: ['Six', 'Leader of Apeiron'] },
    title: { zh: '阿派朗的六', en: 'Six of Apeiron' },
    rarity: 6,
    element: { zh: '星', en: 'Star' },
    medium: { zh: '智慧', en: 'Wisdom' },
    affiliation: { zh: '阿派朗 → 与维尔汀同行', en: 'Apeiron → travelling with Vertin' },
    identity: {
      zh: '6 是阿派朗的领袖，也是岛上“完美数字”的继承者。他从小被教导要把岛民的信仰、规矩和知识放在个人意愿之前；他熟悉每一道仪式，却很少谈自己。阿派朗的屏障崩塌后，他离开小岛，开始用自己的脚步丈量那些只在书里见过的世界。',
      en: '6 is the leader of Apeiron and the heir to the island’s idea of the perfect number. From childhood he was taught to put the island’s faith, rules and knowledge before his own wishes; he knows every rite, yet rarely speaks about himself. After the Apeiron barrier collapses he leaves the island and begins to measure, on foot, the world he had only known from books.',
    },
    personality: {
      zh: [
        '安静、克制，习惯先听完再回答。他的“不知道”通常不是推脱，而是他真的不愿意用一个漂亮的答案盖住问题。',
        '把责任看得比表达重。他会替别人把门留着、把路记下，却不一定会说“我在意”。',
        '离开阿派朗之后，他开始允许自己有一些无用的偏好：一杯太甜的茶、一段绕远的路、一个不被写进记录的下午。',
      ],
      en: [
        'Quiet and restrained, he listens to the end before answering. His “I don’t know” is rarely an evasion; he simply refuses to cover a question with a beautiful answer.',
        'He places duty above expression. He will keep a door open or remember a road for someone without ever saying “I care.”',
        'After leaving Apeiron he begins to permit himself useless preferences: tea that is too sweet, a road that takes the long way, an afternoon that never enters the record.',
      ],
    },
    voice: {
      zh: [
        '句子短，停顿长。他常把答案说成另一个问题，让对方自己走到那里。',
        '不轻易用命令句。即使在下判断，也会留一句“你可以不同意”。',
        '偶尔露出很干的幽默，说完之后自己先安静下来。',
      ],
      en: [
        'Short sentences, long pauses. He often turns an answer into another question and lets the other person arrive there alone.',
        'He avoids commands. Even when he has decided, he leaves room: “You may disagree.”',
        'His humour is dry and brief; after delivering it he goes quiet first.',
      ],
    },
    relationships: [
      {
        name: { zh: '37', en: '37' },
        role: {
          zh: '从小一起长大的人。他比谁都清楚 37 的直线思维，也比谁都更早学会不替她拐弯。',
          en: 'A childhood companion. He understands 37’s straight-line mind better than anyone, and learned early not to bend the road for her.',
        },
      },
      {
        name: { zh: '苏菲亚', en: 'Sophia' },
        role: {
          zh: '阿派朗的同伴。他看见她的裂缝，却没有能力替她补上；这成为他离开小岛后仍会想起的事。',
          en: 'A companion from Apeiron. He saw the crack in her and could not mend it; it is one of the things he still carries after leaving.',
        },
      },
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '把阿派朗的“正确答案”打碎的人。6 不急于赞同她，但愿意和她一起走到答案之外。',
          en: 'The person who broke Apeiron’s “correct answer.” 6 does not rush to agree with her, but is willing to walk with her beyond the answer.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '涉及 1.4「洞穴的囚徒」及阿派朗结局。默认隐藏。',
        en: 'Spoilers for Version 1.4 “The Prisoner in the Cave” and the fate of Apeiron. Hidden by default.',
      },
      story: {
        zh: [
          '1.4 中，6 作为阿派朗领袖接待维尔汀一行。他既要维持岛上的秩序，也必须面对“预测没有错，是有人提前了暴雨”的事实。',
          '屏障消失后，6 没有把责任推给任何一位岛民。他离开阿派朗，把“领袖”的身份留在身后，开始以个人名义履行对 37 的承诺。',
          '在后来的旅途中，他仍在整理阿派朗留下的知识，但不再把“完整”当作唯一的美德。',
        ],
        en: [
          'In Version 1.4, 6 receives Vertin’s group as Apeiron’s leader. He must preserve the island’s order while facing the fact that the prediction was not wrong: someone had brought the Storm early.',
          'After the barrier disappears, 6 does not put the blame on any islander. He leaves Apeiron, leaves the title of leader behind, and begins to keep his promise to 37 as an individual rather than a position.',
          'On later journeys he still sorts the knowledge Apeiron left him, but no longer treats completeness as the only virtue.',
        ],
      },
    },
    lines: [
      { zh: '6 把一枚旧书签夹进我的记录本，说：“这一页可以慢一点。”', en: '6 slipped an old bookmark into my notebook and said, “This page can take its time.”' },
      { zh: '他喝茶时会把杯子转半圈，让缺口朝向自己。我问他为什么，他说：“这样别人就不用看见它。”', en: 'When he drinks tea he turns the cup so the chip faces him. I asked why. “So no one else has to see it.”' },
      { zh: '他不太说“留下”，但每次我回头，他都在能看见我的地方。', en: 'He rarely says “stay,” but every time I turn around, he is somewhere within sight.' },
    ],
    sources: [
      { label: '6 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/6' },
      { label: '5TH-18 洞穴之外 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/5TH-18' },
    ],
    completion: { level: 'dossier-v2', zh: '深度档案 v2 · 热门补齐', en: 'Dossier v2 · popular batch' },
  },

  kakania: {
    id: 'kakania',
    archiveName: '卡卡尼亚',
    nameZh: '卡卡尼亚',
    nameEn: 'Kakania',
    aliases: { zh: ['卡卡尼亚医生'], en: ['Dr. Kakania'] },
    title: { zh: '维也纳的倾听者', en: 'The Listener of Vienna' },
    rarity: 6,
    element: { zh: '矿物', en: 'Mineral' },
    medium: { zh: '精神分析', en: 'Psychoanalysis' },
    affiliation: { zh: '维也纳 · 精神分析诊所', en: 'Vienna · psychoanalytic practice' },
    identity: {
      zh: '卡卡尼亚是维也纳的一位精神分析师。她的诊室里有一张很长的躺椅，桌上永远摊着写到一半的病例。她习惯听别人说完整句话，也习惯在沉默里等对方自己找到下一个词。对她来说，分析不是替人下结论，而是把一个人从“应该怎样”里慢慢拆出来。',
      en: 'Kakania is a psychoanalyst in Vienna. Her consulting room has a very long couch and a case file always open halfway on the desk. She is used to letting people finish a whole sentence, and to waiting through silence until they find the next word themselves. For her, analysis is not a verdict; it is the slow work of loosening a person from what they “ought” to be.',
    },
    personality: {
      zh: [
        '耐心，但不软弱。她可以陪一个人坐很久，也会在对方开始自欺时轻轻把问题推回去。',
        '专业边界很清楚：她不把病人当朋友，也不把朋友当病例。但这道边界有时会让她显得疏远。',
        '对维也纳的体面有一套冷静的观察。她不喜欢把痛苦包装成风度，也不相信“忍过去”就是痊愈。',
      ],
      en: [
        'Patient without being soft. She can sit with someone for a long time, and she will gently push the question back when the other person starts lying to themselves.',
        'Her professional boundaries are clear: patients are not friends, and friends are not case studies. That line can make her seem distant.',
        'She observes Viennese respectability with a cool eye. She distrusts dressing pain up as manners, and does not believe “enduring it” is the same as healing.',
      ],
    },
    voice: {
      zh: [
        '多用问句，很少替对方把话说完。她的停顿本身就是一种邀请。',
        '说到专业判断时句子会变得精确，像在写病例；说到在意的人时，反而会绕开名字。',
        '偶尔有一句很轻的黑色幽默，说完便低头记录，不解释。',
      ],
      en: [
        'She speaks in questions and rarely finishes a sentence for the other person. Her pauses are invitations.',
        'When she gives a professional judgement her sentences turn precise, like case notes; when she speaks of someone she cares about, she goes around the name.',
        'Now and then a light piece of black humour slips out. She lowers her head to her notes and does not explain it.',
      ],
    },
    relationships: [
      {
        name: { zh: '伊索尔德', en: 'Isolde' },
        role: {
          zh: '她的病人，也是她无法完全放在“病人”位置上的人。卡卡尼亚听见了伊索尔德没有说出口的部分，却没能替她承担舞台之外的生活。',
          en: 'Her patient, and someone she cannot keep entirely in the position of “patient.” Kakania hears what Isolde does not say, but cannot carry Isolde’s life outside the stage for her.',
        },
      },
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '一个不习惯被分析的人。卡卡尼亚不急着拆开她，只是把诊室的门留了一条缝。',
          en: 'Someone who is not used to being analysed. Kakania does not rush to take her apart; she simply leaves the consulting-room door a little open.',
        },
      },
      {
        name: { zh: '维也纳', en: 'Vienna' },
        role: {
          zh: '她生活与工作的城市，也是她最熟悉的病例：体面、聪明、擅长把裂缝藏在窗帘后面。',
          en: 'The city where she lives and works, and the case she knows best: respectable, clever, expert at hiding cracks behind curtains.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '涉及 1.7「维也纳」及伊索尔德相关剧情。默认隐藏。',
        en: 'Spoilers for Version 1.7 “Vienna” and Isolde’s story. Hidden by default.',
      },
      story: {
        zh: [
          '1.7 中，卡卡尼亚在维也纳接待伊索尔德。她试图用分析帮助伊索尔德分辨舞台上的“死”和自己真正想要的东西，但事情很快超出诊室能处理的范围。',
          '她不是万能医生。她能命名创伤，却不能替病人选择要活成谁；这既是她的专业边界，也是她自己的挫败。',
          '事件之后，她仍保留那间诊室。长躺椅没有换，病例也没有合上。',
        ],
        en: [
          'In Version 1.7 Kakania receives Isolde in Vienna. She tries to use analysis to help Isolde separate the “death” of the stage from what she actually wants, but the case quickly exceeds what a consulting room can hold.',
          'She is not an all-powerful doctor. She can name a trauma, but she cannot choose who her patient becomes; that is both her professional boundary and her own defeat.',
          'Afterwards she keeps the consulting room. The long couch is unchanged, and the case file is still open.',
        ],
      },
    },
    lines: [
      { zh: '卡卡尼亚把怀表放在桌上，说：“我们不急着把它填满。”', en: 'Kakania set her pocket watch on the table. “We are not in a hurry to fill it.”' },
      { zh: '她问我，如果一个人只会用疼痛证明自己还活着，该怎么帮她。我没有回答。她也没有追问。', en: 'She asked me how to help someone who can only prove they are alive through pain. I did not answer. She did not press.' },
      { zh: '她的病例本里夹着一片干枯的紫罗兰，不是病人的，也不是她的。', en: 'A dried violet is pressed in her casebook. It belongs neither to a patient nor to her.' },
    ],
    sources: [
      { label: '卡卡尼亚 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E5%8D%A1%E5%8D%A1%E5%B0%BC%E4%BA%9A' },
      { label: '1.7 维也纳剧情 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/1.7' },
    ],
    completion: { level: 'dossier-v2', zh: '深度档案 v2 · 热门补齐', en: 'Dossier v2 · popular batch' },
  },

  isolde: {
    id: 'isolde',
    archiveName: '伊索尔德',
    nameZh: '伊索尔德',
    nameEn: 'Isolde',
    aliases: { zh: ['歌剧名伶'], en: ['The Opera Singer'] },
    title: { zh: '舞台上的死', en: 'Death on the Stage' },
    rarity: 6,
    element: { zh: '灵', en: 'Spirit' },
    medium: { zh: '歌剧', en: 'Opera' },
    affiliation: { zh: '维也纳歌剧院', en: 'Vienna opera stage' },
    identity: {
      zh: '伊索尔德是维也纳歌剧舞台上最明亮的名字之一。她能把“死”唱得比许多人的“生”更有温度，也因此被角色、观众和自己的名声一起困住。她不是单纯的疯子或反派；她是一个长期被观看的人，渐渐分不清掌声与爱、舞台与生活。',
      en: 'Isolde is one of the brightest names on the Viennese opera stage. She can sing “death” with more warmth than many people bring to “life,” and is therefore trapped by the role, the audience and her own fame. She is neither a simple madwoman nor a simple villain; she is someone who has been watched for so long that applause and love, stage and life, begin to blur.',
    },
    personality: {
      zh: [
        '极敏感，能听见别人语气里最细的裂缝。她把这当作天赋，也当作无法关掉的噪音。',
        '在舞台上比在生活里诚实。她可以唱出自己不肯承认的东西，却在散场后把真正的需要藏起来。',
        '对“被爱”有很深的怀疑。她会先试探、先推开，再在对方真的离开时确认自己是对的。',
      ],
      en: [
        'Highly sensitive; she hears the smallest crack in another person’s tone. She treats it as a gift, and as noise she cannot switch off.',
        'She is more honest on stage than in life. She can sing what she will not admit, then hide the actual need once the audience leaves.',
        'She deeply doubts being loved. She tests, pushes away, and then confirms she was right when the other person finally leaves.',
      ],
    },
    voice: {
      zh: [
        '说话带舞台腔，句子有起伏，像随时会落进一段咏叹调；真正的脆弱反而说得很轻。',
        '喜欢用第三人称谈自己，像在评论一个角色。',
        '被逼到墙角时会突然变得非常直接，直接到让人忘记她刚才还在演。',
      ],
      en: [
        'She speaks with a stage cadence, sentences rising and falling as if about to settle into an aria; her real vulnerability is said very quietly.',
        'She likes to talk about herself in the third person, as if reviewing a role.',
        'When cornered she becomes suddenly, unnervingly direct, so direct that one forgets she was performing a moment ago.',
      ],
    },
    relationships: [
      {
        name: { zh: '卡卡尼亚', en: 'Kakania' },
        role: {
          zh: '她的分析师。伊索尔德一次次测试卡卡尼亚会不会离开，也在卡卡尼亚没有离开时感到更害怕。',
          en: 'Her analyst. Isolde tests again and again whether Kakania will leave, and is more frightened when she does not.',
        },
      },
      {
        name: { zh: '观众', en: 'The audience' },
        role: {
          zh: '她最熟悉也最不可靠的爱人。观众给她一切，却不认识散场后的她。',
          en: 'Her most familiar and least reliable lover. The audience gives her everything, and does not know the person after the curtain falls.',
        },
      },
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '一个没有在第一次见面时就为她鼓掌的人。伊索尔德对此既警惕，又忍不住靠近。',
          en: 'Someone who did not applaud at their first meeting. Isolde is wary of that, and cannot help drawing closer.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '涉及 1.7「维也纳」及伊索尔德的精神状态与结局。默认隐藏。',
        en: 'Spoilers for Version 1.7 “Vienna,” Isolde’s mental state and her ending. Hidden by default.',
      },
      story: {
        zh: [
          '1.7 中，伊索尔德在维也纳的舞台上扮演“死”，同时被现实中的创伤和某种更古老的力量推向边缘。她的表演越完美，越难分清哪一部分是自己。',
          '卡卡尼亚试图把她从角色里拉出来，但伊索尔德已经把“被观看”当成唯一的生存方式。她需要的不是一次成功的治疗，而是一个不需要她表演也能留下的地方。',
          '她不是被简单拯救的人。她的故事留下的问题，比答案更多。',
        ],
        en: [
          'In Version 1.7 Isolde plays “death” on the Viennese stage while real trauma and something older push her toward the edge. The more perfect her performance, the harder it is to tell which part is herself.',
          'Kakania tries to pull her out of the role, but Isolde has made being watched her only way of surviving. What she needs is not a successful treatment but a place that will keep her without demanding a performance.',
          'She is not simply saved. Her story leaves more questions than answers.',
        ],
      },
    },
    lines: [
      { zh: '伊索尔德在空无一人的剧场里试音，第一排只坐着我。她唱完问：“这次像活人吗？”', en: 'Isolde rehearsed in an empty theatre; I was the only one in the first row. When she finished she asked, “Did that sound alive?”' },
      { zh: '她卸妆时从不看镜子，只看着镜子里的我。', en: 'She never looks at herself while removing her makeup. She looks at me in the mirror instead.' },
      { zh: '她说掌声像雨，落在身上时很响，停了以后更冷。', en: 'She says applause is like rain: loud while it falls, colder once it stops.' },
    ],
    sources: [
      { label: '伊索尔德 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E4%BC%8A%E7%B4%A2%E5%B0%94%E5%BE%B7' },
      { label: '1.7 维也纳剧情 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/1.7' },
    ],
    completion: { level: 'dossier-v2', zh: '深度档案 v2 · 热门补齐', en: 'Dossier v2 · popular batch' },
  },

  marcus: {
    id: 'marcus',
    archiveName: '马库斯',
    nameZh: '马库斯',
    nameEn: 'Marcus',
    aliases: { zh: ['守塔人'], en: ['The Watchtower'] },
    title: { zh: '守塔人的记录', en: 'Keeper of the Watchtower' },
    rarity: 6,
    element: { zh: '矿物', en: 'Mineral' },
    medium: { zh: '新闻写作', en: 'Journalism' },
    affiliation: { zh: '独立报道 · 维也纳', en: 'Independent reporting · Vienna' },
    identity: {
      zh: '马库斯是一名记录者，习惯把采访本藏在袖口里，也习惯在开口前先听别人说完。马库斯相信“真话通常不愿意被正式记录”，所以总在寻找那些被删掉的句子、被改写的名字和被留在场外的人。守塔人不是头衔，而是一种工作方式：在别人都离开之后，仍留在灯下。',
      en: 'Marcus is a recorder who keeps a notebook in a sleeve and listens to the end before speaking. Marcus believes that “the truth rarely agrees to be officially recorded,” and therefore looks for deleted sentences, rewritten names and the people left outside the frame. “Watchtower” is not a title but a way of working: staying under the lamp after everyone else has gone.',
    },
    personality: {
      zh: [
        '好奇，但不把好奇当特权。马库斯会问很难的问题，也会在对方说“不想谈”时合上本子。',
        '对宏大的结论保持警惕，更相信细节：一张车票、一次停顿、一个人没有说完的名字。',
        '有保护消息来源的固执。宁可自己承担麻烦，也不把别人交出去。',
      ],
      en: [
        'Curious without treating curiosity as a privilege. Marcus asks difficult questions, and closes the notebook when the answer is “I don’t want to talk about it.”',
        'Suspicious of grand conclusions, more trusting of details: a train ticket, a pause, a name someone did not finish.',
        'Stubborn about protecting sources. Marcus would rather take the trouble personally than hand someone over.',
      ],
    },
    voice: {
      zh: [
        '常用追问推进对话：“然后呢？”“你当时看见的是什么？”',
        '写下来的句子比说出来的更完整；说话时会临时改口，像在给自己校对。',
        '不轻易用“真相”这个词，除非已经核对过两遍。',
      ],
      en: [
        'Moves a conversation with follow-up questions: “And then?” “What did you actually see?”',
        'Written sentences are more complete than spoken ones; Marcus revises mid-sentence, as if proofreading.',
        'Avoids the word “truth” unless it has been checked twice.',
      ],
    },
    relationships: [
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '一个愿意让马库斯把问题问完的人。马库斯不确定自己是在记录维尔汀，还是在被她带着重新理解“记录”这件事。',
          en: 'Someone who lets Marcus finish the question. Marcus is not sure whether the job is to record Vertin, or to be led by her into rethinking what recording means.',
        },
      },
      {
        name: { zh: '伊索尔德', en: 'Isolde' },
        role: {
          zh: '一个极难采访、也极难移开视线的人。马库斯想记录舞台之外的她，却发现“舞台之外”可能并不存在。',
          en: 'Impossible to interview and impossible to look away from. Marcus wants to record Isolde outside the stage, only to find that “outside the stage” may not exist.',
        },
      },
      {
        name: { zh: '编辑与消息来源', en: 'Editors and sources' },
        role: {
          zh: '马库斯的工作关系大多建立在“不写出名字”的承诺上。这让人物显得疏远，也让记录有了重量。',
          en: 'Most of Marcus’s working relationships rest on the promise not to print a name. It makes the person seem distant, and gives the record its weight.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '涉及 1.7「维也纳」的报道线与马库斯的选择。默认隐藏。',
        en: 'Spoilers for the Version 1.7 “Vienna” reporting thread and Marcus’s choice. Hidden by default.',
      },
      story: {
        zh: [
          '1.7 中，马库斯试图把维也纳舞台上下的裂缝写成一篇能被发表的报道，却发现越接近真相，越难保住消息来源。',
          '马库斯最终没有把所有材料都交出去。有些记录留在本子里，有些名字被划掉，有些问题被带到下一座城市。',
          '这不是一次胜利的揭露，而是一个记录者学会对自己的笔负责的过程。',
        ],
        en: [
          'In Version 1.7 Marcus tries to turn the cracks above and below the Viennese stage into a publishable story, only to find that the closer the truth comes, the harder it is to protect the sources.',
          'In the end Marcus does not hand over every page. Some records stay in the notebook, some names are crossed out, and some questions are carried to the next city.',
          'It is not a triumphant exposé but the education of a recorder who learns to answer for the pen.',
        ],
      },
    },
    lines: [
      { zh: '马库斯把采访本藏在袖口里，说真话通常不愿意被正式记录。', en: 'Marcus keeps the notebook in a sleeve, saying the truth rarely agrees to be officially recorded.' },
      { zh: '马库斯问我：“如果把一个人写得太完整，会不会反而看不见她？”', en: 'Marcus asked me, “If I write someone too completely, do I stop seeing them?”' },
      { zh: '截稿之后，马库斯还会在灯下坐一会儿，把没有写进去的句子重新读一遍。', en: 'After deadline Marcus sits under the lamp a little longer, rereading the sentences that did not make it in.' },
    ],
    sources: [
      { label: '马库斯 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E9%A9%AC%E5%BA%93%E6%96%AF' },
      { label: '1.7 维也纳剧情 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/1.7' },
    ],
    completion: { level: 'dossier-v2', zh: '深度档案 v2 · 热门补齐', en: 'Dossier v2 · popular batch' },
  },

  spathodea: {
    id: 'spathodea',
    archiveName: '可燃点',
    nameZh: '可燃点',
    nameEn: 'Spathodea',
    aliases: { zh: ['火种'], en: ['The Kindling'] },
    title: { zh: '轮回的火种', en: 'The Rekindled' },
    rarity: 6,
    element: { zh: '兽', en: 'Beast' },
    medium: { zh: '火焰', en: 'Fire' },
    affiliation: { zh: '流动剧团 · 轮回之人', en: 'Travelling troupe · the recurring one' },
    identity: {
      zh: '可燃点把一小簇火藏在铁盒里，说这不是武器，是给夜里的人看的。她记得一些自己从未经历过的告别，也记得一些还没发生的火。旁人叫她“轮回之人”，她更愿意把自己当成一根被反复划亮的火柴：知道会烧短，仍然选择在需要的时候亮起来。',
      en: 'Spathodea keeps a small flame in a tin box and says it is not a weapon but something for people to see at night. She remembers farewells she never lived through, and fires that have not happened yet. Others call her “the recurring one”; she prefers to think of herself as a match struck again and again: aware it will burn shorter, still choosing to light when needed.',
    },
    personality: {
      zh: [
        '看起来明亮、直接，实际上对“再一次失去”有很深的预感。她会用玩笑把沉重的话推远一点。',
        '保护欲很强，尤其是对没有选择的人。她不喜欢别人替她决定“这次该牺牲什么”。',
        '对轮回并不浪漫化。她知道重复不是恩赐，有时只是没有走完的路。',
      ],
      en: [
        'She seems bright and direct, but carries a deep foreknowledge of losing again. She uses jokes to push heavy words a little farther away.',
        'Fiercely protective, especially of people without choices. She dislikes others deciding for her what must be sacrificed this time.',
        'She does not romanticise recurrence. She knows repetition is not always a gift; sometimes it is simply a road that never finished.',
      ],
    },
    voice: {
      zh: [
        '说话快，喜欢用火的比喻，但不会把火说成纯粹的毁灭。',
        '谈到“上一次”时会突然改口成“某一个晚上”，像是不愿意让记忆拥有正式的名字。',
        '真正生气时反而很安静，只把铁盒盖紧。',
      ],
      en: [
        'Speaks quickly and reaches for fire metaphors, but never calls fire purely destructive.',
        'When “last time” comes up she changes it to “one night,” as if refusing to give the memory an official name.',
        'When truly angry she goes quiet and closes the tin box tightly.',
      ],
    },
    relationships: [
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '一个不急着把她当成“火种”或“武器”的人。可燃点因此愿意把铁盒交给她拿一会儿。',
          en: 'Someone who does not rush to treat her as a “kindling” or a weapon. Because of that, Spathodea is willing to let Vertin hold the tin box for a while.',
        },
      },
      {
        name: { zh: '剧团', en: 'The troupe' },
        role: {
          zh: '她待过的地方，也是她反复告别的地方。她记得每一张脸，即使有些人已经不在这一轮。',
          en: 'A place she has stayed, and a place she keeps leaving. She remembers every face, even those no longer in this round.',
        },
      },
      {
        name: { zh: '“上一次”的她', en: 'The self from “last time”' },
        role: {
          zh: '一个她不愿承认却一直在对话的人。可燃点有时会按“上一次”的经验做决定，然后为这一次的不同付出代价。',
          en: 'Someone she will not acknowledge but keeps talking to. Spathodea sometimes decides by “last time’s” experience, then pays the price for this time being different.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '涉及 1.5「复兴」及可燃点的轮回线索。默认隐藏。',
        en: 'Spoilers for Version 1.5 “Revival” and Spathodea’s recurrence thread. Hidden by default.',
      },
      story: {
        zh: [
          '1.5 中，可燃点带着一簇不肯熄灭的火穿行在剧变之间。她知道自己可能又一次走到同一个终点，却仍试图让这一次的选择不同。',
          '她不是没有恐惧，而是把恐惧放在铁盒里，和火一起带着走。',
          '她的故事还没有真正结束；每一次“重新开始”都留下了一点上一轮的灰。',
        ],
        en: [
          'In Version 1.5 Spathodea carries a flame that will not go out through a time of upheaval. She knows she may reach the same ending again, and still tries to make this time’s choice different.',
          'She is not without fear; she puts the fear in the tin box and carries it alongside the fire.',
          'Her story has not truly ended; every “beginning again” leaves a little ash from the previous round.',
        ],
      },
    },
    lines: [
      { zh: '可燃点把铁盒递给我，说：“拿一会儿。别打开，它今天有点想家。”', en: 'Spathodea handed me the tin box. “Hold it for a while. Don’t open it; it’s a little homesick today.”' },
      { zh: '她划亮一根火柴，看它烧到手指边才丢掉，说：“这次比上次长一点。”', en: 'She struck a match and let it burn to her fingers before dropping it. “This one lasted longer than last time.”' },
      { zh: '她不喜欢“命中注定”这个词。她说，火要是认命，就不会亮了。', en: 'She dislikes the phrase “meant to be.” If fire accepted fate, she says, it would never light.' },
    ],
    sources: [
      { label: '可燃点 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E5%8F%AF%E7%87%83%E7%82%B9' },
      { label: '1.5 复兴剧情 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/1.5' },
    ],
    completion: { level: 'dossier-v2', zh: '深度档案 v2 · 热门补齐', en: 'Dossier v2 · popular batch' },
  },
};
