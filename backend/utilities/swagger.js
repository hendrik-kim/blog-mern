// backend/utilities/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Records RESTful API',
    version: '1.0.0',
    description:
      "Explore and test the Blog's RESTful API endpoints directly within this documentation.",
  },
  servers: [
    {
      url: 'http://localhost:5000/api/',
      description: 'Development Server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['backend/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
