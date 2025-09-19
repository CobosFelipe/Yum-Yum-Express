// Importar dependencias
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import indexRoutes from './src/routes/index.routes.js'
import { responseMiddleware } from "./src/middlewares/response.middleware.js";

// Inicializar aplicación
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(responseMiddleware);

// Ruta base
app.use(indexRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
