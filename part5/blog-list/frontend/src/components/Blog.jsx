import { useState } from "react";

const BlogDetails = ({ blog, updateBlog }) => {
  const handleLike = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    };

    updateBlog(newBlog);
  };

  return (
    <>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes} <button onClick={handleLike}>Like</button></p>
      <p>{blog.user.name}</p>
    </>
  );
};

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false);
  const label = visible ? 'hide' : 'view';

  const toggleDetails = () => {
    setVisible(!visible);
  };

  return (
    <div className="blog">
      <p>{blog.title} {blog.author} <button onClick={toggleDetails}>{label}</button></p> 
      {visible && <BlogDetails blog={blog} updateBlog={updateBlog} />}
    </div>  
  );
};

export default Blog;