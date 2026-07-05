const Joi = require("joi");

const createArticleSchema = Joi.object({
  title: Joi.string().min(5).required(),
  content: Joi.string().min(20).required(),
});

const updateArticleSchema = Joi.object({
  title: Joi.string().min(5),
  content: Joi.string().min(20),
}).min(1);

module.exports = {
  createArticleSchema,
  updateArticleSchema,
};
