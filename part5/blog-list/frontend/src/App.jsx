import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

const Body = ({ user, setUser, setMessage }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  if (!user) {
    return (
      <LoginForm setUser={setUser} setMessage={setMessage} />
    );
  }

  return (
    <div>
      <p>
        {user.name} logged in 
        <button onClick={() => {
          window.localStorage.removeItem('loggedBlogAppUser');
          setUser(null);
        }}>Logout</button>
      </p>

      <BlogForm blogs={blogs} setBlogs={setBlogs} />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

const App = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

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
      <h2>{user ? 'Blogs' : 'Log in to application'}</h2>
      {message && <Notification message={message} setMessage={setMessage} />}
      <Body user={user} setUser={setUser} setMessage={setMessage} />
    </div>
  )
}

export default App