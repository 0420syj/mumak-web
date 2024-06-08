import * as React from 'react';
import { Button } from '@repo/ui/button';
import './App.css';

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <Button onClick={() => setCount(count => count + 1)}>count is {count}</Button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </>
  );
}

export default App;
