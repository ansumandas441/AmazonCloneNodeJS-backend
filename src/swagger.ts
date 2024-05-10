// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'A simple API to demonstrate Swagger',
    },
  },
  apis: ['./routes/*.js'], // Path to the routes files
};

const specs = swaggerJsdoc(options);

export default specs;
