import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const label = visible ? 'hide' : 'view';

  const toggleDetails = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <p>{blog.title} {blog.author} <button onClick={toggleDetails}>{label}</button></p> 
      <p>{blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <p>{blog.user.name}</p>
    </div>  
  )
};

export default Blog;