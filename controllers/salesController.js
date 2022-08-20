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
};

module.exports = salesController;
