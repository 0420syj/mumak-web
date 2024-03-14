import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form';
import { RadioGroup, RadioGroupItem } from '@repo/ui/radio-group';
import type { Control } from 'react-hook-form';
import type { z } from 'zod';
import type { formSchema } from '../home-form';

interface RadioOption {
  id: string;
  label: string;
}

const radioOptions: RadioOption[] = [
  { id: 'delivery', label: '🚚 배달' },
  { id: 'food', label: '🍔 음식' },
  { id: 'shopping', label: '🛍 쇼핑' },
  { id: 'transport', label: '🚇 교통' },
  { id: 'etc', label: '📦 기타' },
];

export function CategoryFormFieldV2({ control }: { control: Control<z.infer<typeof formSchema>> }): React.ReactElement {
  return (
    <FormField
      control={control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup className="grid grid-cols-4 gap-4" defaultValue={field.value} onValueChange={field.onChange}>
              {radioOptions.map(option => (
                <FormItem className="flex items-center justify-center" key={option.id}>
                  <FormControl>
                    <RadioGroupItem className="sr-only peer" id={option.id} value={option.id} />
                  </FormControl>
                  <FormLabel
                    className="flex flex-col w-full items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    htmlFor={option.id}
                  >
                    {option.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
