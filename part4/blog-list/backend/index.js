require('dotenv').config();
const express = require('express');
const logger = require('./utils/logger');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});