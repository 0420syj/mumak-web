import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { HomeBuyerRadioGroup } from "@moomin-money/components/home/home-buyer-radio-group";
import { HomeDatePicker } from "@moomin-money/components/home/home-date-picker";
import { HomePaymentRadioGroup } from "@moomin-money/components/home/home-payment-radio-group";
import MoneySpentBoard from "@moomin-money/components/money-spend-board";

const HomePage = () => {
  return (
    <>
      <MoneySpentBoard />
      <HomeDatePicker />
      <HomeBuyerRadioGroup />
      <Button>Click me</Button>
      <Input type="text" placeholder="Type something" />
      <HomePaymentRadioGroup />
    </>
  );
};

export default HomePage;
