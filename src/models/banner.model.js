import { db } from "../db.js";

// Query para crear registros en la tabla banner
export async function createBanner(link) {
  const query = `
    INSERT INTO banner (link)
    VALUES ($1)
    RETURNING *
  `;
  const result = await db.query(query, [link]);
  return result.rows[0];
}

// Query para listar los links de los banner
export async function searchBanner() {
  const query = "SELECT * FROM banner ORDER BY banner_id";
  const result = await db.query(query);
  return result.rows;
}

// Query para editar un banner
export async function changeBanner(link, banner_id) {
  const query  = `
    UPDATE banner
    SET Link = $1
    WHERE banner_id = $2
    RETURNING *
  `;
  const result = await db.query(query, [link, banner_id]);
  return result.rows[0];
}

// Query para eliminar un banner
export async function eraseBanner(banner_id) {
  const query  = `
    DELETE FROM banner WHERE banner_id = $1
  `;
  const result = await db.query(query, [banner_id]);
  return result.rows[0];
}