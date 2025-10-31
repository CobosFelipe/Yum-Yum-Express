// Dependencias
import { Router } from "express";
import { requireAuth }  from "../middlewares/auth.middleware.js"

// Controladores
import { listCategories, addCategory, editCategory, deleteCategory } from "../controllers/category.controller.js";

// Esquema
import { validateSchema } from "../middlewares/validation.middleware.js";
import { addCategorySchema, editCategorySchema, deleteCategorySchema } from "../schemas/category.schema.js";

// Instancia del metodo Router
const router = Router();

// Rutas
router.get("/get", listCategories);
router.post("/add", validateSchema(addCategorySchema), requireAuth, addCategory);
router.put("/edit", validateSchema(editCategorySchema), requireAuth, editCategory);
router.delete("/delete", validateSchema(deleteCategorySchema), requireAuth, deleteCategory);

export default router;
