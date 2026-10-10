import { useState } from "react";

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false);
  const label = visible ? 'hide' : 'view';

  const toggleDetails = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    };

    updateBlog(newBlog);
  };

  const handleRemove = () => {
    removeBlog(blog);
  }

  return (
    <div className="blog">
      <p>{blog.title} {blog.author} <button onClick={toggleDetails}>{label}</button></p> 
      {visible && <>
        <p>{blog.url}</p>
        <p>Likes: {blog.likes} <button onClick={handleLike}>Like</button></p>
        <p>{blog.user.name}</p>
        <button onClick={handleRemove}>Remove</button>
      </>}
    </div>  
  );
};

export default Blog;