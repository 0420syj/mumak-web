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

    if (!process.env.GOOGLE_SHEET_RANGE) {
      throw new Error('GOOGLE_SHEET_RANGE is not set');
    }

    const range = request.nextUrl.searchParams.get('range') || process.env.GOOGLE_SHEET_RANGE;

    if (!process.env.GOOGLE_SPREADSHEET_ID) {
      throw new Error('GOOGLE_SPREADSHEET_ID is not set');
    }
    const values = await googleSheetsService.getSheetValues(process.env.GOOGLE_SPREADSHEET_ID, `${sheetName}!${range}`);

    return NextResponse.json({ values });
  } catch (error: unknown) {
    // eslint-disable-next-line no-console -- This is a server-side function
    console.error('Failed to get sheet values', error);
    return NextResponse.json({ error: 'Failed to get sheet values' }, { status: 500 });
  }
}
