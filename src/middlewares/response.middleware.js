export default function responseMiddleware(req, res, next) {
  // sobreescribimos res.success y res.error para unificar respuestas
  res.success = (data, message = "Operación exitosa", code = 200) => {
    res.status(code).json({
      status: "success",
      code,
      message,
      obj: data,
    });
  };

  res.error = (message = "Error en el servidor", code = 500, details = null) => {
    res.status(code).json({
      status: "error",
      code,
      message,
      obj: details,
    });
  };

  next();
}
