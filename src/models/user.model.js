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
    const query = "SELECT user_id, user_name, password, role, is_admin FROM users WHERE email = ($1)";
    const result = await db.query(query, [email]);

    if (result.rows.length === 0) {
      // Usuario no encontrado
      return null;
    }

    const data = result.rows[0];

    // Regresar el objeto desestructurado
    return {
      userId: data.user_id,
      userName: data.user_name,
      hash: data.password,
      role: data.role,
      isAdmin: data.is_admin,
    };
  } catch (error) {
    console.error(`Error consultando el usuario en la BD: ${error.message}`);
    throw new Error("Fallo en la consulta de base de datos.");
  }
}

// Query para obtener la información de contacto del usuario
export async function searchUserData(id) {
  try {
    const query = "SELECT user_name, email, telephone  FROM users WHERE user_id = ($1)";
    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      // Usuario no encontrado
      return null;
    }

    const data = result.rows[0];

    // Regresar el objeto desestructurado
    return {
      userName: data.user_name,
      email: data.email,
      telephone: data.telephone,
    };
  } catch (error) {
    console.error(`Error consultando el usuario en la BD: ${error.message}`);
    throw new Error("Fallo en la consulta de base de datos.");
  }
}
