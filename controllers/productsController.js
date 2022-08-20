const productsService = require('../services/productsService');

const productsController = {
  async get(_req, res) {
    const data = await productsService.get();
    res.status(200).json(data);
  },
  async getId(req, res) {
    const { id } = await productsService.validateId(req.params);
    await productsService.checkIfExists(id);
    const data = await productsService.getId(id);
    res.status(200).json(data);
  },
  async create(req, res) {
    await productsService.validateBody(req.body);
    const insertId = await productsService.create(req.body);
    const data = await productsService.getId(insertId);
    res.status(201).json(data);
  },
  async update(req, res) {
    const [{ id }, changes] = await Promise.all([
      productsService.validateId(req.params),
      productsService.validateBody(req.body),
    ]);
    await productsService.checkIfExists(id);
    await productsService.update(id, changes);
    const result = await productsService.getId(id);
    res.status(200).json(result);
  },
  async delete(req, res) {
    const { id } = await productsService.validateId(req.params);
    await productsService.checkIfExists(id);
    await productsService.delete(id);
    res.sendStatus(204);
  },
};

module.exports = productsController;
