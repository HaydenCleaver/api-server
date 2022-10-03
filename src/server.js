'use strict';

const express = require('express');

const animalRouter = require('./routes/animals');
const instrumentRouter = require('./routes/instruments');

const logger = require('./middleware/logger');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(logger);
app.use(instrumentRouter);
app.use(animalRouter);

app.get('/', (req, res, next) => {
  res.status(200).send('Home Path');
});

app.get('/bad', (req, res, next) => {
  next('bad route');
});

app.use('*', notFound);

app.use(errorHandler);

function start(){
  app.listen(PORT, () => console.log(`listening on port: ${PORT} `));
}

module.exports = { app, start };
