const Joi = require('@hapi/joi');

const timesheerRowSchema = Joi.object({
  projectId: Joi.number().required(),
  taskId: Joi.number().required(),
  monday: Joi.number().min(0).max(24).required(),
  tuesday: Joi.number().min(0).max(24).required(),
  wednesday: Joi.number().min(0).max(24).required(),
  thursday: Joi.number().min(0).max(24).required(),
  friday: Joi.number().min(0).max(24).required(),
  saturday: Joi.number().min(0).max(24).required(),
  sunday: Joi.number().min(0).max(24).required(),
}).unknown(true);

module.exports = timesheerRowSchema;
