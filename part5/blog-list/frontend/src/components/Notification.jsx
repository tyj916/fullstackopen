import { useEffect } from 'react'

const Notification = ({ notification, setNotification }) => {
  useEffect(() => {
    if (!notification) return

    const timer = setTimeout(() => {
      setNotification('')
    }, 5000)

    return () => clearTimeout(timer)
  }, [notification, setNotification])

  return (
    <div className='notification'>
      <p>{notification}</p>
    </div>
  )
}

export default Notification
