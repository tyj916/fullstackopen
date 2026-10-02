const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');

const app = express();
app.use(express.json());

const Blog = require('./models/blog');

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { family: 4 })
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch(error => logger.error('Error connecting to MongoDB:', error.message));

app.get('/api/blogs', (req, res) => {
  Blog.find({})
    .then(blogs => {
      res.json(blogs);
    })
});

app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then(savedBlog => {
      res.status(201).json(savedBlog);
    });
});

module.exports = app;
