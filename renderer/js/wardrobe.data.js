/**
 * Wardrobe item catalogue.
 *
 * Layered pieces share the native 26x26 sprite anchor. Full outfits replace
 * the base sprite and include their own hat/coat silhouette.
 */

export const WARDROBE_SLOTS = {
  hat: { zh: '帽子', en: 'Hat' },
  coat: { zh: '外套', en: 'Coat' },
  neck: { zh: '围巾', en: 'Scarf' },
  face: { zh: '单片镜', en: 'Monocle' },
  held: { zh: '手持', en: 'Held' },
  case: { zh: '箱饰', en: 'Case charm' },
  outfit: { zh: '套装', en: 'Full outfit' },
};

export const WARDROBE_GROUPS = [
  { id: 'all', zh: '全部', en: 'All' },
  { id: 'hat', zh: '帽子', en: 'Hats' },
  { id: 'coat', zh: '外套', en: 'Coats' },
  { id: 'accessory', zh: '配饰', en: 'Accessories' },
  { id: 'held', zh: '手持', en: 'Held' },
  { id: 'case', zh: '箱饰', en: 'Case' },
  { id: 'outfit', zh: '套装', en: 'Outfits' },
];

export const DEFAULT_WARDROBE = {
  outfit: null,
  hat: 'hat',
  coat: null,
  neck: null,
  face: null,
  held: null,
  case: null,
};

