import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { convertDateToSerial } from '@repo/lib';
import type { z } from 'zod';
import { GoogleSheetsService } from '@moomin-money/services/google-sheets-service';
import { authOptions } from '@moomin-money/libs/auth';
import type { formSchema } from '@moomin-money/components/home/home-form';

const googleSheetsService = new GoogleSheetsService();

interface RequestInterface extends Omit<z.infer<typeof formSchema>, 'date' | 'name' | 'price'> {
  date: number;
  name?: string;
  price: number;
}

export async function POST(request: Request): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Login required' }, { status: 401 });
  }

  try {
    const requestData = (await request.json()) as RequestInterface;
    requestData.date = convertDateToSerial(new Date(requestData.date));
    requestData.price = Number(requestData.price);

    if (!process.env.GOOGLE_SPREADSHEET_ID) {
      throw new Error('GOOGLE_SPREADSHEET_ID is not set');
    }

    if (!process.env.GOOGLE_WANNY_SHEET_NAME || !process.env.GOOGLE_MOOMIN_SHEET_NAME) {
      throw new Error('GOOGLE_WANNY_SHEET_NAME or GOOGLE_MOOMIN_SHEET_NAME is not set');
    }

    const sheetNameMap: Record<string, string> = {
      wanny: process.env.GOOGLE_WANNY_SHEET_NAME,
      moomin: process.env.GOOGLE_MOOMIN_SHEET_NAME,
    };

    if (!requestData.name) {
      throw new Error('Name is required');
    }
    const sheetName =
      process.env.NODE_ENV === 'development' ? process.env.GOOGLE_TEST_SHEET_NAME : sheetNameMap[requestData.name];
    const range = `${sheetName}!${process.env.GOOGLE_SHEET_RANGE}`;

    delete requestData.name;
    const valueData = [Object.values(requestData)];

    const response = await googleSheetsService.postSheetValues(process.env.GOOGLE_SPREADSHEET_ID, range, valueData);

    return NextResponse.json({ data: response });
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Failed to post sheet values via Google API' }, { status: 500 });
  }
}
