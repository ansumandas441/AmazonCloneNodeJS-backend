import { Request, Response, NextFunction } from 'express';
import { redisClient } from "../connections.js";

const checkProductNameCache = async (req: Request, res: Response, next: NextFunction) => {
    const productName = req.query.name as string;
    const cacheKey = `product_name:${productName}`;
    const cachedProducts = await redisClient.get(cacheKey);
    if (cachedProducts) {
        console.log("Returned cached products");
    return res.status(200).json(JSON.parse(cachedProducts));
    }
    next();
}


const checkProductIdCache = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.query.id as string;
    const cacheKey = `product_id:${productId}`;
    const cachedProducts = await redisClient.get(cacheKey);
    if (cachedProducts) {
        console.log("Returned cached products");
    return res.status(200).json(JSON.parse(cachedProducts));
    }
    next();
}

const checkSearchCache = async (req: Request, res: Response, next: NextFunction) => {
    const searchQuery = req.query.name as string;
    const cacheKey = `product_search:${searchQuery}`;
    const cachedProducts = await redisClient.get(cacheKey);
    if (cachedProducts) {
        console.log("Returned cached products");
    return res.status(200).json(JSON.parse(cachedProducts));
    }
    next();
}

const invalidateNameCache = async (req: Request, res: Response, next: NextFunction) => {
    let productName = req.query.name;
    const cacheKey = `product_name:${productName}`;
    const exists = await redisClient.exists(cacheKey);
    if (exists) {   
        await redisClient.del(cacheKey);
    }
    next();
}

const invalidateIdCache = async (req: Request, res: Response, next: NextFunction) => {
    let productId = req.query.id;
    const cacheKey = `product_id:${productId}`;
    const exists = await redisClient.exists(cacheKey);
    if (exists) {  
        await redisClient.del(cacheKey);
    }
    next();
}

const invalidateSearchCache = async (req: Request, res: Response, next: NextFunction) => {
    let searchQuery = req.query.name;
    const cacheKey = `product_search:${searchQuery}`;
    const exists = await redisClient.exists(cacheKey);
    if (exists) {  
        await redisClient.del(cacheKey);
    }
    next();
}

export default { checkProductNameCache, checkProductIdCache, checkSearchCache, invalidateNameCache, invalidateIdCache, invalidateSearchCache };

