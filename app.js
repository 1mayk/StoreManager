const express = require('express');
require('express-async-errors');

const errorHandler = require('./middlewares/errorHandler');
const productsRoute = require('./routes/productsRoute');
const salesRoute = require('./routes/salesRoute');

const app = express();
app.use(express.json());

app.use('/products', productsRoute);
app.use('/sales', salesRoute);

app.use(errorHandler);

app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;
