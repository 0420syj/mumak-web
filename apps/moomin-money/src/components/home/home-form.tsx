"use client";

import { Button } from "@repo/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";

import { format } from "date-fns";

import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/popover";

import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@repo/ui/calendar";

import { cn } from "@repo/lib";

import { Input } from "@repo/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { HomeBuyerRadioGroup } from "@moomin-money/components/home/home-buyer-radio-group";
import { HomeDatePicker } from "@moomin-money/components/home/home-date-picker";
import { HomePaymentRadioGroup } from "@moomin-money/components/home/home-payment-radio-group";

const formSchema = z.object({
  spendDate: z.date({
    required_error: "Spend date is required.",
  }),
  content: z.string().min(2, {
    message: "content must be at least 2 characters.",
  }),
});

export function HomeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spendDate: new Date(),
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="spendDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>날짜</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
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
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="햄버거 2개" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <HomeDatePicker />
      <HomeBuyerRadioGroup />
      <Button>Click me</Button>
      <Input type="text" placeholder="Type something" />
      <HomePaymentRadioGroup />
    </>
  );
}
