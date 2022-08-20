/* eslint-disable complexity */
// eslint-disable-next-line max-lines-per-function
const errorHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  let code = 400;
  if (
    message === '"quantity" must be greater than or equal to 1'
    || message === '"name" length must be at least 5 characters long'
  ) code = 422;
  switch (name) {
    case 'ValidationError':
      res.status(code).json({ message });
      break;
    case 'ProductNotFound':
      res.status(404).json({ message });
      break;
    case 'SaleNotFound':
      res.status(404).json({ message });
      break;
    default:
      console.warn(err);
      res.sendStatus(500);
  }
};

module.exports = errorHandler;
