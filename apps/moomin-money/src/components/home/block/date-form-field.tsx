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
import { z } from "zod";
import { formSchema } from "../home-form";
import { Control } from "react-hook-form";

import { Button } from "@repo/ui/button";
import { cn } from "@repo/lib";
import { ko } from "date-fns/locale";

export const DateFormField = ({
  control,
}: {
  control: Control<z.infer<typeof formSchema>>;
}) => (
  <FormField
    control={control}
    name="date"
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <FormLabel>날짜</FormLabel>
        <FormControl>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP (EEEEEE)", { locale: ko })
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                locale={ko}
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < new Date("1900-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
