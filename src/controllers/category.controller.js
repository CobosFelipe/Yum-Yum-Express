import { searchCategories, createCategory, editeCategory, eraseCategory } from "../models/category.model.js";

// Controlador para listar las categorias
export const listCategories = async (req, res) => {
  try {
    const categories = await searchCategories();
    if (categories) {
      res.success(categories, "Consulta exitosa!");
    } else {
      res.error({ message: "Error consultando categorias" }, 503);
    }
  } catch (error) {
    console.error("Error al consultar categorias:", error);
    res.error("Error interno del servidor", 500);
  }
};

// Controlador para crear una categoria
export const addCategory = async (req, res) => {
  try {
    const { name, img } = req.body;
    const result = await createCategory(name, img);
    if (result) {
      res.success(result, "Categoria creada!");
    } else {
      res.error({ message: "Error creando categoria" }, 503);
    }
  } catch (error) {
    console.error("Error al crear categoria:", error);
    res.error("Error interno del servidor", 500);
  }
};

// Controlador para crear una categoria
export const editCategory = async (req, res) => {
  try {
    const category = req.body;
    const result = await editeCategory(category);
    if (result) {
      res.success(result, "Categoria editada con exito!");
    } else {
      res.error({ message: "Error editando categoria" }, 503);
    }
  } catch (error) {
    console.error("Error al editar categorias:", error);
    res.error("Error interno del servidor", 500);
  }
};

// Controlador para crear una categoria
export const deleteCategory = async (req, res) => {
  try {
    const { category_id } = req.body;
    const result = await eraseCategory(category_id);
    if (result) {
      res.success({}, "Categoria eliminada con exito!");
    } else {
      res.error({ message: "Error al eliminar categoria, no existe" }, 503);
    }
  } catch (error) {
    console.error("Error al eliminar categoria:", error);
    res.error(`Error interno del servidor, ${error}`, 500);
  }
};
