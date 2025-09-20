import { hashPassword, comparePassword } from "../utilities/encrypt.utilies.js";
import { createUser, searchPassword } from "../models/user.model.js";

export const addUser = async (req, res) => {
  try {
    const { name, email, telephone, password } = req.body;
    const hash = await hashPassword(password);
    const result = await createUser(name, email, telephone, hash);

    if (result) {
      res.success({}, "Usuario creado con éxito");
    } else {
      res.error("Error al crear usuario", 404);
    }
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.error("Error interno del servidor", 500);
  }
};

export const validateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash = await searchPassword(email);
    const result = await comparePassword(password, hash);

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
