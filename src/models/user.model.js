import { db } from "../db.js";

// Query para crear registros en la tabla usuario
export async function createUser(name, email, telephone, hash) {
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
}

// Query para buscar el pasword hash con el email
export async function searchUser(email) {
  try {
    const query = "SELECT user_name, password, role, is_admin FROM users WHERE email = ($1)";
    const result = await db.query(query, [email]);

    const data = result.rows[0];
    
    if (result.rows.length > 0) {
      const userName = data.user_name;
      const hash = data.password;
      const role = data.role;
      const isAdmin = data.is_admin;
      return { userName, hash, role, isAdmin };
    }
    return null;
  } catch (error) {
    console.log(`Error consultando la contraseña en bd ${error}`);
    return false;
  }
}
