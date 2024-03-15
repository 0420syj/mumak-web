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
  { id: 'house', icon: '🏠', label: '주거', value: '🏠 주거' },
  { id: 'life', icon: '🧺', label: '생활', value: '🧺 생활' },
  { id: 'groceries', icon: '🍎', label: '식재료', value: '🍎 식재료' },
  { id: 'delivery', icon: '🍔', label: '배달', value: '🍔 배달' },
  { id: 'dining-out', icon: '🍽️', label: '외식', value: '🍽️ 외식' },
  { id: 'wine-alcohol', icon: '🍷', label: '와인/술', value: '🍷 와인/술' },
  { id: 'convenience-store', icon: '🏪', label: '편의점', value: '🏪 편의점' },
  { id: 'culture-leisure', icon: '🎠', label: '문화/여가', value: '🎠 문화/여가' },
  { id: 'cat', icon: '😺', label: '냐옹', value: '😺 냐옹' },
  { id: 'transportation', icon: '🚗', label: '교통', value: '🚗 교통' },
  { id: 'travel', icon: '✈️', label: '여행', value: '✈️ 여행' },
  { id: 'clothes-beauty', icon: '👔', label: '옷/미용', value: '👔 옷/미용' },
  { id: 'health', icon: '🏥', label: '건강', value: '🏥 건강' },
  { id: 'self-development', icon: '📚', label: '자기개발', value: '📚 자기개발' },
  { id: 'gift', icon: '❤️', label: '선물', value: '❤️ 선물' },
  { id: 'etc', icon: '🪕', label: '기타', value: '🪕 기타' },
];

export function CategoryFormField({ control }: { control: Control<z.infer<typeof formSchema>> }): React.ReactElement {
  return (
    <FormField
      control={control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">카테고리</FormLabel>
          <FormControl>
            <RadioGroup
              className="grid grid-cols-3 sm:grid-cols-4 gap-4"
              defaultValue={field.value}
              onValueChange={field.onChange}
            >
              {radioOptions.map(option => (
                <FormItem className="flex items-center justify-center" key={option.id}>
                  <FormControl>
                    <RadioGroupItem
                      checked={field.value === option.value}
                      className="sr-only peer"
                      id={option.id}
                      value={option.value}
                    />
                  </FormControl>
                  <FormLabel
                    className="sm:hidden flex flex-col w-full items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    htmlFor={option.id}
                  >
                    {field.value === option.value ? option.label : option.icon}
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
