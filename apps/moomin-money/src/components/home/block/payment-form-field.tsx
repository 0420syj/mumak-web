import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form';
import { RadioGroup, RadioGroupItem } from '@repo/ui/radio-group';
import type { Control } from 'react-hook-form';
import type { z } from 'zod';
import type { formSchema } from '../home-form';

interface RadioOption {
  id: string;
  icon: string;
  label: string;
  value: string;
}

const radioOptions: RadioOption[] = [
  { id: 'credit-card', icon: '💳', label: '신용카드', value: '💳 신용카드' },
  { id: 'cash', icon: '💵', label: '현금', value: '💵 현금' },
  { id: 'zero-pay', icon: '💲', label: '제로페이', value: '💲 제로페이' },
  { id: 'installment', icon: '➗', label: '할부', value: '➗ 할부' },
];

export function PaymentFormField({ control }: { control: Control<z.infer<typeof formSchema>> }): React.ReactElement {
  return (
    <FormField
      control={control}
      name="payment"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">결제수단</FormLabel>
          <FormControl>
            <RadioGroup
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              defaultValue={field.value}
              onValueChange={field.onChange}
            >
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
                    className="sm:hidden flex flex-col w-full items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    htmlFor={option.id}
                  >
                    {field.value === option.label ? option.label : option.icon}
                  </FormLabel>
                  <FormLabel
                    className="hidden sm:flex flex-col w-full items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    htmlFor={option.id}
                  >
                    {option.value}
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
