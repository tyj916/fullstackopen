import { useState } from 'react'

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  });
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setClicks({ left: clicks.left + 1, ...clicks });
    setAll(allClicks.concat('L'));
  }

  const handleRightClick = () => {
    setClicks({ right: clicks.right + 1, ...clicks });
    setAll(allClicks.concat('R'));
  }

  return (
    <div>
      {clicks.left}
      <button onClick={() => handleLeftClick}>left</button>
      <button onClick={() => handleRightClick}>right</button>
      {clicks.right}
      <p>{allClicks.join(' ')}</p>
    </div>
  )
}

export default App
