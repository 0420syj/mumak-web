/* eslint-disable @typescript-eslint/no-non-null-assertion -- safe */

import * as React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form';
import type { z } from 'zod';
import type { Control } from 'react-hook-form';
import { Input } from '@repo/ui/input';
import { getSession } from 'next-auth/react';
import { getSheetValues } from '@moomin-money/services/apis/get-sheets';
import { isVercelEnvProduction } from '@moomin-money/libs/vercel';
import type { formSchema } from '../home-form';

export function NoteFormField({ control }: { control: Control<z.infer<typeof formSchema>> }): React.ReactElement {
  const getAutoComplete = async (value: string): Promise<(string | number)[]> => {
    const session = await getSession();
    if (!session) {
      return [];
    }

    if (!process.env.NEXT_PUBLIC_GOOGLE_WANNY_SHEET_NAME || !process.env.NEXT_PUBLIC_GOOGLE_MOOMIN_SHEET_NAME) {
      throw new Error('GOOGLE_WANNY_SHEET_NAME or GOOGLE_MOOMIN_SHEET_NAME is not set');
    }

    const sheetNameMap: Record<string, string> = {
      wanny: process.env.NEXT_PUBLIC_GOOGLE_WANNY_SHEET_NAME,
      moomin: process.env.NEXT_PUBLIC_GOOGLE_MOOMIN_SHEET_NAME,
    };

    const name = control._defaultValues.name!;
    const sheetName = !isVercelEnvProduction() ? process.env.NEXT_PUBLIC_GOOGLE_TEST_SHEET_NAME! : sheetNameMap[name];

    const response = await getSheetValues({ sheetName, range: process.env.NEXT_PUBLIC_GOOGLE_NOTE_RANGE });
    const filteredResponse = response
      .filter(item => {
        const [note] = item;
        if (typeof note !== 'string') {
          return false;
        }
        return note.includes(value);
      })
      .map(item => {
        const [note] = item;
        return note;
      });

    setAutoComplete(filteredResponse);
    return filteredResponse;
  };

  const [autoComplete, setAutoComplete] = React.useState<(string | number)[]>([]);

  return (
    <FormField
      control={control}
      name="note"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">비고</FormLabel>
          <FormControl>
            <Input
              {...field}
              className="text-base h-10"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                void getAutoComplete(event.target.value);
                field.onChange(event.target.value);
              }}
            />
          </FormControl>
          <ul>
            {autoComplete.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key -- safe
              <li key={index}>{item}</li>
            ))}
          </ul>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
