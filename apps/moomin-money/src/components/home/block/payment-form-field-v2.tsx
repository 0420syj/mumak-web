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
  { id: 'credit-card', label: '💳 신용카드' },
  { id: 'cash', label: '💵 현금' },
  { id: 'zero-pay', label: '💲 제로페이' },
  { id: 'installment', label: '➗ 할부' },
];

export function PaymentFormFieldV2({ control }: { control: Control<z.infer<typeof formSchema>> }): React.ReactElement {
  return (
    <FormField
      control={control}
      name="payment"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup className="grid grid-cols-4 gap-4" defaultValue={field.value} onValueChange={field.onChange}>
              {radioOptions.map(option => (
                <FormItem className="flex items-center justify-center" key={option.id}>
                  <FormControl>
                    <RadioGroupItem
                      checked={field.value === option.label}
                      className="sr-only peer"
                      id={option.id}
                      value={option.label}
                    />
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
