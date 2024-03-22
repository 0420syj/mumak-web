import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form';
import type { z } from 'zod';
import type { Control } from 'react-hook-form';
import { Input } from '@repo/ui/input';
import type { formSchema } from '../home-form';

export function PriceFormField({ control }: { control: Control<z.infer<typeof formSchema>> }): React.ReactElement {
  const addComma = (value: string): string => {
    if (value === '-' || value === '') {
      return value;
    }

    return Number(value).toLocaleString();
  };
  const removeNonNumber = (value: string): string => {
    return value.replace(/[^0-9-]/g, '');
  };
  const isNumber = (value: string): boolean => {
    if (value === '-' || value === '') {
      return true;
    }

    return /^-?\d+$/.test(value);
  };

  return (
    <FormField
      control={control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">가격</FormLabel>
          <FormControl>
            <Input
              {...field}
              className="text-base h-10"
              inputMode="numeric"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = removeNonNumber(event.target.value);
                if (!isNumber(value)) {
                  return;
                }
                field.onChange(addComma(value));
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
