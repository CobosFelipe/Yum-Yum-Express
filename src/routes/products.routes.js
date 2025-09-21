// Dependencias
import { Router } from "express";

// Controladores
import { addProduct, editProduct, searchAllProducts, searchProductsByCategory } from "../controllers/product.controller.js";

// Esquema
import { validateSchema, validateParams } from "../middlewares/validation.middleware.js";
import { mainProductSchema, searchProductByCategorySchema, searchAllProductSchema } from "../schemas/product.schema.js";

// Instancia del metodo Router
const router = Router();

// Rutas
router.post("/add", validateSchema(mainProductSchema), addProduct);
router.put("/edit", validateSchema(mainProductSchema), editProduct);
router.get("/category/:category_id/:offset", validateParams(searchProductByCategorySchema), searchProductsByCategory)
router.get("/all/:limit/:offset", validateParams(searchAllProductSchema), searchAllProducts)

export default router;