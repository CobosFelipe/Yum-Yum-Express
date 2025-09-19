import { Pool } from "pg";
import "dotenv/config";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

export const db = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  ssl: false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  maxLifetimeSeconds: 60,
});

// Probar conexion a base de datos
// try {
//   await db.query("SELECT NOW()");
//   console.log("DataBase Connected");
// } catch (error) {
//   console.log(error);
// }
