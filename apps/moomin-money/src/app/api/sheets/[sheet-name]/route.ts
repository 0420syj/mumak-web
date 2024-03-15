import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { GoogleSheetsService } from '@moomin-money/services/google-sheets-service';

const googleSheetsService = new GoogleSheetsService();

export async function GET(
  request: NextRequest,
  { params }: { params: { 'sheet-name': string } }
): Promise<NextResponse> {
  try {
    const { 'sheet-name': sheetName } = params;
    const range = request.nextUrl.searchParams.get('range');

    if (!process.env.GOOGLE_SPREADSHEET_ID) {
      throw new Error('GOOGLE_SPREADSHEET_ID is not set');
    }
    const values = await googleSheetsService.getSheetValues(process.env.GOOGLE_SPREADSHEET_ID, `${sheetName}!${range}`);

    return NextResponse.json({ values });
  } catch (error: unknown) {
    return NextResponse.json({ error: "Couldn't get sheet values" }, { status: 500 });
  }
}
