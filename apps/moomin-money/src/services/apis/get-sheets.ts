import { headers } from 'next/headers';

const host = headers().get('x-forwarded-host');
const protocol = headers().get('x-forwarded-proto');

interface GetSheetValuesRequestInterface {
  sheetName: string;
  range: string;
}

interface GetSheetValuesResponseInterface {
  values: number[][];
}

export async function getSheetValues({
  sheetName,
  range,
}: GetSheetValuesRequestInterface): Promise<GetSheetValuesResponseInterface['values']> {
  const response = await fetch(`${protocol}://${host}/api/sheets/${sheetName}/?range=${range}`);
  const { values } = (await response.json()) as GetSheetValuesResponseInterface;
  return values;
}
