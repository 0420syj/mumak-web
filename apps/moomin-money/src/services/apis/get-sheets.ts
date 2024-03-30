interface GetSheetValuesRequestInterface {
  sheetName: string;
  range?: string;
}

interface GetSheetValuesResponseInterface {
  values: (number | string)[][];
}

export async function getSheetValues({
  sheetName,
  range,
}: GetSheetValuesRequestInterface): Promise<GetSheetValuesResponseInterface['values']> {
  const response = await fetch(`/api/sheets/${sheetName}${range && `?range=${range}`}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    return response.text().then(text => {
      throw new Error(text);
    });
  }

  const { values } = (await response.json()) as GetSheetValuesResponseInterface;
  return values;
}
