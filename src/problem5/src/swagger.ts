// src/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Các tùy chọn Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
