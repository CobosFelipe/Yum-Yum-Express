import Joi from "joi";

// Esquema para creación de banner
export const createBannerSchema = Joi.object({
  link: Joi.string().min(3).max(255).required(),
});

// Esquema para edición de banner
export const editBannerSchema = Joi.object({
  banner_id: Joi.number().integer().min(1).required(),
  link: Joi.string().min(3).max(255).required(),
});
