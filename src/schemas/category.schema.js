import Joi from "joi";

// Esquema para crear una categoria
export const addCategorySchema = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  img: Joi.string().required()
});

// Esquema para editar una categoria
export const editCategorySchema = Joi.object({
  category_id: Joi.number().integer().min(1).required(),
  name: Joi.string().min(5).max(50).required(),
  img: Joi.string().required()
});

// Esquema para eliminar una categoria
export const deleteCategorySchema = Joi.object({
  category_id: Joi.number().integer().min(1).required(),
});