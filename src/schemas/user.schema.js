import Joi from "joi";

// Esquema para creación de usuario
export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  email: Joi.string().email().max(50).required(),
  telephone: Joi.string()
    .pattern(/^[36]\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "El número de teléfono debe tener 10 dígitos y empezar con 3 o 6."
    }),
  password: Joi.string().pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,20}$")).required(),
});

// Esquema para validar usuario
export const loginUserSchema = Joi.object({
  email: Joi.string().email().max(50).required(),
  password: Joi.string().min(8).max(20).required(),
});
