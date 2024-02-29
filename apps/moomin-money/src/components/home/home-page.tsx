import { Button, Input } from "@repo/ui";
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
