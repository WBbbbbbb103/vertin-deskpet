/**
 * English counterpart of the fan-written dialogue.
 * The voice stays quiet, wry and archival; no game script is reproduced.
 */

export const LINES_EN = {
  welcome: [
    'We meet at last. I am Vertin. I keep the moments that time forgets.',
    'The rain will last a while. You can leave me here and go about your day.',
    'The suitcase holds the past; the present sits under my hat. As for the future—there is no hurry to open it.',
  ],
  greetMorning: [
    "Morning. The rain hasn't stopped, but today's hours are yours.",
    'Morning. Drink some water first, then turn to the first page.',
    'The rain is lightest at dawn. A good time to begin slowly.',
  ],
  greetNoon: [
    'Afternoons are for sorting the suitcase—or for staring into space.',
    'The light is thin at this hour. Take a short rest?',
    'Have you eaten? Even a record-keeper needs to refuel.',
  ],
  greetEvening: [
    'Night is settling. Shall we put today into the suitcase together?',
    'The rain sounds heavier at dusk. Like an old record.',
    'You did enough. The rest can wait until tomorrow.',
  ],
  greetNight: [
    "Still awake? I won't hurry you. I'll only remind you that tomorrow deserves a gentle arrival.",
    "It's late. Turn the screen down a little, would you?",
    "I'm still here. Come when you're done; no need to say hello.",
  ],
  idle: [
    'Raindrops fall through different ages. They do not sound the same.',
    'If time is a river, I would rather walk along the bank.',
    'London rain smells like old paper.',
    'The lock on the suitcase has been loose lately. Perhaps it wants to go out too.',
    'Sometimes I wonder if clocks get tired.',
    'Your desk is quiet. Good for keeping records.',
    "I wasn't watching the rain. My gaze simply happened to stop there.",
    'The ribbon on my hat is old, but the color has stayed.',
    'If the rain stopped for a moment, what would you do first?',
    "Don't worry. Time doesn't move faster just because you paused.",
  ],
  patHead: [
    'Under the brim is a place where you are allowed to rest for a while.',
    'Mm... three seconds. No more.',
    'Your hand is warm.',
    'Keep going and the hat will tilt.',
    "That is the second time today. I've noted it.",
    "All right. Now it's your turn to rest.",
  ],
  patHat: [
    "The hat is for keeping time. The brim points west when I haven't gone far.",
    "Don't touch the ribbon. It will remember the warmth of your hand.",
    'I suppose that counts as a greeting.',
    'The hat may tilt. Time may not. ...Today can be an exception.',
  ],
  body: [
    "I'm here. When the rain gets too loud, listen to me instead.",
    'What would you like to talk about today?',
    "Don't stand too close. The rain will run off the brim onto you.",
    'Your desk is tidier than I imagined.',
    'Would you like some tea? There is still sugar in the suitcase.',
  ],
  suitcase: [
    "You shouldn't open everything in the suitcase. ...But you may guess.",
    'Every sticker is a journey with no way back.',
    'It looks old because it has carried too much weather.',
    'The heaviest thing in the suitcase is not the luggage.',
    "Shh. It doesn't want to be woken today.",
  ],
  tea: [
    'Black tea needs one sugar cube. ...Mm. That is important knowledge.',
    'Here is your cup. Mind the heat.',
    'On a rainy day the tea cools slowly. Just right.',
    'I traded an old pocket watch for these leaves. They should be decent.',
  ],
  focusStart: [
    'Twenty-five minutes. I will watch the rain; you only need to walk forward.',
    'Do the one thing in front of you. Put the rest in the suitcase.',
    'Begin. I will keep time inside the sound of the rain.',
  ],
  focusDone: [
    'Time is up. You did well. Leave the rest to the rain.',
    'That page is finished. Stand up and take a few steps, all right?',
    'Focus complete. Your reward is a small piece of quiet.',
  ],
  breakStart: [
    'Rest is part of the journey too. Look out the window.',
    "Five minutes. Don't quietly pick the work back up.",
    "Close your eyes. The rain won't run away.",
  ],
  breakDone: [
    'Break over. Start again when you are ready; there is no hurry.',
    "You're back. Let's continue.",
  ],
  gameStart: [
    'Catch the bright raindrops. They are lighter than they look.',
    'Twenty seconds. See how many moments you can keep.',
  ],
  gameEnd: [
    'These raindrops are yours. They will glow in the suitcase.',
    'Enough. What remains matters more than what was caught.',
    'A good result. The rain agrees.',
  ],
  unlock: [
    'There is something old at the bottom of the suitcase... It is yours now.',
    'The raindrops you collected have bloomed on something.',
  ],
  wardrobe: [
    'This one? It walked with me through a very long rain.',
    'Everything in the wardrobe remembers a place.',
    'The hat, the umbrella, the monocle... Which would you like to see first?',
  ],
  settings: [
    'Sound, size, distance. All of it can be adjusted to your habits.',
    "A desk pet doesn't have to be loud. Quiet company is good too.",
  ],
  gameCheer: [
    'Caught it.',
    'Not bad.',
    'The rain went left.',
    'Almost.',
    'Your hand is faster than the rain.',
  ],
  stretch: [
    'You have been sitting a while. Relax your shoulders and look farther away.',
    "Time for water. I won't drink it for you.",
    'An hour has passed. Would you like to walk a little?',
  ],
  closer: [
    'Today you are a little closer to the place where the rain stops.',
    'I will keep the time I spend with you in a separate pocket.',
    'I have remembered you. For a record-keeper, that is not a courtesy.',
  ],
};

