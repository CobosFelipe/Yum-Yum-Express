// Dependencias
import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js"

// Controladores
import { addProduct, editProduct, searchAllProducts, searchProductsByCategory, deleteProductById, searchAllProductsAdmin } from "../controllers/product.controller.js";

// Esquema
import { validateSchema, validateParams } from "../middlewares/validation.middleware.js";
import { mainProductSchema, searchProductByCategorySchema, searchAllProductSchema, validateProductId } from "../schemas/product.schema.js";

// Instancia del metodo Router
const router = Router();

// Rutas
router.get("/all/:limit/:offset", validateParams(searchAllProductSchema), searchAllProducts)
router.get("/all-adm/:limit/:offset", validateParams(searchAllProductSchema), searchAllProductsAdmin)
router.get("/category/:category_name/:offset", validateParams(searchProductByCategorySchema), searchProductsByCategory)
router.post("/add", validateSchema(mainProductSchema), requireAuth, addProduct);
router.put("/edit", validateSchema(mainProductSchema), requireAuth, editProduct);
router.delete("/delete/:product_id",validateParams(validateProductId), requireAuth, deleteProductById)


export default router;