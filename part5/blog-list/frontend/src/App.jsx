import { useState, useEffect, useRef } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import blogService from './services/blogs'
import loginService from './services/login'
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

  return (
    <div>
      <nav className='navbar'>
        <Link to='/blogs'>Blogs</Link>
        <Link to='/login'>Login</Link>
      </nav>

      {/* conditional rendering here instead of inside of component to avoid internal react error */}
      {notification && <Notification notification={notification} setNotification={setNotification} />}

      <Routes>
        <Route path='/blogs' element={
          <BlogList blogs={blogs} user={user} />
        } />
        <Route path='/login' element={
          <LoginForm login={login} />
        } />
      </Routes>

      {user && (
        <div>
          <p>{user.name} logged in <button onClick={logout}>Logout</button></p>

          <Togglable buttonLabel='New blog' ref={blogFormRef}>
            <BlogForm addBlog={addBlog}/>
          </Togglable>
        </div>
      )}
    </div>
  )
}

export default App