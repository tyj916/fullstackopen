import { useState } from "react";

const BlogDetails = ({ blog }) => {
  return (
    <>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <p>{blog.user.name}</p>
    </>
  )
};

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const label = visible ? 'hide' : 'view';

  const toggleDetails = () => {
    setVisible(!visible);
  };

  return (
    <div className="blog">
      <p>{blog.title} {blog.author} <button onClick={toggleDetails}>{label}</button></p> 
      {visible && <BlogDetails blog={blog} />}
    </div>  
  )
};

export default Blog;