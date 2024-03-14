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
  const host = process.env.NEXT_PUBLIC_HOST;
  if (!host) {
    throw new Error('NEXT_PUBLIC_HOST is not set');
  }

  const response = await fetch(`${host}/api/sheets/${sheetName}?range=${range}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { values } = (await response.json()) as GetSheetValuesResponseInterface;
  return values;
}
