import { useEffect } from "react";

const Notification = ({ notification, setNotification }) => {
  if (!notification) return;

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification('');
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div className='notification'>
      <p>{notification}</p>
    </div>
  );
};

export default Notification;
