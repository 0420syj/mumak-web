import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@repo/ui/calendar";
import type { z } from "zod";
import type { Control } from "react-hook-form";
import { Button } from "@repo/ui/button";
import { cn } from "@repo/lib";
import { ko } from "date-fns/locale";
import type { formSchema } from "../home-form";

export function DateFormField({
  control,
}: {
  control: Control<z.infer<typeof formSchema>>;
}): React.ReactElement {
  return (
    <FormField
      control={control}
      name="date"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-base">날짜</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    className={cn(
                      "text-left font-normal",
                      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- field.value is not always defined
                      !field.value && "text-muted-foreground"
                    )}
                    variant="outline"
                  >
                    {
                      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- field.value is not always defined
                      field.value ? (
                        format(field.value, "PPP (EEEEEE)", { locale: ko })
                      ) : (
                        <span>Pick a date</span>
                      )
                    }
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  disabled={(date) => date < new Date("1900-01-01")}
                  initialFocus
                  locale={ko}
                  mode="single"
                  onSelect={field.onChange}
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
