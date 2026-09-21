import { useState } from 'react'

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  });

  const handleLeftClick = () => setClicks({ left: clicks.left + 1, ...clicks });
  const handleRightClick = () => setClicks({ right: clicks.right + 1, ...clicks });

  return (
    <div>
      {clicks.left}
      <button onClick={() => handleLeftClick}>left</button>
      <button onClick={() => handleRightClick}>right</button>
      {clicks.right}
    </div>
  )
}

export default App
