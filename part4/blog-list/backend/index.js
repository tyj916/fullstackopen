const config = require('./utils/config');
const express = require('express');
const logger = require('./utils/logger');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
})

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});