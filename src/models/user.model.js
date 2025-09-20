import { db } from "../db.js";

// Query para crear registros en la tabla usuario
export async function createUser(name, email, telephone, hash) {
  try {
    const query = `INSERT INTO users (
        user_name,
        email,
        telephone,
        password,
        role,
        is_admin
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`;
    const result = await db.query(query, [name, email, telephone, hash, "user", false]);
    return result.rows[0];
  } catch (error) {
    console.log(`Error insertando usuario en bd ${error}`);
    return false;
  }
}

// Query para buscar el pasword hash con el email
export async function searchPassword(email) {
  try {
    const query = "SELECT password FROM users WHERE email = ($1)"
    const result = await db.query(query, [email]);
    if (result.rows.length > 0) {
      const { password } = result.rows[0]; 
      return password;
    }
    return null;
  } catch (error) {
    console.log(`Error consultando la contraseña en bd ${error}`);
    return false;
  }
}
