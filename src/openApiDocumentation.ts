import { serve, setup } from 'swagger-ui-express';
import { Router } from 'express';

import swaggerDocument from './documentation/openApiDocumentation.json' with { type: 'json' }; // Assuming you have a swagger.json file
import specs from './swagger.js';
const router = Router();

// Serve Swagger UI at /api-docs route
router.use('/api-docs', serve, setup(swaggerDocument));

export default router;