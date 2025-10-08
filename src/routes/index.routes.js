// Dependencias
import { Router } from "express";

// Importando Rutas
import userRoutes from "./users.routes.js";
import productRoutes from "./products.routes.js"
import categoryRoutes from "./categories.routes.js"
import bannerRoutes from "./banner.routes.js"

// Instacia del metodo router
const router = Router();

// Rutas
router.use("/user", userRoutes);
router.use("/product", productRoutes)
router.use("/category", categoryRoutes)
router.use("/banner", bannerRoutes)

export default router;
