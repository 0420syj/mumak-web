import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form';
import type { z } from 'zod';
import type { Control } from 'react-hook-form';
import { Input } from '@repo/ui/input';
import type { formSchema } from '../home-form';

export function ContentFormField({ control }: { control: Control<z.infer<typeof formSchema>> }): React.ReactElement {
  return (
    <FormField
      control={control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">내용</FormLabel>
          <FormControl>
            <Input {...field} className="text-base h-10" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
