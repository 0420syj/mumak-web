import {
  convertExcelSerialDateToJSDate,
  convertJSDateToExcelSerialDate,
  convertLocalTimeZoneToUTCTimeZone,
} from '@repo/lib';

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
  });
});

describe('convertLocalTimeZoneToUTCTimeZone', () => {
  it('should correctly convert local time to UTC time', () => {
    const localDate = new Date('2022-01-01T00:00:00');
    const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60 * 1_000);
    expect(convertLocalTimeZoneToUTCTimeZone(localDate)).toStrictEqual(utcDate);

    const localDate2 = new Date('2022-12-31T23:59:59');
    const utcDate2 = new Date(localDate2.getTime() - localDate2.getTimezoneOffset() * 60 * 1_000);
    expect(convertLocalTimeZoneToUTCTimeZone(localDate2)).toStrictEqual(utcDate2);

    const localDate3 = new Date('2000-06-15T12:30:00');
    const utcDate3 = new Date(localDate3.getTime() - localDate3.getTimezoneOffset() * 60 * 1_000);
    expect(convertLocalTimeZoneToUTCTimeZone(localDate3)).toStrictEqual(utcDate3);
  });
});
