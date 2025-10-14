// Dependencias
import { Router } from "express";
import { requireLogin } from "../middlewares/auth.middleware.js"

// Controladores
import { createOrder } from "../controllers/orders.controller.js";

// Esquemas
import { validateSchema } from "../middlewares/validation.middleware.js";
import { createOrderSchema } from "../schemas/orders.schema.js";

// Instancia del metodo Router
const router = Router();

// Rutas
router.post("/add", validateSchema(createOrderSchema), requireLogin, createOrder);

export default router;
