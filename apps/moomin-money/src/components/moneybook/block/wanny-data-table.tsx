/* eslint-disable @typescript-eslint/no-non-null-assertion -- safe */

import { getSheetValues } from '@moomin-money/services/apis/get-sheets';
import { isVercelEnvProduction } from '@moomin-money/libs/vercel';
import { isSessionValid } from '@moomin-money/libs/auth';
import { DataTable } from './data-table/data-table';
import type { Moneybook } from './wanny-columns';
import { columns } from './wanny-columns';

function convertToDataTableData(response: (string | number)[][]): {
  columnHeader: {
    label: string | number;
  }[];
  data: Moneybook[];
} {
  const [headerRow, ...dataRows] = response;

  const columnHeader = headerRow.map(header => ({
    label: header,
  }));

  type MoneybookKey = keyof Moneybook;

  const data = dataRows.map(row => {
    const rowData = {} as Moneybook;
    row.forEach((cell, index) => {
      const key = headerRow[index] as MoneybookKey;
      rowData[key] = cell;
    });
    return rowData;
  });

  return {
    columnHeader,
    data,
  };
}

const fetchMoneySpendList = async (name: 'wanny' | 'moomin'): Promise<(string | number)[][]> => {
  if (!process.env.GOOGLE_WANNY_SHEET_NAME || !process.env.GOOGLE_MOOMIN_SHEET_NAME) {
    throw new Error('GOOGLE_WANNY_SHEET_NAME or GOOGLE_MOOMIN_SHEET_NAME is not set');
  }

  const sheetNameMap: Record<string, string> = {
    wanny: process.env.GOOGLE_WANNY_SHEET_NAME,
    moomin: process.env.GOOGLE_MOOMIN_SHEET_NAME,
  };

  const sheetName = !isVercelEnvProduction() ? process.env.GOOGLE_TEST_SHEET_NAME! : sheetNameMap[name];

  try {
    return await getSheetValues({ sheetName });
  } catch (error) {
    // eslint-disable-next-line no-console -- This is a server-side function
    console.error('Failed to fetch money spend', error);
    throw new Error(error as string);
  }
};

export default async function WannyDataTable(): Promise<React.ReactElement> {
  if (!(await isSessionValid())) {
    return <div className="flex flex-col gap-1">로그인이 필요합니다.</div>;
  }

  const name = 'wanny';

  const [moneySpends] = await Promise.all([fetchMoneySpendList(name)]);
  const { data } = convertToDataTableData(moneySpends);

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
