import { convertExcelSerialDateToJSDate, convertJSDateToExcelSerialDate } from '@repo/lib';

describe('convertExcelSerialDateToJSDate', () => {
  it('should convert excel serial date to js date', () => {
    expect(convertExcelSerialDateToJSDate(45381)).toStrictEqual(new Date('2024-03-30'));
    expect(convertExcelSerialDateToJSDate(45382)).toStrictEqual(new Date('2024-03-31'));
    expect(convertExcelSerialDateToJSDate(25569)).toStrictEqual(new Date('1970-01-01'));
  });
});

describe('convertJSDateToExcelSerialDate', () => {
  it('should convert js date to excel serial date', () => {
    expect(convertJSDateToExcelSerialDate(new Date('2024-03-30'))).toBe(45381);
    expect(convertJSDateToExcelSerialDate(new Date('2024-03-31'))).toBe(45382);
    expect(convertJSDateToExcelSerialDate(new Date('1970-01-01'))).toBe(25569);
    expect(convertJSDateToExcelSerialDate(new Date('1901-01-01'))).toBe(367);
    expect(convertJSDateToExcelSerialDate(new Date('1900-01-01'))).toBe(1);
  });
});
