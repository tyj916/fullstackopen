const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const blogsRouter = require('./controllers/blogs');

const app = express();
app.use(express.json());

mongoose.connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch(error => logger.error('Error connecting to MongoDB:', error.message));

app.use('/api/blogs', blogsRouter);

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint);

module.exports = app;
