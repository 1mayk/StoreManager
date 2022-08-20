const app = require('./app');
require('dotenv').config();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
