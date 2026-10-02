const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');

const app = express();

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { family: 4 })
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch(error => logger.error('Error connecting to MongoDB:', error.message));

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

module.exports = app;
