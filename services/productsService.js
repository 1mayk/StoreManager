const productsModel = require('../models/productsModel');
const runSchema = require('../middlewares/runSchema');
const schemas = require('../middlewares/schemas');
const ProductNotFound = require('../errors/ProductNotFound');

const productsService = {
  validateId: runSchema(schemas.idSchema),
  validateBody: runSchema(schemas.nameSchema),
  async checkIfExists(id) {
    const result = await productsModel.checkIfExists(id);
    if (!result) throw new ProductNotFound('Product not found');
  },
  async get() {
    const result = await productsModel.get();
    return result;
  },
  async getId(id) {
    const result = await productsModel.getId(id);
    return result;
  },
  async create({ name }) {
    const result = await productsModel.create(name);
    return result;
  },
  async update(id, changes) {
    await productsModel.update(id, changes);
  },
};

module.exports = productsService;
