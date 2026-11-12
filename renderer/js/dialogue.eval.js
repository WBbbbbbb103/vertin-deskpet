/**
 * Fixed local dialogue checks. These do not call DeepSeek; they verify that
 * the offline reply rules still cover the twelve common desk conversations.
 */
export const DIALOGUE_EVAL_CASES = [
  { id: 'greeting', input: '你好', expect: /你好|来了|外面|Hello|I'm here|rain/i },
  { id: 'weather', input: '今天下雨了', expect: /雨|天气|伞|rain|weather|umbrella/i },
  { id: 'tired', input: '我有点累', expect: /肩膀|不做|听见|下一步|停|rest|tired|shoulder|step/i },
  { id: 'friend', input: '十四行诗最近怎么样', expect: /十四行诗|她|报告|记录|Sonetto|she|report|record/i },
  { id: 'suitcase', input: '箱子里有什么', expect: /箱子|四层|旧信|认生|suitcase|layer|letter/i },
  { id: 'likes', input: '你喜欢什么', expect: /喜欢|旧物|留声机|like|old|record/i },
  { id: 'food', input: '晚上吃什么', expect: /茶|点心|吃|糖|tea|eat|sugar/i },
  { id: 'focus', input: '帮我专注25分钟', expect: /计时|二十五|专注|沙漏|timer|focus|twenty|hourglass/i },
  { id: 'time', input: '现在几点', expect: /现在|时间|钟表|time|clock|o'clock/i },
  { id: 'identity', input: '你是谁', expect: /维尔汀|记录者|箱子|Vertin|record|keeper|case/i },
  { id: 'sleep', input: '我睡不着', expect: /晚安|睡|雨声|night|sleep|rain/i },
  { id: 'farewell', input: '再见', expect: /去吧|路上|等你|伞|goodbye|go|wait|umbrella/i },
];
