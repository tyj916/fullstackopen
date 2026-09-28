const Notification = ({message}) => {
  if (!message) {
    return null;
  }

  const className = message.type === 'error' ? 'notification error' : 'notification';

  return (
    <div className={className}>
      <p>{message.content}</p>
    </div>
  )
}

export default Notification;
