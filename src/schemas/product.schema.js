import Joi from "joi";

// Esquema para crear o editar un producto
export const mainProductSchema = Joi.object({
  product_id: Joi.number().integer().min(1),
  fk_category_id: Joi.number().integer().max(50),
  name: Joi.string().min(5).max(50).required(),
  price: Joi.number().integer().min(100).max(1000000).required(),
  description: Joi.string().max(255).required(),
  img: Joi.string().max(255).required(),
  available: Joi.boolean().required(),
  quantity: Joi.number().integer().min(1).max(500).required(),
});

// Esquema para consultar productos por categoria
export const searchProductByCategorySchema = Joi.object({
  category_id: Joi.number().integer().max(50),
  offset: Joi.number().integer().min(0),
});

// Esquema para consultar todos los productos
export const searchAllProductSchema = Joi.object({
  limit: Joi.number().integer().max(24),
  offset: Joi.number().integer().min(0),
});
