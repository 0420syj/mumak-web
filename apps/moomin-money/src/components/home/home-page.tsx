import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { HomeBuyerRadioGroup } from "@moomin-money/components/home/home-buyer-radio-group";
import { HomeDatePicker } from "@moomin-money/components/home/home-date-picker";
import { HomePaymentRadioGroup } from "@moomin-money/components/home/home-payment-radio-group";

const HomePage = () => {
  return (
    <>
      <HomeDatePicker />
      <HomeBuyerRadioGroup />
      <Button>Click me</Button>
      <Input type="text" placeholder="Type something" />
      <HomePaymentRadioGroup />
    </>
  );
};

export default HomePage;
