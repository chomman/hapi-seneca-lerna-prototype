import Joi from 'joi';

const buildSchema = () => {
  const schema = {};

  schema.calculateValidate = {
    op: Joi.string().default('add').allow('add', 'subtract', 'divide', 'multiply'),
    x: Joi.number().required(),
    y: Joi.number().required()
  };

  schema.calculateResponse = Joi.number().required();

  return schema;
};

module.exports = buildSchema;
