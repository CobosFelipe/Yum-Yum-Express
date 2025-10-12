import jwt from "jsonwebtoken";
export default function requireAuth (req, res, next) {
  // Obtener el token de la cookie
  const token = req.cookies.acces_token;
  // Obtener el jwt_key de las variables de entorno
  const JWT_KEY = process.env.SECRET_JWT_KEY;

  if (!token ) {
    return res.error("Acceso denegado", 401);
  }

  try {
    // Verificar el token
    const data = jwt.verify(token, JWT_KEY);

    if (!data.isAdmin) {
      return res.error("Usuario debe ser admin", 401);
    }
        
    // Adjuntar los datos del usuario a la solicitud
    req.user = data;
    
    next();
  } catch (error) {
    console.log("Error");
    // Si el token es invalido o expiró
    return res.error("Token inválido o expirado.", 403);
  }
}
