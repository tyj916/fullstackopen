import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState('');
  const blogFormRef = useRef();
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

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setNotification('Successfully logged out');
    setUser(null);
  };

  return (
    <div>
      <h2>{title}</h2>
      {/* conditional rendering here instead of inside of component to avoid internal react error */}
      {notification && <Notification notification={notification} setNotification={setNotification} />}
      {!user && <LoginForm setUser={setUser} setNotification={setNotification} />}
      {user && (
        <div>
          <p>{user.name} logged in <button onClick={logout}>Logout</button></p>

          <Togglable buttonLabel='New blog' ref={blogFormRef}>
            <BlogForm 
              blogs={blogs} 
              setBlogs={setBlogs} 
              setNotification={setNotification} 
              ref={blogFormRef}
            />
          </Togglable>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App