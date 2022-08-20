const salesModel = require('../models/salesModel');
const productsService = require('./productsService');
const runSchema = require('../middlewares/runSchema');
const schemas = require('../middlewares/schemas');

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
  async createSaleId() {
    const id = await salesModel.createSaleId();
    return id;
  },
  async create(id, sales) {
    await Promise.all(
      sales.map((item) => salesModel.create(id, item)),
    );
  },
};

module.exports = salesService;
