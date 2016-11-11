import Joi from 'joi';

const buildSchema = () => {
  const schema = {};

  schema.helloValidate = {
    n: Joi.number().default(1)
  };

  schema.helloResponse = Joi.array().items(Joi.string());

  return schema;
}

module.exports = buildSchema;
