import { hashPassword, comparePassword } from "../utilities/encrypt.utilies.js";
import { createUser, searchPassword } from "../models/user.model.js";

/* Función para crear un usuario.
  Parametros de entrada, nombre, email, telephone y password,
  el password se pasa a la función hashPassword.
  una vez hasheada la contraseña, se inserta un registro en la BD.
*/
export const addUser = async (req, res) => {
  try {
    const { name, email, telephone, password } = req.body;
    const hash = await hashPassword(password);
    const result = await createUser(name, email, telephone, hash);

    if (result) {
      res.success("Usuario creado con éxito");
    }
    
  } catch (error) {
    // 1. Verificación de error de unicidad (duplicado)
    if (error.code === "23505") {
      return res.error("El correo electrónico ya está registrado.", 401);
    }

    // 2. Errores de BD no controlados
    if (error.code) {
      console.error("Error de base de datos no controlado:", error);
      return res.error(`Error de BD: ${error.detail || error.message}`, 500);
    }

    // 3. Errores genéricos
    console.error("Error al crear usuario:", error);
    res.error("Error interno del servidor", 500);
  }
};

/* Función para loggin del usuario.
  Parametros de entrada, email y password,
  el email se pasa a la función searchPassword.
  si está retorna algo se almacena en la variable hash.
*/
export const validateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash = await searchPassword(email);

    // Se pasa el hash a la función comparePassword(), si esta tiene retorno != null sigue.
    let result;
    if (hash) {
      result = await comparePassword(password, hash);
    }

    // Si encuentra coincidencia, retorna una respuesta exitosa.
    if (result) {
      res.success(result, "Credenciales correctas");
    } else {
      res.error("Usuario o contraseña incorrectas", 404);
    }
  } catch (error) {
    console.error("Error al validar usuario:", error);
    res.error("Error interno del servidor", 500);
  }
};
