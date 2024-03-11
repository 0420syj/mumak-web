import { NextResponse } from 'next/server';
import { GoogleSheetsService } from '@moomin-money/services/google-sheets-service';

const googleSheetsService = new GoogleSheetsService();

export async function GET(request: Request, { params }: { params: { slug: string } }): Promise<NextResponse> {
  try {
    const slug = params.slug;

    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range');

    if (!process.env.GOOGLE_SPREADSHEET_ID) {
      throw new Error('GOOGLE_SPREADSHEET_ID is not set');
    }
    const values = await googleSheetsService.getSheetValues(
      process.env.GOOGLE_SPREADSHEET_ID,
      `${slug}!${range ?? process.env.GOOGLE_SHEET_RANGE}`
    );

    return NextResponse.json({ values });
  } catch (error: unknown) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
