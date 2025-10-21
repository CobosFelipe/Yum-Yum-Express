import { db } from "../db.js";

// Query para consultar ordenes
export async function searchOrders() {
  try {
    const query = "SELECT * FROM category ORDER BY category_id ASC";
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.log(`Error insertando usuario en bd ${error}`);
    return false;
  }
}

// Query para consultar ordenes por usuario
export async function searchOrdersByUser(user_id) {
  try {
    const query = `
      SELECT o.order_id, o.fk_user_id, u.user_name, o.amount, o.created_at, oi.products 
      FROM orders o
      JOIN order_items oi ON o.order_id = oi.fk_order_id
      JOIN users u ON u.user_id = o.fk_user_id
      WHERE o.fk_user_id = $1;
    `;
    const result = await db.query(query, [user_id]);
    return result.rows;
  } catch (error) {
    console.log(`Error insertando usuario en bd ${error}`);
    return false;
  }
}

// Query para insertar ordenes
export async function createOrderTransaction(user_id, products) {
  let client;
  // Obtener el id de los productos
  const productIds = products.map((item) => item.product_id);

  try {
    // Inicia la Transacción
    client = await db.connect();
    await client.query("BEGIN");

    // Consultar precios y stock actuales
    const validationQuery = `
        SELECT product_id, name, price, quantity 
        FROM products 
        WHERE product_id = ANY($1::int[]) AND available = TRUE;
    `;
    const validationResult = await client.query(validationQuery, [productIds]);
    const dbProducts = validationResult.rows;

    // Mapear los datos de la base de datos para fácil acceso
    const productMap = new Map();
    dbProducts.forEach((p) => productMap.set(p.product_id, p));

    let totalAmount = 0;
    const productsForOrderItems = [];

    // Validación y calculo
    for (const item of products) {
      const dbProduct = productMap.get(item.product_id);

      // Validar que el producto existe y está disponible
      if (!dbProduct) {
        throw new Error(`Producto ID ${item.product_id} no encontrado o no disponible.`);
      }

      // Validar Stock
      if (dbProduct.quantity < item.quantity) {
        throw new Error(`Stock insuficiente para producto ID ${item.product_id}. Disponible: ${dbProduct.quantity}.`);
      }

      // Cálculo seguro del total con el precio de la DB
      totalAmount += Number(dbProduct.price) * item.quantity;

      // Preparar el JSONB del item
      productsForOrderItems.push({
        product_id: dbProduct.product_id,
        name: dbProduct.name,
        price: Number(dbProduct.price),
        quantity: item.quantity,
      });
    }

    // Inserción de la orden
    const ordesQuery = `
      INSERT INTO orders (fk_user_id, amount, created_at)
      VALUES ($1, $2, NOW())
      RETURNING order_id
    `;
    const result = await client.query(ordesQuery, [user_id, totalAmount]);
    const fk_order_id = result.rows[0].order_id;

    // Insersión masiva de items
    const itemValues = [];
    const itemParams = [];
    let paramIndex = 1;

    productsForOrderItems.forEach((item) => {
      itemValues.push(`($${paramIndex++}, $${paramIndex++})`);
      itemParams.push(fk_order_id);
      itemParams.push(JSON.stringify(item));
    });

    const itemsQuery = `INSERT INTO order_items (fk_order_id, products) VALUES ${itemValues.join(", ")}`;
    await client.query(itemsQuery, itemParams);

    // Creamos la lista de updates en una sola query para mayor eficiencia
    const updatePromises = products.map((item) =>
      client.query(`UPDATE products SET quantity = quantity - $1 WHERE product_id = $2;`, [item.quantity, item.product_id])
    );
    // Esperamos a que todos los updates se completen
    await Promise.all(updatePromises);

    await client.query("COMMIT");

    return { success: true, orderId: fk_order_id, total: totalAmount };
  } catch (error) {
    // Deshacer la Transacción
    if (client) {
      await client.query("ROLLBACK");
    }
    console.error("Error al crear la orden (ROLLBACK ejecutado):", error);
    return { success: false, error: error.message };
  } finally {
    if (client) {
      client.release();
    }
  }
}
