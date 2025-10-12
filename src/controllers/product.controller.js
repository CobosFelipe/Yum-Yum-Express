import { createProduct, listAllProducts, modifyProduct, productsByCategory } from "../models/product.model.js";
import { capitalizeFirstLetter } from "../utilities/string.utilities.js";

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
    // Datos de los parametros
    const { name } = req.params;
    const offset = parseInt(req.params.offset) || 0;

    //Formateo del nombre de la categoria
    const capitalizeName = capitalizeFirstLetter(name);

    const { products, totalItems, pageSize } = await productsByCategory(capitalizeName, offset);

    // Calcular la metadata de paginación
    const currentPage = Math.floor(offset / pageSize) + 1;
    const totalPages = Math.ceil(totalItems / pageSize);

    const hasNextPage = offset + pageSize < totalItems;
    const hasPrevPage = offset > 0;

    // Estructurar la respuesta
    const paginationMeta = {
      totalItems: totalItems,
      pageSize: pageSize,
      currentPage: currentPage,
      totalPages: totalPages,
      hasNextPage: hasNextPage,
      hasPrevPage: hasPrevPage,
      nextOffset: hasNextPage ? offset + pageSize : null,
      prevOffset: hasPrevPage ? offset - pageSize : null,
    };

    if (products.length > 0 || totalItems > 0) {
      res.success(
        {
          products: products,
          pagination: paginationMeta,
        },
        "Productos por categoría listados con éxito"
      );
    } else {
      res.error(`No se encontraron productos para la categoría: ${capitalizeName}`, 404);
    }
  } catch (error) {
    console.error("Error al listar productos por categoria:", error);
    res.error("Error interno del servidor", 500);
  }
};

export const searchAllProducts = async (req, res) => {
  try {
    // Parametros de entrada
    const limit  = parseInt(req.params.limit) || 12;
    const offset = parseInt(req.params.offset) || 0;

    const { products, totalItems, pageSize } = await listAllProducts(limit, offset);

    // Calcular la metadata de paginación
    const currentPage = Math.floor(offset / pageSize) + 1;
    const totalPages = Math.ceil(totalItems / pageSize);

    const hasNextPage = offset + pageSize < totalItems;
    const hasPrevPage = offset > 0;

    // Estructurar la respuesta
    const paginationMeta = {
      totalItems: totalItems,
      pageSize: pageSize,
      currentPage: currentPage,
      totalPages: totalPages,
      hasNextPage: hasNextPage,
      hasPrevPage: hasPrevPage,
      nextOffset: hasNextPage ? offset + pageSize : null,
      prevOffset: hasPrevPage ? offset - pageSize : null,
    };

    if (products.length > 0 || totalItems > 0) {
      res.success(
        {
          products: products,
          pagination: paginationMeta,
        },
        "Productos listados con éxito"
      );
    } else {
      res.error(`No se encontraron los productos`, 404);
    }
  } catch (error) {
    console.error("Error al listar productos:", error);
    res.error("Error interno del servidor", 500);
  }
};
