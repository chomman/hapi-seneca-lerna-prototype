import Joi from 'joi';

const buildSchema = () => {
  const schema = {};

  schema.productValidate = {
    product: Joi.number().default(1)
  };

  schema.productsResponse = Joi.array().items(Joi.object().keys({
    name: Joi.string(),
    size: Joi.number()
  }));

  schema.productResponse = Joi.object().keys({
    name: Joi.string(),
    size: Joi.number()
  });

  schema.createProductValidation = {
    name: Joi.string().required(),
    size: Joi.number().min(0).max(100).required()
  };

  schema.updateProductValidation = {
    id: Joi.number().required(),
    name: Joi.string().required(),
    size: Joi.number().min(0).max(100).required()
  }

  schema.deleteResponse = Joi.object().keys({
    message: Joi.string()
  });

  schema.deleteProductValidation = {
    id: Joi.number().required()
  };

  return schema;
}

module.exports = buildSchema;
