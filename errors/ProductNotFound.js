class ProductNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'ProductNotFound';
  }
}

module.exports = ProductNotFound;
