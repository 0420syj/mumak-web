import { RadioGroup, RadioGroupItem } from "@repo/ui/radio-group";
import { Label } from "@repo/ui/label";

const HomeBuyerRadioGroup = () => {
  return (
    <RadioGroup defaultValue="zero" className="grid grid-cols-2 gap-4">
      <div>
        <RadioGroupItem value="zero" id="zero" className="peer sr-only" />
        <Label
          htmlFor="zero"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          빵떡
        </Label>
      </div>
      <div>
        <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
        <Label
          htmlFor="cash"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          무민
        </Label>
      </div>
    </RadioGroup>
  );
};

export { HomeBuyerRadioGroup };
