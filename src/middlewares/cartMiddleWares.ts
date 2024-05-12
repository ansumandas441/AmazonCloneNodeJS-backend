

import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const addProductSchema = z.object({
    productId: z.string(),
    quantity: z.number().int().nonnegative(),
});

// Zod schema for checkout
const checkoutSchema = z.object({
  address: z.string(),
});

// Zod schema for delete by id
const deleteByIdSchema = z.object({
    productId: z.string(),
});

// Zod schema for update quantity
const updateQuantitySchema = z.object({
    productId: z.string(),
    quantity: z.number().int(),
  });

// Middleware for adding product
const validateAddProduct = (req: Request, res: Response, next: NextFunction) => {
    const result = addProductSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error);
    }
    next();
};

// Middleware for checkout
const validateCheckout = (req: Request, res: Response, next: NextFunction) => {
  const result = checkoutSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error);
  }
  next();
};



// Middleware for delete by id
const validateDeleteById = (req: Request, res: Response, next: NextFunction) => {
  const result = deleteByIdSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error);
  }
  next();
};

// Middleware for update quantity
const validateUpdateQuantity = (req: Request, res: Response, next: NextFunction) => {
  const result = updateQuantitySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error);
  }
  next();
};

export default { validateAddProduct, validateCheckout, validateDeleteById, validateUpdateQuantity };