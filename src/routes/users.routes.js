// Dependencias
import { Router } from "express";
import { requireLogin } from "../middlewares/auth.middleware.js";

// Controladores
import { validateUser, getInfoUser, addUser, loginUser, logoutUser } from "../controllers/user.controller.js";

// Esquema
import { validateSchema } from "../middlewares/validation.middleware.js";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema.js";

// Instancia del metodo Router
const router = Router();

// Rutas
router.get("/verify-session", requireLogin, validateUser);
router.get("/get-info", requireLogin, getInfoUser)
router.get("/logout", requireLogin, logoutUser);
router.post("/add", validateSchema(createUserSchema), addUser);
router.post("/login", validateSchema(loginUserSchema), loginUser);


export default router;
