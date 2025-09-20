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
export async function createCategory(name) {
  try {
    const query = "INSERT INTO category (name) VALUES ($1) RETURNING *";
    const result = await db.query(query, [name]);
    return result.rows[0];
  } catch (error) {
    console.log(`Error insertando categoria en bd ${error}`);
    return false;
  }
}

// Query para editar categoria
export async function editeCategory({category_id, name}) {
  try {
    const query = `UPDATE category SET name = $1 WHERE category_id = $2 RETURNING *`;
    const result = await db.query(query, [name, category_id]);
    return result.rows[0];
  } catch (error) {
    console.log(`Error editando categoria en bd ${error}`);
    return false;
  }
}

// Query para eliminar categoria
export async function eraseCategory(category_id) {
  try {
    const query = `DELETE FROM category WHERE category_id = $1 RETURNING *`;
    const result = await db.query(query, [category_id]);
    console.log(result);
    
    return result.rows[0];
  } catch (error) {
    console.log(`Error editando categoria en bd ${error}`);
    return false;
  }
}