export const WARDROBE_ITEMS = [
  {
    id: 'hat',
    slot: 'hat',
    group: 'hat',
    name: { zh: '旧礼帽', en: 'The Old Hat' },
    desc: {
      zh: '深藏蓝的平顶礼帽，帽檐压得很低。帽带是褪色的灰蓝，侧结被她重新系过一次。',
      en: 'A deep navy flat-top hat, its brim pulled low. The band is faded grey-blue; she has retied the side knot once.',
    },
    lore: {
      zh: '她不太解释这顶帽子为什么一直戴着。只说，帽子旧了，才知道怎么贴着头骨。',
      en: 'She rarely explains why she keeps wearing it. She only says an old hat has learned the shape of the skull.',
    },
    unlock: { type: 'default' },
    icon: 'hat',
    base: true,
  },
  {
    id: 'hat-band',
    slot: 'hat',
    group: 'hat',
    name: { zh: '灰蓝帽带', en: 'Grey-Blue Hat Band' },
    desc: {
      zh: '一条窄帽带，灰蓝里带一点旧银。侧结打得很低，像不愿被人一眼看见。',
      en: 'A narrow band in grey-blue with a thread of old silver. The side knot sits low, as if it does not want to be noticed.',
    },
    lore: {
      zh: '这是她从一只旧箱子的夹层里找到的。尺寸刚好，像原本就属于这顶帽子。',
      en: 'She found it in the lining of an old case. It fit so well that it might always have belonged to the hat.',
    },
    unlock: { type: 'default' },
    icon: 'hat',
    asset: 'hat-band',
  },
  {
    id: 'rain-hat',
    slot: 'hat',
    group: 'hat',
    name: { zh: '雨夜帽罩', en: 'Rain Hat Cover' },
    desc: {
      zh: '一层很薄的防雨罩，边缘压着细小的水珠。不会让雨停，只让雨慢一点落到她身上。',
      en: 'A thin rain cover with tiny beads caught at the rim. It does not stop the rain; it only makes it arrive a little later.',
    },
    lore: {
      zh: '她不喜欢撑伞时看不清路。帽罩是折中的办法：手空出来，视野也还在。',
      en: 'She dislikes losing sight of the road under an umbrella. The cover is a compromise: both hands free, the view intact.',
    },
    unlock: { type: 'level', target: 4 },
    icon: 'umbrella',
    asset: 'rain-hat',
  },
  {
    id: 'coat',
    slot: 'coat',
    group: 'coat',
    name: { zh: '司辰大衣', en: 'Timekeeper Coat' },
    desc: {
      zh: '深青灰的长外套，衣摆能盖住箱子的一角。领口和袖口缝了极细的灰蓝线。',
      en: 'A long deep blue-grey coat whose hem can cover a corner of the case. The collar and cuffs are edged with a thin grey-blue thread.',
    },
    lore: {
      zh: '她很少把它当作“礼服”。更像一件可以穿着赶路、坐下、再把箱子拖过雨夜的衣服。',
      en: 'She rarely treats it as formal wear. It is a coat for walking, sitting, and dragging a case through the rain.',
    },
    unlock: { type: 'level', target: 15 },
    icon: 'hanger',
    asset: 'coat',
  },
  {
    id: 'scarf',
    slot: 'neck',
    group: 'accessory',
    name: { zh: '茶会围巾', en: 'Tea-Party Scarf' },
    desc: {
      zh: '暗酒红的窄围巾，边缘有一道米色细纹。结打得很松，像刚从小桌边站起来。',
      en: 'A narrow oxblood scarf with a thin cream stripe at the edge. The knot is loose, as if she has just risen from a small table.',
    },
    lore: {
      zh: '她记得这条围巾沾过一次红茶。洗过之后颜色浅了一点，她没有再染回去。',
      en: 'She remembers the scarf once caught a splash of black tea. It faded a little after washing; she never dyed it back.',
    },
    unlock: { type: 'level', target: 8 },
    icon: 'tea',
    asset: 'scarf',
  },
  {
    id: 'monocle',
    slot: 'face',
    group: 'accessory',
    name: { zh: '档案员单片镜', en: 'Archivist Monocle' },
    desc: {
      zh: '一枚细金边单片镜，镜片薄得几乎看不见。细链垂到领口，像一条很短的注脚。',
      en: 'A fine gold-rimmed monocle with a lens so thin it is almost invisible. Its chain falls to the collar like a very short footnote.',
    },
    lore: {
      zh: '她读旧档案时不常戴它。只有遇到被反复涂改的页码，才会把它取出来。',
      en: 'She rarely wears it for ordinary reading. It comes out only for pages that have been revised again and again.',
    },
    unlock: { type: 'level', target: 12 },
    icon: 'monocle',
    asset: 'monocle',
  },
  {
    id: 'umbrella',
    slot: 'held',
    group: 'held',
    name: { zh: '雨夜长伞', en: 'Rain-Night Umbrella' },
    desc: {
      zh: '一把深青色的长伞，伞骨很细，伞面撑开时像一小块随身携带的夜。',
      en: 'A long deep-teal umbrella with fine ribs. Opened, its canopy is a small piece of night she can carry.',
    },
    lore: {
      zh: '她通常把伞收在箱子侧袋里。只有雨大到看不清路，才会撑开它。',
      en: 'She usually keeps it in the case’s side pocket. It opens only when the rain is heavy enough to hide the road.',
    },
    unlock: { type: 'level', target: 18 },
    icon: 'umbrella',
    asset: 'umbrella',
  },
  {
    id: 'case-tag',
    slot: 'case',
    group: 'case',
    name: { zh: '旧箱铜牌', en: 'Old Case Tag' },
    desc: {
      zh: '一块小小的黄铜牌，边缘磨得发亮，上面刻着一个几乎看不清的“V”。',
      en: 'A small brass tag, its edges polished by use, with a nearly illegible “V” cut into it.',
    },
    lore: {
      zh: '她不记得牌子是什么时候挂上去的。只记得每次出发前，都会下意识摸一下它。',
      en: 'She does not remember when it was attached. She only knows she touches it before every departure.',
    },
    unlock: { type: 'level', target: 21 },
    icon: 'pin',
    asset: 'case-tag',
  },
  {
    id: 'outfit-rain',
    slot: 'outfit',
    group: 'outfit',
    name: { zh: '雨夜司辰', en: 'Rain-Night Timekeeper' },
    desc: {
      zh: '一套完整的雨夜装束：长外套、帽罩、围巾和收在身侧的长伞。适合走进一场很长的雨。',
      en: 'A complete rain-night look: long coat, hat cover, scarf, and a long umbrella kept at her side. Made for walking into a long rain.',
    },
    lore: {
      zh: '她穿这一套时话会更少。不是因为不高兴，只是雨声已经替她说了不少。',
      en: 'She speaks less in this outfit. Not from unhappiness; the rain has already said a good deal for her.',
    },
    unlock: { type: 'level', target: 25 },
    icon: 'umbrella',
    asset: 'outfit-rain',
    fullSprite: true,
  },
  {
    id: 'outfit-formal',
    slot: 'outfit',
    group: 'outfit',
    name: { zh: '旧日礼服', en: 'Old-Day Formal' },
    desc: {
      zh: '一套旧式礼服：深色燕尾、米白背心、紫色领结，帽侧别着一根浅色羽饰。',
      en: 'An old formal set: dark tailcoat, cream waistcoat, violet bow tie, and a pale feather at the hat.',
    },
    lore: {
      zh: '她只在需要把“记录者”三个字穿在身上时穿它。袖口很紧，但站姿会自然变直。',
      en: 'She wears it only when the word “record-keeper” has to be worn on the body. The cuffs are tight; her posture straightens by itself.',
    },
    unlock: { type: 'level', target: 30 },
    icon: 'spark',
    asset: 'outfit-formal',
    fullSprite: true,
  },
  {
    id: 'blue-neckerchief',
    slot: 'neck',
    group: 'accessory',
    name: { zh: '蓝石领巾', en: 'Blue-Stone Neckerchief' },
    desc: {
      zh: '米白领巾中央留一点灰蓝，像一小块没有落下来的雨。搭旧礼帽时，比酒红围巾更轻。',
      en: 'A cream neckerchief with a single grey-blue stone at the center, like a raindrop that never fell. Lighter than the oxblood scarf against the old hat.',
    },
    lore: {
      zh: '她把它系得很低，刚好压住领口。蓝石不是装饰，是她在外勤时用来辨认方向的小标记。',
      en: 'She ties it low, just over the collar. The blue stone is not decoration; it is a small orientation mark she uses in the field.',
    },
    unlock: { type: 'level', target: 3 },
    icon: 'spark',
    asset: 'blue-neckerchief',
  },
  {
    id: 'field-notebook',
    slot: 'held',
    group: 'held',
    name: { zh: '外勤记录簿', en: 'Field Notebook' },
    desc: {
      zh: '深绿封皮、米白页边，一截红色书签从页缝里露出来。拿在手里时，像一页还没合上的现场。',
      en: 'A dark green cover, cream page edges and a red bookmark showing at the seam. In her hand it looks like a scene not yet closed.',
    },
    lore: {
      zh: '里面不只有日期和地点，还有“谁先开口”“谁没有说完”。她翻页时很慢，怕把夹在里面的东西弄丢。',
      en: 'It holds more than dates and places: who spoke first, who did not finish. She turns the pages slowly, afraid of losing what is pressed between them.',
    },
    unlock: { type: 'level', target: 6 },
    icon: 'book',
    asset: 'field-notebook',
    action: { type: 'records', zh: '翻阅记录', en: 'Open records' },
  },
  {
    id: 'tea-cup',
    slot: 'held',
    group: 'held',
    name: { zh: '箱中茶盏', en: 'Case Teacup' },
    desc: {
      zh: '矮白瓷杯，深蓝杯沿，杯底有一圈很细的旧金线。捧着它时，热气会先于话升起来。',
      en: 'A low white porcelain cup with a deep blue rim and a hairline of old gold at the base. When she holds it, the steam rises before the words do.',
    },
    lore: {
      zh: '这不是待客用的那套茶具。她只在小憩时拿出来，杯子刚好能罩住掌心。',
      en: 'This is not the guest tea set. She takes it out only for breaks; it fits neatly over her palm.',
    },
    unlock: { type: 'level', target: 10 },
    icon: 'tea',
    asset: 'tea-cup',
    action: { type: 'tea', zh: '捧茶', en: 'Hold tea' },
  },
  {
    id: 'pocket-watch',
    slot: 'held',
    group: 'held',
    name: { zh: '黄铜怀表', en: 'Brass Pocket Watch' },
    desc: {
      zh: '暗金表盖，边缘磨得发亮，表链只留了一小截。打开时有一声很轻的“嗒”。',
      en: 'A darkened brass cover, polished at the edges, with only a short length of chain left. It opens with a very soft click.',
    },
    lore: {
      zh: '她用这只表开始专注，也用它结束。表盘上有一道旧划痕，位置刚好在十二点与一点之间。',
      en: 'She starts focus with this watch and ends it with the same click. There is an old scratch between twelve and one.',
    },
    unlock: { type: 'level', target: 14 },
    icon: 'clock',
    asset: 'pocket-watch',
    action: { type: 'watch', zh: '查看时间', en: 'Check the time' },
  },
  {
    id: 'field-camera',
    slot: 'held',
    group: 'held',
    name: { zh: '外勤相机', en: 'Field Camera' },
    desc: {
      zh: '黑色机身、银灰镜头，边角有几道细小的磕痕。抬到眼前时会停半拍，像在等对方站定。',
      en: 'A black body with a silver-grey lens and small knocks at the corners. She raises it to her eye and pauses half a beat, as if waiting for the other person to settle.',
    },
    lore: {
      zh: '她拍照不是为了留下漂亮的东西，而是为了记住那个人当时在做什么。照片会旧，动作不会。',
      en: 'She does not photograph things to make them beautiful. She photographs what someone was doing. The print ages; the action does not.',
    },
    unlock: { type: 'level', target: 17 },
    icon: 'camera',
    asset: 'field-camera',
    action: { type: 'camera', zh: '试拍', en: 'Take a photo' },
  },
  {
    id: 'case-photo',
    slot: 'case',
    group: 'case',
    name: { zh: '箱侧合影', en: 'Photo by the Case' },
    desc: {
      zh: '一张米白边的照片夹在提手旁。画面很小，只能看清几个人站在一起，背景像一场还没停的雨。',
      en: 'A cream-bordered photograph clipped by the handle. The image is small: a few people standing together, a background that looks like rain not yet stopped.',
    },
    lore: {
      zh: '她很少把照片拿出来。偶尔翻到，会先看照片边缘，再看人；像在确认那天的天气有没有也跟着留下来。',
      en: 'She rarely takes it out. When she does, she looks at the edges first, then the people, as if checking whether the weather stayed too.',
    },
    unlock: { type: 'level', target: 20 },
    icon: 'pin',
    asset: 'case-photo',
    action: { type: 'photo', zh: '翻看照片', en: 'View the photo' },
  },
  {
    id: 'night-lantern',
    slot: 'held',
    group: 'held',
    name: { zh: '夜行提灯', en: 'Night Lantern' },
    desc: {
      zh: '深色提环下是一小格琥珀色灯光。走动时会轻轻晃，停下后自己回正。',
      en: 'A dark carry ring over a small pane of amber light. It sways when she walks and settles when she stops.',
    },
    lore: {
      zh: '她不需要它照亮整条路。只要前面两三步能看清，就足够继续走。',
      en: 'She does not need it to light the whole road. Two or three steps ahead is enough to keep walking.',
    },
    unlock: { type: 'level', target: 23 },
    icon: 'spark',
    asset: 'night-lantern',
    action: { type: 'lantern', zh: '提起灯', en: 'Lift the lantern' },
  },
  {
    id: 'outfit-field',
    slot: 'outfit',
    group: 'outfit',
    name: { zh: '外勤调查服', en: 'Field Investigator' },
    desc: {
      zh: '暖灰短风衣、深蓝礼帽、斜挎相机带。衣摆比司辰大衣短，走路时更容易看见脚步。',
      en: 'A warm grey short trench, a deep navy hat and a diagonal camera strap. The hem is shorter than the Timekeeper coat, so the steps show when she walks.',
    },
    lore: {
      zh: '这是她离开桌子、走进现场时穿的一套。口袋里通常还有一支铅笔和一张折过两次的纸。',
      en: 'This is what she wears when she leaves the desk and walks into a scene. There is usually a pencil and a twice-folded sheet of paper in the pocket.',
    },
    unlock: { type: 'level', target: 27 },
    icon: 'camera',
    asset: 'outfit-field',
    fullSprite: true,
  },
];

export function wardrobeItemById(id) {
  return WARDROBE_ITEMS.find((item) => item.id === id) || null;
}

export function wardrobeItemsForGroup(group = 'all') {
  if (!group || group === 'all') return WARDROBE_ITEMS;
  return WARDROBE_ITEMS.filter((item) => item.group === group);
}
