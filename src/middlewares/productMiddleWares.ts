import { z, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Schema definitions using zod
const productSchema = z.object({
  name: z.string(),
  price: z.number().nonnegative(),
  description: z.string().optional().default(''),
  tags: z.array(z.string()).optional().default([]),
});

const productIdSchema = z.object({
  id: z.string(),
});

const pageDetailsSchema = z.object({
  page: z.number().int().nonnegative().optional().default(1),
  limit: z.number().int().nonnegative().optional().default(10),
  sortField: z.string().optional().default('price'),
  sortOrder: z.string().optional().default('asc'),
});

const productNameSchema = z.object({
  name: z.string(),
});

// Middleware functions
const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  try {
    productSchema.parse({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      tags: req.body.tags,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    next(error);
  }
};

const validateProductId = (req: Request, res: Response, next: NextFunction) => {
  try {
    productIdSchema.parse({
      id: req.query.id,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    next(error);
  }
};

const validatePageDetails = (req: Request, res: Response, next: NextFunction) => {
  try {
    pageDetailsSchema.parse({
      page: req.query.page,
      limit: req.query.limit,
      sortField: req.query.sortField,
      sortOrder: req.query.sortOrder,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    next(error);
  }
};

const validateProductName = (req: Request, res: Response, next: NextFunction) => {
  try {
    productNameSchema.parse({
      name: req.query.name,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    next(error);
  }
};

// Middleware exports
export default {
  validateProduct,
  validateProductId,
  validatePageDetails,
  validateProductName,
};
