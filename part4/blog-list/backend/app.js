const config = require('./utils/config');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { family: 4 });

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

module.exports = app;
