export function validateSchema(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.error(
        "Datos inválidos",
        400,
        error.details.map((d) => d.message)
      );
    }

    req.body = value; // datos validados
    next();
  };
}
