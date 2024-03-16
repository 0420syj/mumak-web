import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { convertDateToSerial } from '@repo/lib';
import type { z } from 'zod';
import { GoogleSheetsService } from '@moomin-money/services/google-sheets-service';
import { authOptions } from '@moomin-money/libs/auth';
import type { formSchema } from '@moomin-money/components/home/home-form';

const googleSheetsService = new GoogleSheetsService();

const sheetNameMap = {
  wanny: process.env.GOOGLE_WANNY_SHEET_NAME,
  moomin: process.env.GOOGLE_MOOMIN_SHEET_NAME,
};

interface RequestInterface extends Omit<z.infer<typeof formSchema>, 'date'> {
  date: number;
}

export async function POST(request: Request): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const requestData = (await request.json()) as RequestInterface;
    requestData.date = convertDateToSerial(new Date(requestData.date));
    const valueData = [Object.values(requestData)];

    // TODO: temporarily disabled
    // const response = await googleSheetsService.postSheetValues(
    //   process.env.GOOGLE_SPREADSHEET_ID as string,
    //   (sheetNameMap[formData.name] + '!' + process.env.GOOGLE_SHEET_RANGE) as string,
    //   valueData
    // );

    return NextResponse.json({ data: valueData });
  } catch (error: unknown) {
    return NextResponse.json({ error: "Couldn't post sheet values" }, { status: 500 });
  }
}
