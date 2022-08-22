const swaggerConfig = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Store Manager API',
      description: 'API simples para gerenciamento de produtos e vendas! Developed by 1mayk',
      version: '1.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
  },
  apis: ['../routes/productsRoute.js', '../routes/salesRoute.js'],
};

module.exports = swaggerConfig;
