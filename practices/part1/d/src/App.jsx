import { useState } from 'react'

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setLeft(left + 1);
    setAll(allClicks.concat('L'));
    setTotal(left + right);
  }

  const handleRightClick = () => {
    setRight(right + 1);
    setAll(allClicks.concat('R'));
    setTotal(left + right);
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
