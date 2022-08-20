const connection = require('./connection');

const productsModel = {
  async checkIfExists(id) {
    const query = 'SELECT 1 FROM StoreManager.products WHERE id = ?';
    const [[result]] = await connection.query(query, [id]);
    return !!result;
  },
  async get() {
    const query = 'SELECT * FROM StoreManager.products ORDER BY id';
    const [result] = await connection.query(query);
    return result;
  },
  async getId(id) {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [[result]] = await connection.query(query, [id]);
    return result;
  },
  async create(name) {
    const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await connection.query(query, [name]);
    return insertId;
  },
  async update(id, changes) {
    const query = `
      UPDATE StoreManager.products
      SET ?
      WHERE id = ?
    `;
    await connection.query(query, [changes, id]);
  },
};

module.exports = productsModel;
