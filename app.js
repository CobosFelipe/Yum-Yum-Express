// Importar dependencias
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import indexRoutes from "./src/routes/index.routes.js";
import responseMiddleware from "./src/middlewares/response.middleware.js";

// Inicializar aplicación
const app = express();
const PORT = process.env.PORT;

// Configuración de CORS
const allowedOrigins = [
  process.env.URL_DEV, // Frontend de desarrollo local
  process.env.URL_PROD, // Dominio desplegado (si aplica)
];

const corsOptions = {
  origin: allowedOrigins,

  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(responseMiddleware);

// Ruta base
app.use(indexRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
