const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
  username: Joi.string()
    .regex(/^(?!.*\.(?:com|net))[A-Z0-9.]{5,}$/i)
    .min(5)
    .required('Username is required.'),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().min(5).required('Username is required.'),
  password: Joi.string().min(6).required(),
});

module.exports = { registerSchema, loginSchema };