export const REPLIES_EN = [
  {
    match: /(hello|\bhi\b|\bhey\b|good morning|good evening|are you there)/i,
    lines: [
      'Hello. The rain outside is just right.',
      "I'm here. Now that you've come, today is not a blank page.",
    ],
  },
  {
    match: /(your name|who are you|vertin|timekeeper|司辰)/i,
    lines: [
      'Vertin. A record-keeper of time, and the keeper of this suitcase.',
      'You may call me Vertin. The hat is a habit, not a distance.',
    ],
  },
  {
    match: /(what time|the time|clock|几点|时间)/i,
    lines: [
      () => `It is ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}. A clock is a reminder, not an order.`,
      'Time is moving, but you do not have to chase it.',
    ],
  },
  {
    match: /(rain|weather|storm|下雨|天气)/i,
    lines: [
      'Rain washes the streets and leaves some things behind. Like now.',
      'Rain is good at covering the noise inside your head.',
    ],
  },
  {
    match: /(suitcase|luggage|箱子|行李)/i,
    lines: [
      'The suitcase has four layers. Old letters, weather, an empty space, and one layer where nothing is placed.',
      "Don't knock. It is a little shy.",
    ],
  },
  {
    match: /(like|hobby|interest|喜欢|爱好)/i,
    lines: [
      'I like sorting old things and listening to the gramophone when it rains. And... this. Right now.',
      'I do not like many things, but the ones I like are old.',
    ],
  },
  {
    match: /(tired|stress|anxious|sad|upset|cry|exhausted|累|烦|压力|难过|焦虑|崩|\bemo\b)/i,
    lines: [
      "Relax your shoulders first. You don't have to stay dry in every storm.",
      "Then don't do it for now. Time won't blame you for stopping.",
      'I hear you. You do not have to make it sound orderly.',
      'Write down the next step, then do only that. I will keep the rest of the time for you.',
    ],
  },
  {
    match: /(pat|headpat|pet me|摸头|贴贴)/i,
    lines: [
      '...You may. But do not knock the hat crooked.',
      "Just this once. Mm, today's allowance is used up.",
    ],
  },
  {
    match: /(hat|brim|礼帽|帽子)/i,
    lines: [
      'The hat is old, but the brim still keeps some rain off me.',
      'The lining is embroidered with 1999. That is another story.',
    ],
  },
  {
    match: /(eat|hungry|tea|coffee|snack|吃|饿|茶|咖啡)/i,
    lines: [
      'There is black tea and sugar in the suitcase. Shall we sit?',
      'I can hand you a cup of tea. As for snacks... next time.',
    ],
  },
  {
    match: /(work|study|write|paper|exam|deadline|加班|工作|学习|论文|考试)/i,
    lines: [
      'Write down the next step, then do only that. I will keep the rest of the time for you.',
      'Try twenty-five minutes first, then decide whether to continue.',
      "Don't carry the whole storm. Catch one drop at a time.",
    ],
  },
  {
    match: /(sleep|good night|sleepy|晚安|困|睡)/i,
    lines: [
      "Good night. Give what's unfinished to tomorrow; it won't be lost.",
      "Go to sleep. I'll turn the rain down a little.",
    ],
  },
  {
    match: /(thank|thanks|thx|谢谢|感谢)/i,
    lines: [
      'No need. A record-keeper remembers being treated gently too.',
      'Received. I will put it on the top layer of the suitcase.',
    ],
  },
  {
    match: /(bye|goodbye|see you|走了|再见|拜拜)/i,
    lines: [
      "Go on. I'll be here when you come back from the rain.",
      'Mind the road. The umbrella is by the door.',
    ],
  },
  {
    match: /(game|play|raindrop|小游戏|玩|游戏|雨滴)/i,
    lines: [
      "Then go catch a few drops of Time Rain. I'll watch from here.",
      'The raindrops are light today. Good for practice.',
    ],
  },
  {
    match: /(focus|pomodoro|timer|专注|计时|番茄)/i,
    lines: [
      'Shall I keep time for you? The hourglass is on the right.',
      'Twenty-five minutes. Once you begin, the rain will quiet down for you.',
    ],
  },
  {
    match: /(1999|storm|reverse|暴雨|重返未来)/i,
    lines: [
      '1999. After that year, many clocks ran a little differently.',
      'The Storm will come. But before it does, we still have this moment.',
    ],
  },
  {
    match: /(umbrella|伞)/i,
    lines: [
      "The umbrella is on the blackthorn rack. It doesn't like noisy places.",
      'Want to take it out? Look in the wardrobe.',
    ],
  },
  {
    match: /(orange|soda|橘子|汽水)/i,
    lines: [
      'Orange soda? ...All right. But only one bottle.',
      'There is no orange in the suitcase. Perhaps next time you can bring one.',
    ],
  },
  {
    match: /(cute|beautiful|pretty|like you|可爱|漂亮|好看|喜欢你)/i,
    lines: [
      '...That is not within the scope of my records.',
      'Thank you. I will note your taste in today’s footer.',
    ],
  },
  {
    match: /(have you eaten|lunch|dinner|吃饭|午饭|晚饭)/i,
    lines: [
      "Not yet. But when you ask, it feels as if I already have.",
      "I'll go in a moment. Remember to eat too.",
    ],
  },
  {
    match: /(memories?|old times|旧日|记忆)/i,
    lines: [
      'Old records are in the profile. I keep the names there: Sonetto, Regulus, Lilya... and more.',
      'Some memories are not filed by date. They are filed by who was standing beside me.',
    ],
  },
  {
    match: /(lonely|alone|孤独|寂寞)/i,
    lines: [
      "You are not the only one in the room now. That is a small difference, but it counts.",
      'The rain is loud, but it is not a wall. I am on this side of it.',
    ],
  },
];

