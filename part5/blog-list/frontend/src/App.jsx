import { useState, useEffect, useRef } from 'react'
import { Link, Routes, Route, useMatch } from 'react-router-dom'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const blogFormRef = useRef()
  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch {
      setNotification('Wrong credentials')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setNotification('Successfully logged out')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author} is added`)
    blogFormRef.current.toggleVisibility()
  }

  const updateBlog = async (blogObject) => {
    const updatedBlog = await blogService.update(blogObject)
    const newBlogs = blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
    setBlogs(newBlogs)
  }

  const removeBlog = async (blogObject) => {
    await blogService.remove(blogObject)
    const newBlogs = blogs.filter(blog => blog.id !== blogObject.id)
    setBlogs(newBlogs)
  }

  return (
    <div>
      <nav className='navbar'>
        <Link to='/'>Blogs</Link>
        {user ? <button onClick={logout}>Logout</button> : <Link to='/login'>Login</Link>}
      </nav>

      {/* conditional rendering here instead of inside of component to avoid internal react error */}
      {notification && <Notification notification={notification} setNotification={setNotification} />}

      <Routes>
        <Route path='/' element={
          <BlogList 
            blogs={blogs} 
            setBlogs={setBlogs} 
            user={user} />
        } />

        <Route path='/blogs/:id' element={
          <Blog 
            blog={blog} 
            user={user}
            updateBlog={updateBlog} 
            removeBlog={removeBlog} 
          />
        } />

        <Route path='/login' element={
          <LoginForm login={login} />
        } />
      </Routes>

      {user && (
        <div>
          <Togglable buttonLabel='New blog' ref={blogFormRef}>
            <BlogForm addBlog={addBlog}/>
          </Togglable>
        </div>
      )}
    </div>
  )
}

export default App