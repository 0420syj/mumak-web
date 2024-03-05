import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { RadioGroup, RadioGroupItem } from "@repo/ui/radio-group";
import { z } from "zod";
import { formSchema } from "../home-form";
import { Control } from "react-hook-form";

export const NameFormField = ({
  control,
}: {
  control: Control<z.infer<typeof formSchema>>;
}) => (
  <FormField
    control={control}
    name="name"
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="grid grid-cols-2 gap-4"
          >
            <FormItem className="flex items-center space-x-3 space-y-0">
              <FormControl>
                <RadioGroupItem
                  value="wanny"
                  id="wanny"
                  className="peer sr-only"
                />
              </FormControl>
              <FormLabel
                htmlFor="wanny"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                🐶 빵떡
              </FormLabel>
            </FormItem>
            <FormItem className="flex items-center space-x-3 space-y-0">
              <FormControl>
                <RadioGroupItem
                  value="moomin"
                  id="moomin"
                  className="peer sr-only"
                />
              </FormControl>
              <FormLabel
                htmlFor="moomin"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                🐻‍❄️ 무민
              </FormLabel>
            </FormItem>
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