export const FALLBACK_EN = [
  "I'm listening.",
  'I will note that in the footer of today.',
  'Time is long. Take as long as you need.',
  'Mm. And then?',
  'That is not in the records I have read, but I am willing to listen.',
  'The rain is a little loud. Come closer and tell me.',
];

export const LEVEL_TITLES_EN = [
  'First Rain',
  'Fellow Traveler',
  'Conspirator of Time',
  'Before the Rain Stops',
  'Companion in the Case',
  'Anchor of This Moment',
  'Old Records',
  'Between the Pendulums',
  'Desk in the Rain',
  'Against the Current',
  "The Timekeeper's Favor",
  'The Sleepless Page',
  'Regular of the Suitcase',
  'Seated with the Storm',
  'Accomplice of Time',
  'Beyond the Rain',
  'The Thirteenth Knock',
  'An Eternal Page',
  'Before Tomorrow',
  'Rain That Shares My Name',
  'A Footnote in the Rain',
  'The Unsend Letter',
  'Walking Against the Rain',
  'Through the Long Night',
  'Starlight at the Bottom',
  'Outside Time',
  'Above the Rain',
  'On the Same Page',
  'After Tomorrow',
  'The Rain That Never Ends',
];

export const CHAT_HINTS_EN = [
  "I'm a little tired today",
  'Who are you?',
  "It's raining",
  'Stay with me while I focus',
  'How are your friends?',
];

export const ACCESSORIES_EN = {
  hat: {
    name: 'Old Top Hat',
    desc: 'A deep navy flat-brimmed top hat, pulled low. Its band is faded gray-blue; she has retied the side knot once.',
  },
};
