import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState('');
  const title = user ? 'Blogs' : 'Log in to application';

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  return (
    <div>
      <h2>{title}</h2>
      <Notification notification={notification} setNotification={setNotification} />
      {!user && <LoginForm setUser={setUser} setNotification={setNotification} />}
      {user && (
        <div>
          <p>
            {user.name} logged in 
            <button onClick={() => {
              window.localStorage.removeItem('loggedBlogAppUser');
              setNotification('Successfully logged out');
              setUser(null);
            }}>Logout</button>
          </p>

          <BlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} />

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App