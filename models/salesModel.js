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
};

module.exports = salesModel;
