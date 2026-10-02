const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const blogsRouter = require('./controllers/blogs');

const app = express();
app.use(express.json());

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { family: 4 })
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch(error => logger.error('Error connecting to MongoDB:', error.message));

app.use('/api/blogs', blogsRouter);

module.exports = app;
