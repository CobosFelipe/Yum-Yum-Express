import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utilities/encrypt.utilies.js";
import { createUser, searchUser } from "../models/user.model.js";

export const validateUser = (req, res) => {
  const { userName, isAdmin } = req.user;
  res.success(
    {
      userName: userName,
      isAdmin: isAdmin,
    },
    "Sesión activa"
  );
};

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
  el email se pasa a la función searchUser.
  si está retorna algo se almacena en la variable hash.
*/
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const JWT_KEY = process.env.SECRET_JWT_KEY;

    const { hash, userName, role, isAdmin } = await searchUser(email);

    // Se pasa el hash a la función comparePassword(), si esta tiene retorno != null sigue.
    let result;
    if (hash) {
      result = await comparePassword(password, hash);
    }

    const token = jwt.sign({ userName: userName, role: role, isAdmin: isAdmin }, JWT_KEY, {
      expiresIn: "1h",
    });

    // Si encuentra coincidencia, retorna una respuesta exitosa.
    if (result) {
      // Enviamos la cookie directamente a res
      res.cookie("acces_token", token, {
        httpOnly: true, // La cookie solo se puede acceder desde el servidor
        secure: process.env.NODE_ENV === "production", // La cookie solo se puede acceder por https en production
        sameSite: "lax", // La cookie solo se puede acceder desde el mismo dominio
        maxAge: 1000 * 60 * 60, // La cookie tiene una validez de 1h
      });

      // Enviamos el cuerpo de la respuesta estandar
      res.success({ userName, isAdmin }, "Credenciales correctas");
    } else {
      res.error("Usuario o contraseña incorrectas", 203);
    }
  } catch (error) {
    console.error("Error al validar usuario:", error);
    res.error("Error interno del servidor", 500);
  }
};
