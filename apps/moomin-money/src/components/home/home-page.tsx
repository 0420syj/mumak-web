import { Button } from "@repo/shared-ui";

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <div className="flex flex-row space-x-4">
        <Button label="Click me" size="large" primary />
        <Button label="Click me" size="medium" primary />
        <Button label="Click me" size="small" primary />
      </div>
      <div className="flex flex-row space-x-4">
        <Button label="Click me" size="large" />
        <Button label="Click me" size="medium" />
        <Button label="Click me" size="small" />
      </div>
    </div>
  );
};

export default HomePage;
