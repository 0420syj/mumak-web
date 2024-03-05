import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { z } from "zod";
import { formSchema } from "../home-form";
import { Control } from "react-hook-form";
import { Input } from "@repo/ui/input";

export const ContentFormField = ({
  control,
}: {
  control: Control<z.infer<typeof formSchema>>;
}) => (
  <FormField
    control={control}
    name="content"
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <FormLabel className="text-base">내용</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
