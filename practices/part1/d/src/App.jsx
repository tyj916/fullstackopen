import { useState } from 'react'

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
    setAll(allClicks.concat('L'));
    setTotal(updatedLeft + right);
  }

  const handleRightClick = () => {
    const updatedRight = right + 1;
    setRight(updatedRight);
    setAll(allClicks.concat('R'));
    setTotal(updatedRight + left);
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(' ')}</p>
      <p>Total: {total}</p>
    </div>
  )
}

export default App
