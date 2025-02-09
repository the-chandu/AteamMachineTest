const Joi = require("joi");

const userSchema = Joi.object({
  firstName: Joi.string().trim().min(1).max(50).required(),
  lastName: Joi.string().trim().min(1).max(50).required(),
  profilePicture: Joi.string().uri().optional().allow(""), // Accepts valid URLs or empty string
  userType: Joi.string().valid("Admin", "Manager").required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$"))
    .message("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.")
    .required(),
});

const loginSchema = Joi.object({
  username: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$"))
    .message("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.")
    .required(),
});

module.exports = {
    userSchema,
    loginSchema
}