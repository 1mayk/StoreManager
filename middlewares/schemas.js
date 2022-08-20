const Joi = require('joi');

const schemas = {
  idSchema: Joi.object({
    id: Joi.number().required().integer().positive(),
  }),
  nameSchema: Joi.object({
    name: Joi.string().required().min(5),
  }),
  bodySchema: Joi.object({
    productId: Joi.number().required().integer().positive(),
    quantity: Joi.number().required().integer().min(1),
  }),
};

module.exports = schemas;
