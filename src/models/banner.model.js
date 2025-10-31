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
export async function changeBanner(link, id_banner) {
  const query  = `
    UPDATE banners
    SET Link = $1
    WHERE id_banner = $2
  `;
  const result = await db.query(query, [link, id_banner]);
  return result.rows[0];
}

// Query para eliminar un banner
export async function eraseBanner(id_banner) {
  const query  = `
    DELETE FROM banner WHERE id_banner = $1
  `;
  const result = await db.query(query, [id_banner]);
  return result.rows[0];
}