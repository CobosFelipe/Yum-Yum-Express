// Dependencias
import { Router } from "express";
import requireAuth from "../middlewares/auth.middleware.js";

// Controladores
import { validateUser, addUser, loginUser } from "../controllers/user.controller.js";

// Esquema
import { validateSchema } from "../middlewares/validation.middleware.js";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema.js";

// Instancia del metodo Router
const router = Router();

// Rutas
router.get("/verify-session", requireAuth, validateUser);
router.post("/add", validateSchema(createUserSchema), addUser);
router.post("/login", validateSchema(loginUserSchema), loginUser);

export default router;
