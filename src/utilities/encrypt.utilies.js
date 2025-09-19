import bcrypt from "bcrypt";

export async function hashPassword(password) {
  const saltRounds = 11;
  try {
    // Generar saltos
    const salt = await bcrypt.genSalt(saltRounds);
    // Encriptar contraseña
    const hash = await bcrypt.hash(password, salt);
    // Devolver contraseña encriptada
    return hash;
  } catch (error) {
    console.log(`Error al hashear contraseña: ${error}`);
  }
}

export async function comparePassword(password, hash) {
  try {
    const compare = await bcrypt.compare(password, hash);
    
    if (compare) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(`Error al comparar contraseña: ${error}`);
  }
}
