const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (req, res) => {
  Blog.find({})
    .then(blogs => {
      res.json(blogs);
    })
});

blogsRouter.get('/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then(blog => {
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).end();
      }
    })
})

blogsRouter.post('/', (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then(savedBlog => {
      res.status(201).json(savedBlog);
    })
});

module.exports = blogsRouter;
