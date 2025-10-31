// Dependencias
import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";

// Controladores
import { addBanner, editBanner, listBanner } from "../controllers/banner.controller.js";

// Esquema
import { validateSchema } from "../middlewares/validation.middleware.js";
import { createBannerSchema, editBannerSchema } from "../schemas/banner.schema.js"

// Instancia del metodo Router
const router = Router();

// Rutas
router.get("/list", listBanner)
router.post("/add", validateSchema(createBannerSchema), addBanner);
router.put("/edit", requireAuth, validateSchema(editBannerSchema), editBanner)

export default router;
