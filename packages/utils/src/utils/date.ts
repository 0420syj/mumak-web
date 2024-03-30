export const convertLocalTimeZoneToUTCTimeZone = (date: Date): Date => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1_000);
};

/**
 * Convert Excel serial date to JS date
 * See also {@link https://stackoverflow.com/a/67130235}
 * @param serial - Excel serial date
 * @returns JS date
 */
export const convertExcelSerialDateToJSDate = (serial: number): Date => {
  return new Date(Date.UTC(0, 0, serial - 1));
};

export const convertJSDateToExcelSerialDate = (date: Date): number => {
  const MS_PER_DAY = 86_400 * 1_000;
  const EPOCH_DIFFERENCE = 25_569;

  return Math.floor(EPOCH_DIFFERENCE + date.getTime() / MS_PER_DAY);
};
