import { createBanner, searchBanner } from "../models/banner.model.js"

// Función para agregar una imagen al banner.
export const addBanner = async (req, res) => {
  try {
    const banner = await createBanner(req.body.link);
    if (banner) {
      res.success("Imagen agregada con éxito");
    }
  } catch (error) {
    if (error.code) {
      console.error("Error de base de datos no controlado:", error);
      return res.error(`Error de BD: ${error.detail || error.message}`, 500);
    }
    console.error("Error al agregar imagen:", error);
    res.error("Error interno del servidor", 500);
  }
};

// Función para listar imagenes del banner
export const listBanner = async (req, res) => {
  try {
    const result = await searchBanner();
    if (result) {
      res.success(result, "Consulta correcta");
    }
  } catch (error) {
    console.error("Error al consultar banners:", error);
    res.error("Error interno del servidor", 500);
  }
};
