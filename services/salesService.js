const salesModel = require('../models/salesModel');
const productsService = require('./productsService');
const runSchema = require('../middlewares/runSchema');
const schemas = require('../middlewares/schemas');
const SaleNotFound = require('../errors/SaleNotFound');

const salesService = {
  validateBodySchema: runSchema(schemas.bodySchema),
  async checkIfExists(salesReq) {
    await Promise.all(salesReq
      .map(({ productId }) => productsService.checkIfExists(productId)));
  },
  async validateBody(salesReq) {
    await Promise.all(
      salesReq.map((sale) => this.validateBodySchema(sale)),
    );
  },
  async checkSaleExists(id) {
    const result = await salesModel.checkSaleExists(id);
    if (!result) throw new SaleNotFound('Sale Not Found!');
  },
  async createSaleId() {
    const id = await salesModel.createSaleId();
    return id;
  },
  async create(id, sales) {
    await Promise.all(
      sales.map((item) => salesModel.create(id, item)),
    );
  },
  async get() {
    const result = await salesModel.get();
    return result;
  },
  async getId({ id }) {
    const result = await salesModel.getId(id);
    return result;
  },
  async delete(id) {
    await salesModel.delete(id);
  },
};

module.exports = salesService;
