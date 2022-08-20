const productsService = require('../services/productsService');
const salesService = require('../services/salesService');

const salesController = {
  async create(req, res) {
    const salesReq = req.body;
    await salesService.validateBody(salesReq);
    await salesService.checkIfExists(salesReq);
    const insertId = await salesService.createSaleId();
    await salesService.create(insertId, salesReq);
    res.status(201).json({ id: insertId, itemsSold: salesReq });
  },
  async get(req, res) {
    const data = await salesService.get();
    res.status(200).json(data);
  },
  async getId(req, res) {
    const data = await salesService.getId(req.params);
    res.status(200).json(data);
  },
  async delete(req, res) {
    const { id } = await productsService.validateId(req.params);
    await salesService.checkSaleExists(id);
    await salesService.delete(id);
    res.sendStatus(204);
  },
};

module.exports = salesController;
