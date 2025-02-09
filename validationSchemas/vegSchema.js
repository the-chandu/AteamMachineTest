const Joi = require("joi");

const vegSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required() 
  .messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 2 characters.",
    "string.max": "Name must be at most 50 characters.",
    "any.required": "Name is required."
  }),

  color: Joi.string().trim().required()
  .pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
  .messages({
    "string.pattern.base": "Color must be a valid hex color (e.g., #ff0000 or #f00).",
    "any.required": "Color is required."
  }),

  price: Joi.number().positive()
  .custom((value, helpers) => {
    if (!/^\d+(\.\d{1,2})?$/.test(value.toString())) {
      return helpers.error("number.invalidPrecision");
    }
    return value;
  })
  .required()
  .messages({
    "number.base": "Price must be a valid number.",
    "number.positive": "Price must be greater than 0.",
    "any.required": "Price is required.",
    "number.invalidPrecision": "Price can have up to 2 decimal places only."
  })
});

module.exports = {
    vegSchema
}