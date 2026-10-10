import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs';
import loginService from './services/login';
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

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch {
      setNotification('Wrong credentials');
    }
  };

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setNotification('Successfully logged out');
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog));
    setNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author} is added`);
    blogFormRef.current.toggleVisibility();
  }

  const updateBlog = async (blogObject) => {
    const updatedBlog = await blogService.update(blogObject);
    console.log(updatedBlog);
  }

  return (
    <div>
      <h2>{title}</h2>
      {/* conditional rendering here instead of inside of component to avoid internal react error */}
      {notification && <Notification notification={notification} setNotification={setNotification} />}
      {!user && <LoginForm login={login} />}
      {user && (
        <div>
          <p>{user.name} logged in <button onClick={logout}>Logout</button></p>

          <Togglable buttonLabel='New blog' ref={blogFormRef}>
            <BlogForm addBlog={addBlog}/>
          </Togglable>

          <div className='blog-list'>{blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
          )}</div>
        </div>
      )}
    </div>
  )
}

export default App