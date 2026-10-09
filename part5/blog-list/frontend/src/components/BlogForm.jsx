import { useState } from "react";
import blogService from '../services/blogs';

const BlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const returnedBlog = await blogService.create({ title, author, url });
    setBlogs(blogs.concat(returnedBlog));
    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title</label>
          <input 
            id="title" 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} />
        </p>
        <p>
          <label htmlFor="author">Author</label>
          <input 
            id="author" 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} />
        </p>
        <p>
          <label htmlFor="url">Url</label>
          <input 
            id="url" 
            type="text" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} />
        </p>

        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
