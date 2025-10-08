import Joi from "joi";

// Esquema para creación de usuario
export const createBannerSchema = Joi.object({
  link: Joi.string().min(3).max(255).required(),
});
