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
  { id: 'house', label: '🏠 주거' },
  { id: 'life', label: '🧺 생활' },
  { id: 'groceries', label: '🍎 식재료' },
  { id: 'delivery', label: '🍔 배달' },
  { id: 'dining-out', label: '🍽️ 외식' },
  { id: 'wine-alcohol', label: '🍷 와인/술' },
  { id: 'convenience-store', label: '🏪 편의점' },
  { id: 'culture-leisure', label: '🎠 문화/여가' },
  { id: 'cat', label: '😺 냐옹' },
  { id: 'transportation', label: '🚗 교통' },
  { id: 'travel', label: '✈️ 여행' },
  { id: 'clothes-beauty', label: '👔 옷/미용' },
  { id: 'health', label: '🏥 건강' },
  { id: 'self-development', label: '📚 자기개발' },
  { id: 'gift', label: '❤️ 선물' },
  { id: 'etc', label: '🪕 기타' },
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
