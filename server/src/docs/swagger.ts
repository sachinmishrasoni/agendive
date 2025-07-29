import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application, Express } from 'express';
import environment from '@/shared/config/environment';

const PORT = environment.PORT;

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Agendive API Documentation',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Dev',  
      },
    ],
  },
  apis: ['./src/features/**/*.ts'], // Path to your API routes
};

const customCss = `
    body {
      background-color: #121212;
      color: #e0e0e0;
    }
    .swagger-ui {
      background-color: #121212;
    }
    .swagger-ui .topbar {
      background-color: #1f1f1f;
    }
    .swagger-ui .opblock {
      background-color: #1e1e1e;
      border-color: #333;
    }
    .swagger-ui .opblock-summary {
      background-color: #2b2b2b;
    }
    .swagger-ui .response-col_description, .swagger-ui .model {
      color: #ccc;
    }
    .swagger-ui .btn, .swagger-ui .btn.execute {
      background-color: #333;
      color: #fff;
    }
    .swagger-ui .tab li button {
      color: #e0e0e0;
    }
    .swagger-ui .info {
      color: #fff;
    }
  `;


const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    
  }));
};
