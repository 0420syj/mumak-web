import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { RadioGroup, RadioGroupItem } from "@repo/ui/radio-group";
import type { z } from "zod";
import type { Control } from "react-hook-form";
import type { formSchema } from "../home-form";

export function NameFormField({
  control,
}: {
  control: Control<z.infer<typeof formSchema>>;
}): React.ReactElement {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormControl>
            <RadioGroup
              className="grid grid-cols-2 gap-4"
              defaultValue={field.value}
              onValueChange={field.onChange}
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem
                    className="peer sr-only"
                    id="wanny"
                    value="wanny"
                  />
                </FormControl>
                <FormLabel
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  htmlFor="wanny"
                >
                  🐶 빵떡
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem
                    className="peer sr-only"
                    id="moomin"
                    value="moomin"
                  />
                </FormControl>
                <FormLabel
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  htmlFor="moomin"
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
}
