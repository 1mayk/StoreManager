const connection = require('./connection');

const salesModel = {
  async createSaleId() {
    const query = `
      INSERT INTO StoreManager.sales () VALUES ()
    `;
    const [{ insertId }] = await connection.query(query);
    return insertId;
  },
  async create(id, { productId, quantity }) {
    const query = `
      INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES (?,?,?)
    `;
    await connection.query(query, [id, productId, quantity]);
  },
  async get() {
    const query = `
      SELECT * FROM StoreManager.sales_products ORDER BY sale_id
    `;
    const [result] = await connection.query(query);
    return result;
  },
  async getId(id) {
    const query = `
      SELECT * FROM StoreManager.sales_products
      WHERE sale_id = ?
    `;
    const [result] = await connection.query(query, [id]);
    return result;
  },
  async checkSaleExists(id) {
    const query = `
      SELECT 1 FROM StoreManager.sales
      WHERE id = ?
    `;
    const [[result]] = await connection.query(query, [id]);
    return !!result;
  },
  async delete(id) {
    const query = `
      DELETE FROM StoreManager.sales
      WHERE id = ?
    `;
    await connection.query(query, [id]);
  },
};

module.exports = salesModel;
