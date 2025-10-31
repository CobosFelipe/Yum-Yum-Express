import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utilities/encrypt.utilies.js";
import { createUser, searchUser, searchUserData } from "../models/user.model.js";
import { capitalizeFirstLetter } from "../utilities/string.utilities.js";

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

export const getInfoUser = async (req, res) => {
  try {
    const id = req.user.id;
    const userData = await searchUserData(id);

    if (!userData) {
      return res.error("Error consultando los datos del usuario", 404);
    }

    res.success(userData, "Consulta exitosa");
  } catch (error) {
    console.error("Error consultando los datos del usuario", error);
    res.error("Error interno del servidor", 500);
  }
};

/* Función para crear un usuario.
  Parametros de entrada, nombre, email, telephone y password,
  el password se pasa a la función hashPassword.
  una vez hasheada la contraseña, se inserta un registro en la BD.
*/
export const addUser = async (req, res) => {
  try {
    const { name, email, telephone, password } = req.body;
    const Name = capitalizeFirstLetter(name);
    const hash = await hashPassword(password);
    const result = await createUser(Name, email, telephone, hash);

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

    const userCredentials = await searchUser(email);

    if (!userCredentials) {
      return res.error("Usuario o contraseña incorrectas", 203);
    }

    const { userId, hash, userName, role, isAdmin } = userCredentials;

    // Se pasa el hash a la función comparePassword(), si esta tiene retorno != null sigue.
    const result = await comparePassword(password, hash);

    // Si encuentra coincidencia, retorna una respuesta exitosa.
    if (result) {
      // Generar el token (Si la contraseña coincide)
      const token = jwt.sign({ id: userId, userName: userName, role: role, isAdmin: isAdmin }, JWT_KEY, {
        expiresIn: "1h",
      });

      // Código para setear la cookie
      res.cookie("acces_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60,
      });

      res.success({ userName, isAdmin }, "Credenciales correctas");
    } else {
      res.error("Usuario o contraseña incorrectas", 203);
    }
  } catch (error) {
    console.error("Error al validar usuario: (Error interno)", error);
    res.error("Error interno del servidor", 500);
  }
};

export const logoutUser = async (req, res) => {
  try {
    const id = req.user;
    if (id) {
      res.cookie("session-token", "", {
        httpOnly: true,
        expires: new Date(0),
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      res.success("Sesión cerrada correctamente");
    } else {
      res.error("Error al cerrar sesión", 503);
    }   
  } catch (error) {
    console.error("Error al cerrar sesión: (Error interno)", error);
    res.error("Error interno del servidor", 500);
  }
};
