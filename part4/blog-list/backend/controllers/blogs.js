const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id)
    .then(blog => {
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
})

blogsRouter.post('/', (req, res, next) => {
  const blog = new Blog(req.body);

  blog.save()
    .then(savedBlog => {
      res.status(201).json(savedBlog);
    })
    .catch(error => next(error));
});

blogsRouter.delete('/:id', (req, res, next) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(error => next(error));
})

blogsRouter.put('/:id', (req, res, next) => {
  const { title, author, url, likes } = req.body;

  Blog.findById(req.params.id)
    .then(blog => {
      if (!blog) {
        return res.status(404).end();
      }

      blog.title = title;
      blog.author = author;
      blog.url = url;
      blog.likes = likes;

      return blog.save().then(updatedBlog => {
        res.json(updatedBlog);
      });
    })
    .catch(error => next(error));
});

module.exports = blogsRouter;
