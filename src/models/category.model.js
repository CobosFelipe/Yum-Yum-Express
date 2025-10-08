import { db } from "../db.js";

// Query para consultar categorias
export async function searchCategories() {
  try {
    const query = "SELECT * FROM category ORDER BY category_id ASC";
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.log(`Error insertando usuario en bd ${error}`);
    return false;
  }
}

// Query para crear categoria
export async function createCategory(name, img) {
  try {
    const query = "INSERT INTO category (name, img) VALUES ($1, $2) RETURNING *";
    const result = await db.query(query, [name, img]);
    return result.rows[0];
  } catch (error) {
    console.log(`Error insertando categoria en bd ${error}`);
    return false;
  }
}

// Query para editar categoria
export async function editeCategory({ category_id, name, img }) {
  try {
    const query = `UPDATE category SET name = $1, img = $2 WHERE category_id = $3 RETURNING *`;
    const result = await db.query(query, [name, img, category_id]);
    return result.rows[0];
  } catch (error) {
    console.log(`Error editando categoria en bd ${error}`);
    return false;
  }
}

// Query para eliminar categoria
export async function eraseCategory(category_id) {
  const query = `DELETE FROM category WHERE category_id = $1 RETURNING *`;
  const result = await db.query(query, [category_id]);
  return result.rows[0];
}
