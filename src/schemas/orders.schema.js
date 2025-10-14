import Joi from "joi";

// Esquema de producto para la orden
export const mainProductSchema = Joi.object({
  product_id: Joi.number().integer().min(1).required(),
  quantity: Joi.number().integer().min(1).max(500).required(),
});

// Esquema para crear o editar una orden
export const createOrderSchema = Joi.object({
  products: Joi.array()
    .items(mainProductSchema) // validar cada elemento y este debe cumplir con el esquema del producto
    .min(1)
    .required(),
});
