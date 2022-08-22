const express = require('express');
require('express-async-errors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerConfig = require('./docs/swagger.config');
const errorHandler = require('./middlewares/errorHandler');
const productsRoute = require('./routes/productsRoute');
const salesRoute = require('./routes/salesRoute');

const swaggerDoc = swaggerJSDoc(swaggerConfig);

const app = express();
app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/products', productsRoute);
app.use('/sales', salesRoute);

app.use(errorHandler);

module.exports = app;
