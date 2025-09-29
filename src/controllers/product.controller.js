import { createProduct, listAllProducts, modifyProduct, productsByCategory } from "../models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const product = req.body;
    const result = await createProduct(product);
    if (result) {
      res.success({}, "Producto creado con éxito");
    } else {
      res.error("Error al crear producto", 404);
    }
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.error("Error interno del servidor", 500);
  }
};

export const editProduct = async (req, res) => {
  try {
    const product = req.body;
    const result = await modifyProduct(product);
    if (result) {
      res.success(result, "Producto editado con éxito");
    } else {
      res.error("Producto no encontrado o el ID es incorrecto", 404);
    }
  } catch (error) {
    console.error("Error al editar producto:", error);
    res.error("Error interno del servidor", 500);
  }
};

export const searchProductsByCategory = async (req, res) => {
  try {
    const { category_id, offset } = req.params;
    const result = await productsByCategory(category_id, offset);
    if (result) {
      res.success(result, "Productos por categoria listados con éxito");
    } else {
      res.error("Error al listar productos por categoria", 404);
    }
  } catch (error) {
    console.error("Error al listar productos por categoria:", error);
    res.error("Error interno del servidor", 500);
  }
};

export const searchAllProducts = async (req, res) => {
  try {
    const { limit, offset } = req.params;
    const result = await listAllProducts(limit, offset);
    if (result) {
      res.success(result, "Productos listados con éxito");
    } else {
      res.error("Error al listar productos", 404);
    }
  } catch (error) {
    console.error("Error al listar productos:", error);
    res.error("Error interno del servidor", 500);
  }
};
