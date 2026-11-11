/**
 * Present-tense "what are they up to" lines.
 * Original fan writing; each line is a small status note rather than a memory.
 */

import { ROSTER_STATUS } from './roster.sketches.js';

const BASE_FRIEND_STATUS = {
  sonetto: {
    zh: '十四行诗最近把报告写得像诗，页脚比正文还长。她不肯承认这是故意的。',
    en: "Sonetto has been writing reports that read like poems; the footnotes are longer than the body. She won't admit it's intentional.",
  },
  regulus: {
    zh: '星锑最近在修一台旧收音机，说修好以后要播一场只给雨听的节目。',
    en: "Regulus is fixing an old radio. When it works, she says she'll broadcast a show for the rain only.",
  },
  lilya: {
    zh: '红弩箭最近在训练新箭，她的邻居还是那么吵。',
    en: 'Lilya is training new arrows. Her neighbor is still noisy.',
  },
  druvis: {
    zh: '槲寄生最近在温室里试新的术杖，焦树林长出了第一丛新芽。',
    en: 'Druvis is testing a new wand in the greenhouse. The first new shoot has appeared in the charred woods.',
  },
  urd: {
    zh: '兀尔德最近又换了一个名字旅行；她寄来一张没有署名的明信片。',
    en: 'Urd is traveling under a new name again. A postcard arrived without a signature.',
  },
  sotheby: {
    zh: '苏芙比最近在研究一种会冒气泡的红茶，温室里的叶子都还好。',
    en: 'Sotheby is experimenting with a bubbling black tea. The leaves in her greenhouse are fine.',
  },
  thirtyseven: {
    zh: '37 最近在拉普拉斯算一组不会结束的数；休息时她会去买巧克力冰淇淋，并坚持那属于植物学，不违反教规。',
    en: '37 has been working through a set of numbers at Laplace that never seems to end. On breaks she goes out for chocolate ice cream and insists it is botany, not a violation of the rules.',
  },
  six: {
    zh: '6 最近在修岛上的旧钟，钟声比以前慢了一点。',
    en: '6 is repairing the old clock on the island. Its bell is a little slower now.',
  },
  toothfairy: {
    zh: '牙仙最近在整理新一批乳牙，诊所的灯还是亮的。',
    en: 'Tooth Fairy is filing a new batch of milk teeth. The clinic light is still on.',
  },
  matilda: {
    zh: '玛蒂尔达最近在写一封很长的信，信纸换了三次。',
    en: 'Matilda is writing a very long letter. She has changed the paper three times.',
  },
  mesmer: {
    zh: '小梅斯梅尔最近在记录新的心跳，她自己的那一栏仍然空着。',
    en: 'Mesmer Jr. is recording new heartbeats. Her own column is still blank.',
  },
  x: {
    zh: 'X 最近在给箱子做第三个备用按钮，前两个都还能用。',
    en: 'X is building a third backup button for the suitcase. The first two still work.',
  },
  schneider: {
    zh: '斯奈德最近没有消息。芝加哥的雨还在下，红色羽衣我收得很好。',
    en: 'There is no news from Schneider. The rain in Chicago is still falling; I am keeping the red feather coat safe.',
  },
  arcana: {
    zh: '阿尔卡纳最近很安静。她越安静，越不像好消息。',
    en: 'Arcana has been quiet lately. The quieter she is, the less it sounds like good news.',
  },
  constantine: {
    zh: '康斯坦丁最近在开很多会，门还是一扇一扇地关。',
    en: 'Constantine has been in many meetings. The doors are still closing one by one.',
  },
  msz: {
    zh: 'Z女士最近在改一份很长的提案，屋顶还没修完。',
    en: 'Ms. Z is revising a very long proposal. The roof is not fixed yet.',
  },
  lucy: {
    zh: '露西最近把自己充到 90%，说这样学笑话会更快。',
    en: 'Lucy has been charging herself to 90%. She says it helps her learn jokes faster.',
  },
  kakania: {
    zh: '卡卡尼亚最近在维也纳开了一间小诊室，躺椅还是给问题准备的。',
    en: 'Kakania has opened a small consulting room in Vienna. The couch is still for problems, not people.',
  },
  semmelweis: {
    zh: '塞梅尔维斯最近在洗手，诊室的红茶又凉了。',
    en: 'Semmelweis is washing her hands again. The black tea in the clinic has gone cold.',
  },
  isolde: {
    zh: '伊索尔德最近在排一部新戏，第一排仍然留着一个空位。',
    en: 'Isolde is rehearsing a new play. A seat in the first row is still empty.',
  },
  jiuniangzi: {
    zh: '曲娘最近在沛城唱新曲，词还是没写全。',
    en: 'Jiu Niangzi is singing a new verse in Peicheng. The words are still unfinished.',
  },
  getian: {
    zh: '葛天最近在改一个不肯结尾的剧本。',
    en: 'Getian is revising a script that refuses to end.',
  },
  marcus: {
    zh: '马库斯最近在追一条没有署名的线索，采访本快写满了。',
    en: 'Marcus is following an unsigned lead. Her notebook is almost full.',
  },
  hoffman: {
    zh: '霍夫曼最近在整理旧案卷，最后一页仍然空着。',
    en: 'Hoffman is sorting old case files. The last page is still blank.',
  },
  lorelei: {
    zh: '罗蕾莱最近在发新的传单，鞋跟又磨坏了一双。',
    en: 'Lorelei is handing out new leaflets. She has worn through another pair of heels.',
  },
  spathodea: {
    zh: '可燃点最近在看守一小簇火，夜里路过的人都能看见。',
    en: 'Spathodea is guarding a small flame. People passing at night can see it.',
  },
  ezra: {
    zh: '爱兹拉最近在给一批旧物换标签，有一张写的是你的名字。',
    en: 'Ezra is relabeling a batch of old objects. One label has your name on it.',
  },
  medicinepocket: {
    zh: '兔毛手袋最近在诊所加班，听诊器还是先捂热。',
    en: 'Medicine Pocket is working late at the clinic. The stethoscope is still warmed first.',
  },
  balloonparty: {
    zh: '气球派对最近接了一场儿童派对，气球还是有一只飞走了。',
    en: "Balloon Party has a children's party coming up. One balloon still got away.",
  },
  voyager: {
    zh: '远旅最近没有回来，但窗台上的星光还没熄。',
    en: 'Voyager has not come back, but the starlight on the windowsill has not gone out.',
  },
  centurion: {
    zh: '百夫长最近在训练新兵，他还是最后一个才出发。',
    en: 'Centurion is training new soldiers. He still refuses to march until the last one is counted.',
  },
  pickles: {
    zh: '皮克勒斯最近在等散步，鼻子一直搁在门口。',
    en: 'Pickles is waiting for a walk. His nose has been by the door all morning.',
  },
  jessica: {
    zh: '洁西卡最近在绿湖折纸鹿，门口的风比从前轻。',
    en: 'Jessica is folding paper deer at Green Lake. The wind at the door is lighter than before.',
  },
  moissan: {
    zh: '莫桑女士最近在温室里分株，每片叶子都还叫得出名字。',
    en: 'Ms. Moissan is repotting in the greenhouse. She still knows every leaf by name.',
  },
  ulrich: {
    zh: '乌尔里希最近在算一组新数据，咖啡又凉了。',
    en: 'Ulrich is calculating a new data set. His coffee has gone cold again.',
  },
  charon: {
    zh: '卡戎最近在河边等客人，船还是旧的那条。',
    en: 'Charon is waiting by the river. The boat is still the old one.',
  },
  tennant: {
    zh: '坦南特最近又借走了一件外套，口袋里多了一张票。',
    en: 'Tennant has borrowed another coat. There is an extra ticket in the pocket.',
  },
  marianne: {
    zh: '玛丽安最近把红色羽衣拿出来晒了一次太阳。',
    en: 'Marianne took the red feather coat out to air in the sun.',
  },
  apple: {
    zh: 'APPLe 最近在调试电台，说快收到星星的声音了。',
    en: 'APPLe is tuning the radio. He says he is close to picking up the sound of stars.',
  },
  isabella: {
    zh: '伊莎贝拉最近没有消息。禁闭室墙上的那扇窗，我还记得。',
    en: 'There is no news from Isabella. I still remember the window she drew on the detention room wall.',
  },
  thetwins: {
    zh: '双生舞伶最近在排一支没有音乐的舞；她说这样更能听见彼此的脚步。',
    en: 'The Twins are rehearsing a dance without music. They say it lets them hear each other\'s steps more clearly.',
  },
  msstranger: {
    zh: '无名者最近换了一个新编号；她还是没有告诉我真名。',
    en: 'Ms. Stranger has a new number. She still has not told me her real name.',
  },
  rhiannon: {
    zh: '小瑞安侬最近在给一只受伤的小兽换药；她的口袋里又多了碎饼干。',
    en: 'Rhiannon is changing the dressing on an injured little beast. There are more biscuit crumbs in her pocket again.',
  },
  everecho: {
    zh: '回声谣最近在城南的断墙边录风声；她说墙还记得原来的调子。',
    en: 'Everecho is recording the wind by a broken wall in the south of the city. The wall still remembers the old tune, she says.',
  },
  coppelia: {
    zh: '珐琅眼最近在调一把旧琴；她说高音里有一粒很小的杂音。',
    en: 'Coppélia is tuning an old instrument. She says there is a tiny impurity in the high notes.',
  },
  enigma: {
    zh: '哑谜最近把一张地图折成了九个问题；最后一个还没有答案。',
    en: 'Enigma has folded a map into nine questions. The last one still has no answer.',
  },
  ramona: {
    zh: '拉莫纳最近在替一间空屋点灯；她说屋里的人只是暂时不在。',
    en: 'Ramona is keeping a lamp lit in an empty house. She says the people there are only away for a while.',
  },
  paperheron: {
    zh: '鹭鸶剪最近在窗边放了一排纸鸟；风来时，它们都朝同一个方向。',
    en: 'Paper Heron has lined a row of paper birds along the window. When the wind comes, they all face the same way.',
  },
  cornerstone: {
    zh: '奠基石最近在量一段旧墙；她说墙脚比墙顶诚实。',
    en: 'Cornerstone is measuring an old wall. The foot of a wall is more honest than the top, she says.',
  },
  lorentzbutterfly: {
    zh: '洛伦兹蝴蝶最近在记录一场很小的风；她说那可能改变很远的天气。',
    en: 'Lorentz Butterfly is recording a very small wind. It might change the weather far away, she says.',
  },
  chengheguang: {
    zh: '程和光最近在城外的路上走；他说不急着到，路上的人还没听完。',
    en: 'Cheng Heguang is walking a road outside the city. No hurry to arrive, he says; someone on the road has not finished speaking.',
  },
  brume: {
    zh: '灰调蓝最近在车站等一班没有时刻表的车；她说先看看脚下。',
    en: 'Brume is waiting at the station for a train with no timetable. Look at your feet first, she says.',
  },
  sophia: {
    zh: '苏菲亚最近没有公开的近况。她留下的最后一句话，是把“错误”重新定义成了自己的名字。',
    en: 'There is no public recent update on Sophia. The last line she left behind redefined “error” as her own name.',
  },
};

export const FRIEND_STATUS = { ...BASE_FRIEND_STATUS, ...ROSTER_STATUS };
