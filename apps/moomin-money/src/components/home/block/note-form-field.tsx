/* eslint-disable @typescript-eslint/no-non-null-assertion -- safe */

import * as React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form';
import type { z } from 'zod';
import type { Control } from 'react-hook-form';
import { Input } from '@repo/ui/input';
import { getSession } from 'next-auth/react';
import { getSheetValues } from '@moomin-money/services/apis/get-sheets';
import { isVercelEnvProduction } from '@moomin-money/libs/vercel';
import { includeByCho } from '@moomin-money/libs/search';
import type { formSchema } from '../home-form';

export function NoteFormField({ control }: { control: Control<z.infer<typeof formSchema>> }): React.ReactElement {
  const fetchNoteData = async (name: string): Promise<(string | number)[]> => {
    const session = await getSession();
    if (!session) {
      return [];
    }

    if (!process.env.NEXT_PUBLIC_GOOGLE_WANNY_SHEET_NAME || !process.env.NEXT_PUBLIC_GOOGLE_MOOMIN_SHEET_NAME) {
      throw new Error('NEXT_PUBLIC_GOOGLE_WANNY_SHEET_NAME or NEXT_PUBLIC_GOOGLE_MOOMIN_SHEET_NAME is not set');
    }

    if (!process.env.NEXT_PUBLIC_GOOGLE_NOTE_RANGE) {
      throw new Error('NEXT_PUBLIC_GOOGLE_NOTE_RANGE is not set');
    }

    const sheetNameMap: Record<string, string> = {
      wanny: process.env.NEXT_PUBLIC_GOOGLE_WANNY_SHEET_NAME,
      moomin: process.env.NEXT_PUBLIC_GOOGLE_MOOMIN_SHEET_NAME,
    };

    const sheetName = !isVercelEnvProduction() ? process.env.NEXT_PUBLIC_GOOGLE_TEST_SHEET_NAME! : sheetNameMap[name];

    const response = await getSheetValues({ sheetName, range: process.env.NEXT_PUBLIC_GOOGLE_NOTE_RANGE }).then(
      values => {
        return values
          .map(item => {
            const [note] = item;
            return note;
          })
          .filter((item, index, self) => self.indexOf(item) === index)
          .filter(item => item !== '');
      }
    );
    return response;
  };

  const [autoComplete, setAutoComplete] = React.useState<(string | number)[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>('');

  React.useEffect(() => {
    void fetchNoteData(control._defaultValues.name!).then(response => {
      setAutoComplete(response);
    });
  }, [control._defaultValues.name, setAutoComplete]);

  const handleSearch = React.useCallback((value: string): void => {
    setSearchValue(value);
  }, []);

  const filteredAutoComplete = React.useMemo(() => {
    return autoComplete.filter(item => includeByCho(searchValue, String(item)));
  }, [autoComplete, searchValue]);

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
                handleSearch(event.target.value);
                field.onChange(event.target.value);
              }}
            />
          </FormControl>
          <ul className="max-h-[100px] overflow-y-auto overflow-x-hidden rounded-md border border-foreground/20">
            {filteredAutoComplete.map(item => (
              <li
                className="text-base p-2 cursor-pointer hover:bg-foreground/10"
                key={`list-${item}`}
                onClick={() => {
                  field.onChange(item);
                  handleSearch(item as string);
                }}
                onKeyDown={event => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    field.onChange(item);
                    handleSearch(item as string);
                  }
                }}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role -- safe
                role="button"
                tabIndex={-1} // Added tabIndex of -1
              >
                {item}
              </li>
            ))}
          </ul>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
