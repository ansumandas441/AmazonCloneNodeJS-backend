import { serve, setup } from 'swagger-ui-express';
import swaggerDocument from './documentation/openApiDocumentation.json'; // Assuming you have a swagger.json file
import { Router } from 'express';
const router = Router();
// Serve Swagger UI at /api-docs route
router.use('/api-docs', serve, setup(swaggerDocument));
export default router;
