/**
 * Third dossier batch: Foundation and First Line figures.
 *
 * These are fan-written companion dossiers grounded in public story summaries.
 * They are not official script quotations; game-field-style labels are marked
 * in the dossier UI, and the prose is an original synthesis.
 */

export const DOSSIERS_V3 = {
  constantine: {
    id: 'constantine',
    archiveName: '康斯坦丁',
    nameZh: '康斯坦丁',
    nameEn: 'Constantine',
    aliases: { zh: ['基金会副会长'], en: ['Deputy Director'] },
    title: { zh: '关门的副会长', en: 'The Deputy Director' },
    rarity: null,
    element: { zh: '—', en: '—' },
    medium: { zh: '—', en: '—' },
    affiliation: { zh: '圣洛夫基金会', en: 'St. Pavlov Foundation' },
    identity: {
      zh: '康斯坦丁是圣洛夫基金会的副会长。她很少提高声音，也不靠情绪压人；她更习惯把门一扇一扇关上，再告诉门外的人这是为了秩序。她真心相信基金会需要有人承担不受欢迎的决定，也真心不觉得自己是故事里的坏人。',
      en: 'Constantine is the deputy director of the St. Pavlov Foundation. She rarely raises her voice and does not rely on emotion to press people; she closes doors one by one and then explains that this is what order requires. She sincerely believes the Foundation needs someone to make the unpopular decisions, and sincerely does not see herself as the villain of the story.',
    },
    personality: {
      zh: [
        '把“稳定”看得比个人感受更重。她不是不知道自己在伤人，而是认为有些伤害必须由某个人来承担。',
        '极度耐心，擅长等待别人先犯错。她的沉默往往比质问更有压迫感。',
        '对维尔汀有一种复杂的在意。她可以软禁维尔汀，也可以在规则允许时给维尔汀留下一条窄路。',
      ],
      en: [
        'Values stability above individual feeling. She knows she hurts people; she believes someone has to carry that cost.',
        'Extremely patient and skilled at waiting for others to make the first mistake. Her silence is often more oppressive than a question.',
        'Her care for Vertin is complicated. She can place Vertin under house arrest and still leave a narrow path open when the rules permit it.',
      ],
    },
    voice: {
      zh: [
        '语速平稳，措辞像公文，但偶尔会用一句很轻的话暴露自己的判断。',
        '常说“这是必要的”，很少说“这是对的”。她知道两者不是一回事。',
        '不威胁人。她只是把选项一个一个拿走，直到你看见她留下的那一个。',
      ],
      en: [
        'Speaks evenly, in language close to an official memo, but sometimes lets a very quiet sentence reveal her judgement.',
        'She often says “this is necessary,” rarely “this is right.” She knows the two are not the same.',
        'She does not threaten. She removes options one by one until you see the one she left.',
      ],
    },
    relationships: [
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '她最不放心、也最不愿放弃的司辰。康斯坦丁想把她留在基金会能控制的范围内，却一次次发现维尔汀会自己走出去。',
          en: 'The Timekeeper she trusts least and refuses to give up on. Constantine wants Vertin inside the Foundation’s可控 range, and keeps discovering that Vertin will walk out on her own.',
        },
      },
      {
        name: { zh: 'Z女士', en: 'Ms. Z' },
        role: {
          zh: '基金会内部最了解她的人之一。两人都相信制度，但对“制度应该保护谁”有不同答案。',
          en: 'One of the people inside the Foundation who understands her best. Both believe in institutions, but disagree about whom the institution should protect.',
        },
      },
      {
        name: { zh: '十四行诗', en: 'Sonetto' },
        role: {
          zh: '她看着长大的学生。康斯坦丁欣赏十四行诗的纪律，也低估了十四行诗最终会选择朋友。',
          en: 'A student she watched grow up. Constantine admires Sonetto’s discipline, and underestimates the day Sonetto will choose her friend.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '涉及基金会内部权力斗争与维尔汀被强制休眠的剧情。默认隐藏。',
        en: 'Spoilers for the Foundation power struggle and Vertin’s forced sleep. Hidden by default.',
      },
      story: {
        zh: [
          '在基金会内部，康斯坦丁以“必要措施”为由软禁维尔汀与相关神秘学家。她相信这是避免更大损失的唯一办法，也准备承担因此被憎恨的后果。',
          '改革方案通过后，她的权力被重新约束。她没有变成另一个人，只是重新学会了在规则里让步。',
          '她仍然认为秩序需要有人守门；只是那扇门不再完全由她一个人决定。',
        ],
        en: [
          'Inside the Foundation, Constantine places Vertin and the related arcanists under house arrest as a “necessary measure.” She believes it is the only way to prevent a greater loss, and is prepared to be hated for it.',
          'After the reform passes, her power is constrained again. She does not become another person; she relearns how to yield inside the rules.',
          'She still believes order needs a gatekeeper. The gate is simply no longer hers alone to decide.',
        ],
      },
    },
    lines: [
      { zh: '康斯坦丁从不提高声音，她只是把门一扇一扇关上。', en: 'Constantine never raises her voice. She simply closes the doors, one by one.' },
      { zh: '她把“为你好”说得很轻，像在给一把锁上油。', en: 'She says “for your own good” very softly, as if oiling a lock.' },
      { zh: '我学会在她的办公室里数窗子：每扇都开着，但没有一扇通向外面。', en: 'I learned to count the windows in her office: all open, none leading outside.' },
    ],
    sources: [
      { label: '康斯坦丁 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E5%BA%B7%E6%96%AF%E5%9D%A6%E4%B8%81' },
      { label: '基金会 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E5%9C%A3%E6%B4%9B%E5%A4%AB%E5%9F%BA%E9%87%91%E4%BC%9A' },
    ],
    completion: { level: 'dossier-v3', zh: '深度档案 v3 · 剧情人物', en: 'Dossier v3 · story figures' },
  },

  msz: {
    id: 'msz',
    archiveName: 'Z女士',
    nameZh: 'Z女士',
    nameEn: 'Ms. Z',
    aliases: { zh: ['Z', '基金会的改革者'], en: ['Z', 'Foundation reformer'] },
    title: { zh: '修屋顶的人', en: 'The One Who Repairs the Roof' },
    rarity: null,
    element: { zh: '—', en: '—' },
    medium: { zh: '—', en: '—' },
    affiliation: { zh: '圣洛夫基金会', en: 'St. Pavlov Foundation' },
    identity: {
      zh: 'Z女士是基金会内部推动改革的人。她不站在台前，也很少说漂亮话；她更习惯在文件背面画一条细线，然后从那一条线开始改。她从不承诺雨会停，只承诺会有人留下来修屋顶。',
      en: 'Ms. Z is one of the people pushing reform inside the Foundation. She does not stand at the front and rarely makes speeches; she prefers to draw a thin line on the back of a file and begin there. She never promises the rain will stop, only that someone will stay to repair the roof.',
    },
    personality: {
      zh: [
        '务实到近乎冷峻。她不问“应不应该”，先问“从哪里开始、谁会反对、能保住多少人”。',
        '对制度有耐心，但不把制度当神。她知道规则可以被改写，前提是有人愿意花时间。',
        '不喜欢被称作英雄。她认为改革不是一场演讲，而是一连串不漂亮的妥协。',
      ],
      en: [
        'Practical to the point of severity. She does not begin with “should we,” but with “where do we start, who will object, how many people can we keep.”',
        'Patient with institutions without treating them as gods. She knows rules can be rewritten, provided someone is willing to spend the time.',
        'Dislikes being called a hero. Reform, she thinks, is not a speech but a series of unglamorous compromises.',
      ],
    },
    voice: {
      zh: [
        '句子短，常带条件和步骤；说到“以后”时会停一下，像在确认那件事真的还有以后。',
        '不轻易许诺，但答应的事会留下书面记录。',
        '偶尔用一句很干的玩笑提醒别人：她不是没有情绪，只是没空浪费。',
      ],
      en: [
        'Short sentences, often with conditions and steps. When she says “later,” she pauses, as if checking that later still exists.',
        'She rarely promises, but what she agrees to gets written down.',
        'Now and then a dry joke reminds people that she has feelings; she simply has no time to waste them.',
      ],
    },
    relationships: [
      {
        name: { zh: '十四行诗', en: 'Sonetto' },
        role: {
          zh: '改革中最关键的年轻同事之一。Z 女士没有替十四行诗做决定，只把规则和代价摊在她面前。',
          en: 'One of the most important young colleagues in the reform. Ms. Z does not decide for Sonetto; she lays out the rules and the cost.',
        },
      },
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '她愿意为之争取的人，但不会把维尔汀当成需要被拯救的孩子。她要给维尔汀的是选择权，不是庇护。',
          en: 'Someone she is willing to fight for, without treating Vertin as a child to be rescued. What she wants to give Vertin is a choice, not shelter.',
        },
      },
      {
        name: { zh: '康斯坦丁', en: 'Constantine' },
        role: {
          zh: '同一套制度里的对手。两人都相信基金会必须存在，却对“谁有资格决定”寸步不让。',
          en: 'An opponent inside the same institution. Both believe the Foundation must exist, and neither yields on who has the right to decide.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '涉及基金会改革与维尔汀获救的剧情。默认隐藏。',
        en: 'Spoilers for the Foundation reform and Vertin’s release. Hidden by default.',
      },
      story: {
        zh: [
          '维尔汀被强制休眠后，Z 女士与十四行诗、马克·哈尔一起推动改革。她没有靠一次戏剧性的背叛取胜，而是靠数周的文件、游说和规则漏洞。',
          '改革通过后，她仍然留在基金会。她没有把旧制度整个推倒，而是开始修补那些最容易被忽略的地方。',
          '她知道自己也会变成下一个被质疑的人；这正是她坚持留下书面记录的原因。',
        ],
        en: [
          'After Vertin is forced into sleep, Ms. Z works with Sonetto and Mark to push the reform. She does not win through one dramatic betrayal, but through weeks of paperwork, lobbying and rule loopholes.',
          'After the reform passes she stays with the Foundation. She does not tear the old system down; she begins repairing the places easiest to ignore.',
          'She knows she will become the next person questioned. That is exactly why she keeps a written record.',
        ],
      },
    },
    lines: [
      { zh: 'Z女士在文件背面画了一条很细的线，说改革从这条线开始。', en: 'Ms. Z drew a thin line on the back of a file and said reform begins here.' },
      { zh: '她从不承诺雨会停，只承诺会有人留下来修屋顶。', en: 'She never promises the rain will stop, only that someone will stay to repair the roof.' },
      { zh: '她递给我一支笔，说记录不是服从，是留下证据。', en: 'She handed me a pen and said a record is not obedience; it is evidence.' },
    ],
    sources: [
      { label: 'Z女士 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/Z%E5%A5%B3%E5%A3%AB' },
      { label: '基金会 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E5%9C%A3%E6%B4%9B%E5%A4%AB%E5%9F%BA%E9%87%91%E4%BC%9A' },
    ],
    completion: { level: 'dossier-v3', zh: '深度档案 v3 · 剧情人物', en: 'Dossier v3 · story figures' },
  },

  hoffman: {
    id: 'hoffman',
    archiveName: '霍夫曼',
    nameZh: '霍夫曼',
    nameEn: 'Hoffman',
    aliases: { zh: ['基金会调查员'], en: ['Foundation investigator'] },
    title: { zh: '把证据带到灯下', en: 'Evidence Under the Lamp' },
    rarity: null,
    element: { zh: '—', en: '—' },
    medium: { zh: '—', en: '—' },
    affiliation: { zh: '圣洛夫基金会', en: 'St. Pavlov Foundation' },
    identity: {
      zh: '霍夫曼是基金会的调查员。他的笔记本边缘永远沾着灰，因为他相信证据不会自己走到灯下。他教人先记录、再判断，先听、再同情；这不是冷漠，而是他保护真相的方式。',
      en: 'Hoffman is a Foundation investigator. The edges of his notebook are always dusty, because he believes evidence will not walk under the lamp by itself. He teaches people to record before judging, to listen before sympathising; it is not coldness, but his way of protecting the truth.',
    },
    personality: {
      zh: [
        '谨慎，愿意在结论之前承认“我还不知道”。他最讨厌的不是错误，而是为了体面而省略证据。',
        '对年轻调查者有一种不张扬的照顾。他会把危险的部分留给自己，把能学会的部分留给别人。',
        '知道记录会伤害人，也知道不记录会伤害更多人。他选择把笔拿稳。',
      ],
      en: [
        'Cautious, willing to say “I don’t know yet” before a conclusion. What he hates is not error but evidence omitted for the sake of looking respectable.',
        'Quietly protective of younger investigators. He keeps the dangerous part for himself and leaves the part that can be learned to them.',
        'He knows records can hurt people, and that leaving no record can hurt more. He chooses to keep the pen steady.',
      ],
    },
    voice: {
      zh: [
        '说话像在核对一份现场记录：时间、地点、谁先开口。',
        '很少用绝对判断，常把“目前能确认的是”挂在嘴边。',
        '对学生说话时会放慢一点，像怕他们把“证据”听成“立场”。',
      ],
      en: [
        'Speaks as if checking a scene report: time, place, who spoke first.',
        'Rarely uses absolute judgements; “what we can confirm for now” is a favourite phrase.',
        'Slows down when speaking to students, as if afraid they will hear “evidence” as “side.”',
      ],
    },
    relationships: [
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '他愿意把调查方法交给维尔汀，却不替她写结论。对他来说，信任不是替对方决定，而是让她看见证据。',
          en: 'He is willing to teach Vertin his method without writing her conclusion. To him, trust is not deciding for someone; it is letting them see the evidence.',
        },
      },
      {
        name: { zh: '十四行诗', en: 'Sonetto' },
        role: {
          zh: '他看见她的纪律，也看见纪律底下的恐惧。他没有拆穿，只把一页空白记录递给她。',
          en: 'He sees her discipline, and the fear beneath it. He does not expose it; he simply hands her a blank page.',
        },
      },
      {
        name: { zh: '真相', en: 'The truth' },
        role: {
          zh: '他追的东西，但他从不假装自己拥有它。',
          en: 'What he pursues, without ever pretending to own it.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '涉及基金会调查线与霍夫曼的结局。默认隐藏。',
        en: 'Spoilers for the Foundation investigation thread and Hoffman’s fate. Hidden by default.',
      },
      story: {
        zh: [
          '霍夫曼长期调查基金会不愿公开的事件。他把证据分散保存，避免一次搜查就抹掉全部记录。',
          '在危险临近时，他优先把资料和年轻人送出去，而不是替自己找退路。',
          '他的最后一页没有写完。空白本身也是记录：有些事情，后来的人必须接着写。',
        ],
        en: [
          'Hoffman investigates events the Foundation would rather not make public. He stores evidence in separate places so one search cannot erase the whole record.',
          'When danger closes in, he gets the files and the younger people out first, rather than looking for his own way back.',
          'His last page was never finished. The blank is also a record: some things must be written by those who come after.',
        ],
      },
    },
    lines: [
      { zh: '霍夫曼的笔记本边缘永远沾着灰，他说证据不会自己走到灯下。', en: 'Hoffman’s notebook always has dust on its edges. Evidence, he said, does not walk under the lamp by itself.' },
      { zh: '他教我先记录，再判断；先听，再同情。', en: 'He taught me to record before judging, to listen before sympathising.' },
      { zh: '他最后一页没有写完。我把那页折起来，放在箱子最里面。', en: 'His last page was unfinished. I folded it and put it at the bottom of the case.' },
    ],
    sources: [
      { label: '霍夫曼 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E9%9C%8D%E5%A4%AB%E6%9B%BC' },
      { label: '基金会 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E5%9C%A3%E6%B4%9B%E5%A4%AB%E5%9F%BA%E9%87%91%E4%BC%9A' },
    ],
    completion: { level: 'dossier-v3', zh: '深度档案 v3 · 剧情人物', en: 'Dossier v3 · story figures' },
  },

  marianne: {
    id: 'marianne',
    archiveName: '玛丽安',
    nameZh: '玛丽安',
    nameEn: 'Marianne',
    aliases: { zh: ['斯奈德的姐姐'], en: ["Schneider's sister"] },
    title: { zh: '替离开的人看风景', en: 'Seeing the View for the Lost' },
    rarity: null,
    element: { zh: '—', en: '—' },
    medium: { zh: '—', en: '—' },
    affiliation: { zh: '芝加哥 · 幸存者', en: 'Chicago · survivor' },
    identity: {
      zh: '玛丽安是斯奈德的姐姐。芝加哥那一夜之后，她活了下来，却不太记得自己是怎么逃出来的。她把斯奈德的红色羽衣叠得很整齐，像在等一件不会再被穿上的衣服。她相信活着的人要替离开的人把风景看完。',
      en: 'Marianne is Schneider’s sister. She survived the night in Chicago, but does not quite remember how she escaped. She folds Schneider’s red feather coat neatly, as if waiting for a garment that will never be worn again. She believes those who live must finish seeing the scenery for those who left.',
    },
    personality: {
      zh: [
        '温和，但不脆弱。她的悲伤很少向外倾倒，更多时候变成整理、折叠、记住这些具体的小动作。',
        '对幸存有愧疚感。她不会把“活下来”说成幸运，也不允许别人替她把它说成幸运。',
        '对斯奈德的选择有复杂的态度：她既想责怪，又知道责怪一个已经不在了的人太容易。',
      ],
      en: [
        'Gentle without being fragile. Her grief rarely pours outward; it becomes concrete acts: folding, tidying, remembering.',
        'Carries survivor’s guilt. She will not call survival luck, and does not let others call it luck for her.',
        'Her feelings about Schneider’s choices are complicated: she wants to blame her, and knows blaming someone who is gone is too easy.',
      ],
    },
    voice: {
      zh: [
        '说话很轻，常从一件小东西讲起：一件衣服、一扇门、一条没有走完的街。',
        '提到斯奈德时会改口叫“她”，像不愿意让名字承担全部重量。',
        '很少直接说“我很难过”，但会把同一件衣服叠很多遍。',
      ],
      en: [
        'Speaks softly, often beginning with an object: a coat, a door, a street never finished.',
        'When Schneider comes up she switches to “she,” as if unwilling to let the name carry all the weight.',
        'She rarely says “I am sad” directly; she folds the same coat many times.',
      ],
    },
    relationships: [
      {
        name: { zh: '斯奈德', en: 'Schneider' },
        role: {
          zh: '她的妹妹，也是她最无法整理的那件旧事。玛丽安想记住她真实的样子，而不是只记住她最后的选择。',
          en: 'Her younger sister, and the old matter she can never tidy away. Marianne wants to remember who Schneider really was, not only her final choice.',
        },
      },
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '从芝加哥带出消息的人。玛丽安不向维尔汀要一个完美解释，只想知道斯奈德最后有没有害怕。',
          en: 'The person who brought news out of Chicago. Marianne does not demand a perfect explanation; she wants to know whether Schneider was afraid at the end.',
        },
      },
      {
        name: { zh: '红色羽衣', en: 'The red feather coat' },
        role: {
          zh: '她留给自己的纪念物，也是她还没有学会放下的东西。',
          en: 'The keepsake she allows herself, and the thing she has not learned to put down.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '涉及芝加哥事件与斯奈德的结局。默认隐藏。',
        en: 'Spoilers for the Chicago incident and Schneider’s fate. Hidden by default.',
      },
      story: {
        zh: [
          '芝加哥事件中，斯奈德为了保护维尔汀和同伴做出了不可逆的选择。玛丽安活了下来，却被迫接受一个没有妹妹的以后。',
          '她后来把那段经历讲得很短，只留下几个名字和一件衣服。不是遗忘，而是有些细节还没有找到可以安放的位置。',
          '她仍在替斯奈德看风景，也仍在学习不为“还活着”这件事道歉。',
        ],
        en: [
          'During the Chicago incident, Schneider makes an irreversible choice to protect Vertin and the others. Marianne survives, and is forced into a future without her sister.',
          'She later tells the story very briefly, leaving only a few names and a coat. It is not forgetting; some details have not yet found a place to rest.',
          'She is still seeing the scenery for Schneider, and still learning not to apologise for being alive.',
        ],
      },
    },
    lines: [
      { zh: '玛丽安把斯奈德的红色羽衣叠得很整齐，像在等一件不会再被穿上的衣服。', en: 'Marianne folded Schneider’s red feather coat neatly, as if waiting for a garment that would never be worn again.' },
      { zh: '她记得芝加哥每一扇被推开的门，却不记得自己是怎么逃出来的。', en: 'She remembers every door forced open in Chicago, but not how she escaped.' },
      { zh: '她说，活着的人要替离开的人把风景看完。', en: 'Those who live, she said, must finish seeing the scenery for those who left.' },
    ],
    sources: [
      { label: '玛丽安 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E7%8E%9B%E4%B8%BD%E5%AE%89' },
      { label: '芝加哥事件 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/1.2' },
    ],
    completion: { level: 'dossier-v3', zh: '深度档案 v3 · 剧情人物', en: 'Dossier v3 · story figures' },
  },

  isabella: {
    id: 'isabella',
    archiveName: '伊莎贝拉',
    nameZh: '伊莎贝拉',
    nameEn: 'Isabella',
    aliases: { zh: ['第一防线学校的同学'], en: ['First Line classmate'] },
    title: { zh: '墙上的窗', en: 'The Window on the Wall' },
    rarity: null,
    element: { zh: '—', en: '—' },
    medium: { zh: '—', en: '—' },
    affiliation: { zh: '第一防线学校', en: 'First Line School' },
    identity: {
      zh: '伊莎贝拉是维尔汀在第一防线学校的同学。禁闭室里没有窗，她就在墙上画了一扇，说这样至少能看见外面。她把自己的面包分给维尔汀一半，说逃跑需要力气。暴雨把她带走的那天，她还在笑。',
      en: 'Isabella was Vertin’s classmate at the First Line School. There was no window in the detention room, so she drew one on the wall and said at least this way they could see outside. She split her bread with Vertin and said running away takes strength. The Storm took her while she was still laughing.',
    },
    personality: {
      zh: [
        '在压抑的环境里仍然保留一点顽皮。她不是不知道害怕，而是选择先用玩笑把害怕推开。',
        '对朋友很大方，对自己很随便。她可以饿着，却会把最后半块面包分出去。',
        '有一种早熟的清醒：她知道自己可能走不出去，但仍然希望维尔汀能。',
      ],
      en: [
        'Keeps a spark of mischief in a suffocating place. She is not unafraid; she chooses to push fear away with a joke first.',
        'Generous with friends, careless with herself. She can go hungry and still give away the last half of her bread.',
        'Has an early, unchildlike clarity: she knows she may not get out, and still wants Vertin to.',
      ],
    },
    voice: {
      zh: [
        '说话带笑，哪怕在讲很糟糕的事；笑意是她最后的防护。',
        '喜欢把严肃的话说成小玩笑，再在别人笑完后补一句真话。',
        '不说“再见”，只说“下一次”。',
      ],
      en: [
        'Speaks with a smile, even about terrible things; the smile is her last defence.',
        'Turns serious things into small jokes, then adds the truth after the other person laughs.',
        'She does not say “goodbye”; she says “next time.”',
      ],
    },
    relationships: [
      {
        name: { zh: '维尔汀', en: 'Vertin' },
        role: {
          zh: '禁闭室里分过半块面包的朋友。伊莎贝拉希望维尔汀记住她，但不要只记住她离开的那一天。',
          en: 'The friend who shared half a piece of bread in the detention room. Isabella wants Vertin to remember her, but not only the day she left.',
        },
      },
      {
        name: { zh: '十四行诗', en: 'Sonetto' },
        role: {
          zh: '同一所学校里的另一种学生：守规矩、被期待、也被规矩困住。伊莎贝拉对她既羡慕又有点心疼。',
          en: 'Another kind of student at the same school: rule-bound, expected, and trapped by the rules. Isabella is both envious of her and a little sorry for her.',
        },
      },
      {
        name: { zh: '墙上的窗', en: 'The window on the wall' },
        role: {
          zh: '她留给维尔汀的一个小把戏，也是一种不肯完全服从的证明。',
          en: 'A small trick she left Vertin, and proof that she never entirely obeyed.',
        },
      },
    ],
    spoiler: {
      warning: {
        zh: '涉及第一防线学校与暴雨的早期剧情。默认隐藏。',
        en: 'Spoilers for the First Line School and the early Storm story. Hidden by default.',
      },
      story: {
        zh: [
          '在第一防线学校，伊莎贝拉和维尔汀共享禁闭室、面包和一个画在墙上的窗。',
          '暴雨来临前，她仍在笑。她的离开没有戏剧性的遗言，只留下一个没有被兑现的“下一次”。',
          '维尔汀后来很少主动提起她，但每次看到墙上类似窗子的痕迹，都会停一下。',
        ],
        en: [
          'At the First Line School, Isabella and Vertin share a detention room, bread and a window drawn on the wall.',
          'Before the Storm arrives she is still laughing. She leaves no dramatic last words, only a “next time” that is never kept.',
          'Vertin rarely brings her up, but pauses whenever she sees a window-like mark on a wall.',
        ],
      },
    },
    lines: [
      { zh: '伊莎贝拉在禁闭室的墙上画了一扇窗，说这样至少能看见外面。', en: 'Isabella drew a window on the detention-room wall and said at least this way we could see outside.' },
      { zh: '她把自己的那份面包分我一半，说逃跑需要力气。', en: 'She split her bread with me and said running away takes strength.' },
      { zh: '暴雨把她带走的那天，她还在笑。我后来花了很久，才学会不把那声笑当成告别。', en: 'The Storm took her while she was still laughing. It took me a long time to stop hearing that laugh as a goodbye.' },
    ],
    sources: [
      { label: '伊莎贝拉 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E4%BC%8A%E8%8E%8E%E8%B4%9D%E6%8B%89' },
      { label: '第一防线学校 · 重返未来1999中文维基', url: 'https://res1999.huijiwiki.com/wiki/%E7%AC%AC%E4%B8%80%E9%98%B2%E7%BA%BF%E5%AD%A6%E6%A0%A1' },
    ],
    completion: { level: 'dossier-v3', zh: '深度档案 v3 · 剧情人物', en: 'Dossier v3 · story figures' },
  },
};
