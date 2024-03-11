import { google } from 'googleapis';

export class GoogleSheetsService {
  private auth;
  private sheets;

  constructor() {
    this.auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
  }

  async getSheetValues(spreadsheetId: string, range: string): Promise<string[][]> {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
      majorDimension: 'ROWS',
      valueRenderOption: 'UNFORMATTED_VALUE',
    });

    return response.data.values as string[][];
  }

  async postSheetValues(spreadsheetId: string, range: string, values: unknown[][]): Promise<unknown[][] | undefined> {
    const request = {
      spreadsheetId,
      range,
      includeValuesInResponse: true,
      insertDataOption: 'INSERT_ROWS',
      responseDateTimeRenderOption: 'FORMATTED_STRING',
      responseValueRenderOption: 'FORMATTED_VALUE',
      valueInputOption: 'RAW',
      requestBody: {
        majorDimension: 'ROWS',
        range: '',
        values,
      },
    };

    try {
      const response = await this.sheets.spreadsheets.values.append(request);
      return response.data.updates?.updatedData?.values as unknown[][] | undefined;
    } catch (err: unknown) {
      throw new Error(err as string);
    }
  }

  async putSheetValues(
    spreadsheetId: string,
    range: string,
    values: unknown[][]
    /*
		"values": [
			[
			null,
			null,
			100000000,
			null,
			null,
			""
			]
		]

		null : 해당 셀은 변경하지 않음
		"" : 해당 셀은 빈 값으로 변경
		*/
  ): Promise<unknown[][] | undefined> {
    const request = {
      spreadsheetId,
      range,
      includeValuesInResponse: true,
      responseDateTimeRenderOption: 'FORMATTED_STRING',
      responseValueRenderOption: 'FORMATTED_VALUE',
      valueInputOption: 'RAW',
      requestBody: {
        majorDimension: 'ROWS',
        range: '',
        values,
      },
    };

    try {
      const response = await this.sheets.spreadsheets.values.update(request);
      return response.data.updatedData?.values as unknown[][] | undefined;
    } catch (err: unknown) {
      throw new Error(err as string);
    }
  }

  async deleteSheetValues(
    spreadsheetId: string,
    sheetId: number, // gid=0, 추후 env 변수에 추가
    rowIndex: number
  ): Promise<unknown> {
    // 참고 : https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate?hl=ko
    const request = {
      spreadsheetId,
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId,
              dimension: 'ROWS',
              startIndex: rowIndex - 1,
              endIndex: rowIndex,
            },
          },
        },
      ],
    };

    try {
      const response = await this.sheets.spreadsheets.values.batchUpdate(request);
      return response.data;
    } catch (err: unknown) {
      throw new Error(err as string);
    }
  }
}
