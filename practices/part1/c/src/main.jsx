import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

let counter = 1;

const root = createRoot(document.getElementById('root'));

const refresh = () => {
  root.render(
    <StrictMode>
      <App counter={counter} />
    </StrictMode>,
  )
}

// this is written for the sake of learning purpose only
// this is not a recommended method to re-render components
setInterval(() => {
  refresh();
  counter += 1;
}, 1000);
