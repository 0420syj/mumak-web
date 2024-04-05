import { cn } from './cn';

describe('cn', () => {
  it('should concatenate class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
    expect(cn('class1', 'class2', 'class3')).toBe('class1 class2 class3');
  });

  it('should handle empty inputs', () => {
    expect(cn()).toBe('');
  });

  it('should handle falsy inputs', () => {
    expect(cn('class1', null, 'class2', undefined, 'class3')).toBe('class1 class2 class3');
  });
});
