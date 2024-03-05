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

export const NoteFormField = ({
  control,
}: {
  control: Control<z.infer<typeof formSchema>>;
}) => (
  <FormField
    control={control}
    name="note"
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <FormLabel className="text-base">비고</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
