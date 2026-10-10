import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);
  const label = visible ? 'Close' : props.buttonLabel;

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <button onClick={toggleVisibility}>{label}</button>
      {visible && props.children}
    </div>
  )
};

export default Togglable;
