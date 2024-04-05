import { includeByCho } from '@moomin-money/libs/search';

describe('includeByCho', () => {
  it('should return true if the target word includes the search word', () => {
    expect(includeByCho('ㄱ', '가')).toBe(true);
    expect(includeByCho('ㄲ', '까')).toBe(true);
    expect(includeByCho('ㄴ', '나')).toBe(true);
    expect(includeByCho('ㄱㄴㄷ', '가나다')).toBe(true);
    expect(includeByCho('ㄱ나다', '가나다')).toBe(true);
    expect(includeByCho('ㄱㄴㄷㄹ', '가나다라')).toBe(true);
    expect(includeByCho('가ㄴㄷ라', '가나다라')).toBe(true);
    expect(includeByCho('ㄱㄴ ㄷㄹ', '가나 다라')).toBe(true);
    expect(includeByCho('ㄱㄴㄷㄹ', '가나다라 ')).toBe(true);
  });

  it('should return false if the target word does not include the search word', () => {
    expect(includeByCho('ㄱㄴ ㄷㄹ', '가나다라')).toBe(false);
    expect(includeByCho('ㄱㄴㄷㄹ', '가나 다라')).toBe(false);
    expect(includeByCho('ㄱㄴㄷㄹ', '가 나다라')).toBe(false);
    expect(includeByCho('ㄱㄴㄷㄹ', '가나다 라')).toBe(false);
  });
});
