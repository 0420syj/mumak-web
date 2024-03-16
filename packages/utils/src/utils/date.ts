const MS_PER_DAY = 86400 * 1000;
const SECONDS_PER_DAY = 86400;
const EPOCH_DIFFERENCE = 25569;

const getUtcDays = (serial: number): number => Math.floor(serial - EPOCH_DIFFERENCE);
const getUtcValue = (utcDays: number): number => utcDays * MS_PER_DAY;
const getDateInfo = (utcValue: number): Date => new Date(utcValue);

const getFractionalDay = (serial: number): number => serial - Math.floor(serial) + 0.0000001;
const getTotalSeconds = (fractionalDay: number): number => Math.floor(SECONDS_PER_DAY * fractionalDay);
const getSeconds = (totalSeconds: number): number => totalSeconds % 60;
const getHours = (totalSeconds: number): number => Math.floor(totalSeconds / (60 * 60));
const getMinutes = (totalSeconds: number): number => Math.floor(totalSeconds / 60) % 60;

export const toKoreanISOString = (date: Date): string => {
  const offset = date.getTimezoneOffset() * 60000;
  const dateOffset = new Date(date.getTime() - offset);
  return dateOffset.toISOString().slice(0, 10);
};

export const getAllSerialDatesByMonth = (year: number, month: number): number[] => {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  const firstSerial = convertToSerial(toKoreanISOString(firstDay));
  const lastSerial = convertToSerial(toKoreanISOString(lastDay));

  const serialDates = [];
  for (let i = firstSerial; i <= lastSerial; i++) {
    serialDates.push(i);
  }

  return serialDates;
};

export const convertToDate = (serial: number): Date => {
  const utcDays = getUtcDays(serial);
  const utcValue = getUtcValue(utcDays);
  const dateInfo = getDateInfo(utcValue);

  const fractionalDay = getFractionalDay(serial);
  let totalSeconds = getTotalSeconds(fractionalDay);

  const seconds = getSeconds(totalSeconds);
  totalSeconds -= seconds;

  const hours = getHours(totalSeconds);
  const minutes = getMinutes(totalSeconds);

  const date = new Date(dateInfo.getFullYear(), dateInfo.getMonth(), dateInfo.getDate(), hours, minutes, seconds);

  return date;
};

export const convertToSerial = (date: string): number => {
  const [year, month, day] = date.split('-').map(v => parseInt(v, 10));
  const utcValue = Date.UTC(year, month - 1, day);
  const utcDays = utcValue / MS_PER_DAY;

  return utcDays + EPOCH_DIFFERENCE;
};

export const convertDateToSerial = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dateString = `${year}-${month}-${day}`;
  return convertToSerial(dateString);
};
