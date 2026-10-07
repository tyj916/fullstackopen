const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { passwordHash: 0, blogs: 0 });

  res.json(blogs);
});

blogsRouter.get('/:id', async (req, res, next) => {
  const blog = await Blog
    .findById(req.params.id)
    .populate('user', { passwordHash: 0, blogs: 0 });

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.post('/', async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id);

  if (!user) {
    return res.status(400).json({ error: 'userId missing or not valid' });
  }

  const blog = new Blog({
    ...req.body,
    likes: req.body.likes || 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return res.status(400).json({ error: 'userId missing or not valid' });
  }

  const blog = await Blog.findById(req.params.id);

  if (blog.user.toString() === user._id.toString()) {
    await blog.deleteOne();
  } else {
    return res.status(401).json({ error: 'unauthorized delete' });
  }

  res.status(204).end();
});

blogsRouter.put('/:id', async (req, res, next) => {
  const { title, author, url, likes } = req.body;
  const blog = await Blog.findById(req.params.id);
  
  if (!blog) {
    return res.status(404).end();
  }

  blog.title = title;
  blog.author = author;
  blog.url = url;
  blog.likes = likes;

  const updatedBlog = await blog.save();
  res.json(updatedBlog);
});

module.exports = blogsRouter;
