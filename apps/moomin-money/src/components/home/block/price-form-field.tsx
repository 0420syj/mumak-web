import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form';
import type { z } from 'zod';
import type { Control } from 'react-hook-form';
import { Input } from '@repo/ui/input';
import type { formSchema } from '../home-form';

export function PriceFormField({ control }: { control: Control<z.infer<typeof formSchema>> }): React.ReactElement {
  return (
    <FormField
      control={control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">가격</FormLabel>
          <FormControl>
            <Input {...field} inputMode="numeric" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
