import * as React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '@repo/ui/calendar';
import type { z } from 'zod';
import type { Control } from 'react-hook-form';
import { Button } from '@repo/ui/button';
import { cn } from '@repo/lib';
import { ko } from 'date-fns/locale';
import type { formSchema } from '../home-form';

export function DateFormField({ control }: { control: Control<z.infer<typeof formSchema>> }): React.ReactElement {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  return (
    <FormField
      control={control}
      name="date"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">날짜</FormLabel>
          <FormControl>
            <Popover onOpenChange={setIsPopoverOpen} open={isPopoverOpen}>
              <PopoverTrigger asChild>
                <FormControl className="flex w-full">
                  <Button
                    className={cn('text-left font-normal', !field.value && 'text-muted-foreground')}
                    variant="outline"
                  >
                    {field.value ? format(field.value, 'MM/dd (EEEEEE)', { locale: ko }) : <span>Pick a date</span>}
                    <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  disabled={date => date < new Date('1900-01-01')}
                  initialFocus
                  locale={ko}
                  mode="single"
                  onSelect={event => {
                    field.onChange(event);
                    setIsPopoverOpen(false);
                  }}
                  selected={field.value}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
