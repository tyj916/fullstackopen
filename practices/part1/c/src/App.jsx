import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const setToZero = () => setCounter(0);

  return (
    <div>
      <div>{counter}</div>
      <button onClick={increaseByOne}>Plus</button>
      <button onClick={setToZero}>Reset</button>
    </div>
  )
}

export default App
