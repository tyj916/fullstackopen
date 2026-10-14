import Blog from "./Blog"
import blogService from '../services/blogs'

const BlogList = ({ blogs, setBlogs, user }) => {
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
      <h2>Blogs</h2>
      <div className="blog-list">
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog 
            key={blog.id} 
            blog={blog} 
            user={user}
            updateBlog={updateBlog} 
            removeBlog={removeBlog} 
          />
        )}
      </div>
    </div>
  )
}

export default BlogList
