// Dependencias
import { Router } from "express";

// Controladores
import { addUser, validateUser } from "../controllers/user.controller.js";

// Esquema
import { validateSchema } from "../middlewares/validation.middleware.js";
import { createUserSchema, validateUserSchema } from "../schemas/user.schema.js";

// Instancia del metodo Router
const router = Router();

// Rutas
router.post("/add", validateSchema(createUserSchema), addUser);
router.post("/login", validateSchema(validateUserSchema),  validateUser)

export default router;
