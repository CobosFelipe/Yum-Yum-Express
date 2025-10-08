// Dependencias
import { Router } from "express";

// Controladores
import { addBanner, listBanner } from "../controllers/banner.controller.js";

// Esquema
import { validateSchema } from "../middlewares/validation.middleware.js";
import { createBannerSchema } from "../schemas/banner.schema.js"

// Instancia del metodo Router
const router = Router();

// Rutas
router.post("/add", validateSchema(createBannerSchema), addBanner);
router.get("/list", listBanner)

export default router;
