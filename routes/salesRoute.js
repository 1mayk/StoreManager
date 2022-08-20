const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRoute = Router();

// salesRoute.get('/', salesController.get);
// salesRoute.get('/:id', salesController.getId);
salesRoute.post('/', salesController.create);

module.exports = salesRoute;
