const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = Router();

productsRoute.get('/', productsController.get);
productsRoute.get('/:id', productsController.getId);
productsRoute.post('/', productsController.create);
productsRoute.put('/:id', productsController.update);
productsRoute.delete('/:id', productsController.delete);

module.exports = productsRoute;
