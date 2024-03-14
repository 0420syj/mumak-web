interface GetSheetValuesRequestInterface {
  protocol: string;
  host: string;
  sheetName: string;
  range: string;
}

interface GetSheetValuesResponseInterface {
  values: number[][];
}

export async function getSheetValues({
  protocol,
  host,
  sheetName,
  range,
}: GetSheetValuesRequestInterface): Promise<GetSheetValuesResponseInterface['values']> {
  const response = await fetch(`${protocol}://${host}/api/sheets/${sheetName}/?range=${range}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { values } = (await response.json()) as GetSheetValuesResponseInterface;
  return values;
}
