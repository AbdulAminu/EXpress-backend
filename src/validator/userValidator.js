import Joi from "joi";

export const userValidaton = Joi.object({
  name: Joi.string().min(4).max(20).required(),

  email: Joi.string().email().required(),

  password: Joi.string()
    .max(15)
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)
    .messages({
      "string.pattern.base":
        "Password must contain uppercase, lowercase, number and special character",
      "string.empty": "Password is required",
      "any.required": "Password is required",
      "string.max": "Password must not exceed 15 characters",
    }),
});

//This is the validator for logging in
export const userValForLogin = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string()
    .max(15)
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)
    .messages({
      "string.pattern.base":
        "Password must contain uppercase, lowercase, number and special character",
      "string.empty": "Password is required",
      "any.required": "Password is required",
      "string.max": "Password must not exceed 15 characters",
    }),
});
