const Blog = ({ blog }) => (
  <div>
    <p>{blog.title} {blog.author}</p>
    <p>{blog.url}</p>
    <p>Likes: {blog.likes}</p>
    <p>{blog.user.name}</p>
  </div>  
)

export default Blog