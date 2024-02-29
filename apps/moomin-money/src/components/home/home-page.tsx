import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { ModeToggle } from "@moomin-money/components/mode-toggle";

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <Button>Click me</Button>
      <Input type="text" placeholder="Type something" />
      <ModeToggle />
    </div>
  );
};

export default HomePage;
