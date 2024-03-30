import { convertDateToSerial } from '@repo/lib';

describe('convertDateToSerial', () => {
  it('should convert date to serial number', () => {
    expect(convertDateToSerial(new Date('2024-03-30'))).toBe(45381);
  });
});
