class SaleNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'SaleNotFound';
  }
}

module.exports = SaleNotFound;
