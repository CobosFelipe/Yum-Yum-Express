import { db } from "../db.js";

// Query para crear registros en la tabla usuario
export async function createBanner(link) {
  const query = `INSERT INTO banner (link1)
        VALUES ($1)
        RETURNING *`;
  const result = await db.query(query, [link]);
  return result.rows[0];
}

// Query para buscar el pasword hash con el email
export async function searchBanner() {
  const query = "SELECT * FROM banner ORDER BY banner_id";
  const result = await db.query(query);

  return result.rows;
}
