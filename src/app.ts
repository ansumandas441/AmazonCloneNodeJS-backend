import express, { json, Request, Response , NextFunction} from 'express';
import cors from 'cors';
import { resolve } from 'path';
import cookieParser from 'cookie-parser';

import {connectMongoDb, connectRedis} from './connections.js';
import authMiddleWares from './middlewares/authMiddleWares.js';
import authRoutes from './routes/authRouter.js';
import productRoutes from './routes/productRouter.js';
import paymentRoutes from './routes/paymentRouter.js';
import cartRoutes from './routes/cartRouter.js';
import staticRoutes from './routes/staticRouter.js';
import orderRoutes from './routes/orderRouter.js';
import openApiDocumentation from './openApiDocumentation.js';
import rateLimiter from './middlewares/rateLimiter.js';

const app = express();


app.use(rateLimiter);

//setting up documentation
app.use('/dev/docs', openApiDocumentation);

//Middlewares
// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', resolve('views'));

// Content Security Policy middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Security-Policy', 'default-src https:');
  next();
});

// JSON and CORS middlewares
app.use(json());
app.use(cors());
app.use(cookieParser());
app.use(authMiddleWares.checkForAuthentication);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

//connect to mongoDb
connectMongoDb();
connectRedis();

//Apis 
//test
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello world');
});

//add product
app.post('/products/add', (req: Request, res: Response) => {
  // const productDetail = req.body;
  console.log('Product detail written');
});

// Routes
app.use('/auth/api', authRoutes);
app.use('/product/api', authMiddleWares.restrictTo(['NORMAL']), productRoutes);
app.use('/payment/api', authMiddleWares.restrictTo(['NORMAL']), paymentRoutes);
app.use('/cart/api', authMiddleWares.restrictTo(['NORMAL']), cartRoutes);
app.use('/order/api', authMiddleWares.restrictTo(['NORMAL']), orderRoutes);
// app.use('/product/api', restrictTo(["ADMIN"]), productRoutes);
// app.use('/payment/api', restrictTo(["ADMIN"]), paymentRoutes);
app.use('/', staticRoutes);

export default app;

