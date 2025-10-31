import { createOrderTransaction } from "../models/orders.models.js";

export const createOrder = async (req, res) => {  
  const user_id = req.user.id;
  const products = req.body.products;

  if (!products || products.length === 0) {
    return res.error("La orden debe contener al menos un ítem." , 400);
  }

  try {
    // Llamamos a la función de servicio que maneja TODA la transacción
    const result = await createOrderTransaction(user_id, products);

    if (result.success) {
      res.success({ orderId: result.orderId, total: result.total }, "Orden creada exitosamente", 201);
    } else {
      // El error fue manejado internamente (ROLLBACK)
      res.error("Fallo al procesar la compra", 500, result.error);
    }
  } catch (error) {
    console.error(error, "Error en el controlador de la orden:");
    res.error("Error interno del servidor.", 500, error);
  }
};
