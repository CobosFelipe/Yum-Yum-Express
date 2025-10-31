import { db } from "../db.js";

// Query para crear registros en la tabla productos
export async function createProduct(product) {
  const { fk_category_id, product_name, price, description, img, available, quantity } = product;
  const query = `
      INSERT INTO products (
      fk_category_id,
      product_name,
      price,
      description,
      img,
      available,
      quantity
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `;
  const result = await db.query(query, [fk_category_id, product_name, price, description, img, available, quantity]);
  return result.rows[0];
}

// Query para modificar registros en la tabla productos
export async function modifyProduct(product) {
  const { product_id, fk_category_id, product_name, price, description, img, available, quantity } = product;
  const query = `
      UPDATE products SET
      fk_category_id = $1,
      product_name = $2,
      price = $3,
      description = $4,
      img = $5,
      available = $6,
      quantity = $7
      WHERE product_id = $8
      RETURNING *
      `;
  const result = await db.query(query, [fk_category_id, product_name, price, description, img, available, quantity, product_id]);
  return result.rows[0];
}

// Query para consultar productos por categoria
export async function productsByCategory(category_name, offset) {
  const pageSize = 12;
  // Query para obtener los productos paginados
  const query = `
      SELECT
	    p.product_id,
	    c.category_name,
	    p.product_name as product_name,
	    p.price,
	    p.description,
	    p.img,
	    p.available,
	    p.quantity
      FROM products p JOIN category c ON p.fk_category_id = c.category_id
      WHERE c.category_name = $1 AND p.available = true AND quantity > 0
      LIMIT $2 OFFSET $3
      `;
  const result = await db.query(query, [category_name, pageSize, offset]);
  const products = result.rows;

  // Query para obtener el total de registros filtrados
  const totalCountQuery = `
      SELECT COUNT(p.product_id)
      FROM products p JOIN category c ON p.fk_category_id = c.category_id
      WHERE c.category_name = $1 AND p.available = true AND quantity > 0
      `;
  const totalCountResult = await db.query(totalCountQuery, [category_name]);
  const totalItems = parseInt(totalCountResult.rows[0].count);

  // Devolver un objeto con los productos y el total de items
  return {
    products,
    totalItems,
    pageSize,
  };
}

// Query para consultar todos los productos
export async function listAllProducts(limit, offset) {
  const pageSize = 12;
  // Query para obtener los productos paginados
  const query = `
      SELECT
	    p.product_id,
      c.category_id,
	    c.category_name,
	    p.product_name as product_name,
	    p.price,
	    p.description,
	    p.img,
	    p.available,
	    p.quantity
      FROM products p JOIN category c ON p.fk_category_id = c.category_id
      WHERE available = TRUE AND quantity > 0
      ORDER BY p.product_id
      LIMIT $1 OFFSET $2
      `;
  const result = await db.query(query, [limit, offset]);
  const products = result.rows;

  // Query para obtener el total de registros filtrados
  const totalCountQuery = `
      SELECT COUNT(p.product_id)
      FROM products p JOIN category c ON p.fk_category_id = c.category_id
      WHERE available = TRUE AND quantity > 0
      `;
  const totalCountResult = await db.query(totalCountQuery);
  const totalItems = parseInt(totalCountResult.rows[0].count);

  // Devolver un objeto con los productos y el total de items
  return {
    products,
    totalItems,
    pageSize,
  };
}

// Query para eliminar un producto
export async function deleteProduct(product_id) {
  const query = `
      DELETE FROM products
      WHERE product_id = $1
      RETURNING *
      `;
  const result = await db.query(query, [product_id]);
  return result.rows[0];
}

// Query para consultar todos los productos Admin
export async function listAllProductsAdmin(limit, offset) {
  const pageSize = 12;
  // Query para obtener los productos paginados
  const query = `
      SELECT
	    p.product_id,
      c.category_id,
	    c.category_name,
	    p.product_name as product_name,
	    p.price,
	    p.description,
	    p.img,
	    p.available,
	    p.quantity
      FROM products p JOIN category c ON p.fk_category_id = c.category_id
      ORDER BY p.product_id
      LIMIT $1 OFFSET $2
      `;
  const result = await db.query(query, [limit, offset]);
  const products = result.rows;

  // Query para obtener el total de registros filtrados
  const totalCountQuery = `
      SELECT COUNT(p.product_id)
      FROM products p JOIN category c ON p.fk_category_id = c.category_id
      `;
  const totalCountResult = await db.query(totalCountQuery);
  const totalItems = parseInt(totalCountResult.rows[0].count);

  // Devolver un objeto con los productos y el total de items
  return {
    products,
    totalItems,
    pageSize,
  };
}