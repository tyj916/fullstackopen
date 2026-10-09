import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  if (!user) {
    return (
      <LoginForm setUser={setUser} />
    );
  }

  return (
    <div>
      <h2>blogs</h2>
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

export default App