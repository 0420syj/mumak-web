/* eslint-disable @typescript-eslint/no-non-null-assertion -- safe */

import { convertJSDateToExcelSerialDate } from '@repo/lib';
import { getSheetValues } from '@moomin-money/services/apis/get-sheets';
import { isVercelEnvProduction } from '@moomin-money/libs/vercel';
import { isSessionValid } from '@moomin-money/libs/auth';
import { GoogleSheetsService } from '@moomin-money/services/google-sheets-service';
import type { Moneybook } from './data-table-columns';
import { columns } from './data-table-columns';
import { DataTable } from './data-table';

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

  const data = dataRows
    .map(row => {
      const rowData = {} as Moneybook;
      row.forEach((cell, index) => {
        const key = headerRow[index] as MoneybookKey;
        rowData[key] = cell;
      });
      return rowData;
    })
    //TODO: remove this filter after implementing the value filtering feature
    .filter(row => {
      const lastDayOfThisMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
      return row.날짜 <= convertJSDateToExcelSerialDate(lastDayOfThisMonth);
    });

  return {
    columnHeader,
    data,
  };
}

const fetchMoneySpendList = async (name: 'wanny' | 'moomin'): Promise<(string | number)[][]> => {
  const googleSheetsService = new GoogleSheetsService();

  if (!process.env.GOOGLE_WANNY_SHEET_NAME || !process.env.GOOGLE_MOOMIN_SHEET_NAME) {
    throw new Error('GOOGLE_WANNY_SHEET_NAME or GOOGLE_MOOMIN_SHEET_NAME is not set');
  }

  const sheetNameMap: Record<string, string> = {
    wanny: process.env.GOOGLE_WANNY_SHEET_NAME,
    moomin: process.env.GOOGLE_MOOMIN_SHEET_NAME,
  };

  const sheetName = !isVercelEnvProduction() ? process.env.GOOGLE_TEST_SHEET_NAME! : sheetNameMap[name];

  try {
    return await googleSheetsService.getSheetValues(`${sheetName}!${process.env.GOOGLE_SHEET_RANGE}`);
  } catch (error) {
    // eslint-disable-next-line no-console -- This is a server-side function
    console.error('Failed to fetch money spend', error);
    throw new Error(error as string);
  }
};

export default async function DataTableContainer({ name }: { name: 'wanny' | 'moomin' }): Promise<React.ReactElement> {
  if (!(await isSessionValid())) {
    return <div className="flex flex-col gap-1">로그인이 필요합니다.</div>;
  }

  const [moneySpends] = await Promise.all([fetchMoneySpendList(name)]);
  const { data } = convertToDataTableData(moneySpends);

  return <DataTable columns={columns} data={data} />;
}
