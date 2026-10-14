import { useNavigate } from "react-router-dom"

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  if (!blog) return null

  const navigate = useNavigate()

  const handleLike = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    updateBlog(newBlog)
  }

  const handleRemove = () => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (confirm) {
      removeBlog(blog)
      navigate('/')
    }
  }

  return (
    <div>
      <h2>{blog.author}: {blog.title}</h2>
      <p>{blog.url}</p>
      <p>
        Likes: {blog.likes} {' '}
        {user && <button onClick={handleLike}>Like</button>}
      </p>
      <p>{blog.user.name}</p>
      {user && blog.user.id === user.id && <button onClick={handleRemove}>Remove</button>}
    </div>
  )
}

export default Blog