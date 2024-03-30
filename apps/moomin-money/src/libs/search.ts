const CHO_HANGUL = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

const HANGUL_START_CHARCODE = '가'.charCodeAt(0);

const CHO_PERIOD = Math.floor('까'.charCodeAt(0) - '가'.charCodeAt(0));
const JUNG_PERIOD = Math.floor('개'.charCodeAt(0) - '가'.charCodeAt(0));

function combine(cho = 0, jung = 0, jong = 0): string {
  return String.fromCharCode(HANGUL_START_CHARCODE + cho * CHO_PERIOD + jung * JUNG_PERIOD + jong);
}

function escapeRegExpChars(text: string): string {
  // This matches any character that has a special meaning in regex and escapes it.
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function makeRegexByCho(search = ''): RegExp {
  const escapedSearch = escapeRegExpChars(search);

  const regex = CHO_HANGUL.reduce((acc, cho, index) => {
    const choRegex = new RegExp(escapeRegExpChars(cho), 'g');
    return acc.replace(choRegex, `[${combine(index, 0, 0)}-${combine(index + 1, 0, -1)}]`);
  }, escapedSearch);

  return new RegExp(`(${regex})`, 'g');
}

export function includeByCho(search = '', targetWord = ''): boolean {
  return makeRegexByCho(search).test(targetWord);
}
