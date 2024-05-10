import express, { json } from 'express';
import cors from 'cors';
import { resolve } from 'path';
import connectMongoDb from './connections';
import cookieParser from 'cookie-parser';
import authMiddleWares from './middlewares/authMiddleWares';
import authRoutes from './routes/authRouter';
import productRoutes from './routes/productRouter';
import paymentRoutes from './routes/paymentRouter';
import cartRoutes from './routes/cartRouter';
import staticRoutes from './routes/staticRouter';
import orderRoutes from './routes/orderRouter';
import openApiDocumentation from './openApiDocumentation';
import rateLimiter from './middlewares/rateLimiter';
const app = express();
//
app.use(rateLimiter);
//setting up documentation
app.use('/dev/docs', openApiDocumentation);
//Middlewares
// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", resolve('views'));
// Content Security Policy middleware
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 'default-src https:');
    next();
});
// JSON and CORS middlewares
app.use(json());
app.use(cors());
app.use(cookieParser());
app.use(authMiddleWares.checkForAuthentication);
// Error handling middleware
app.use((err, req, res) => {
    // console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
//connect to mongoDb
connectMongoDb();
//Apis 
//test
app.get("/", (req, res) => {
    res.status(200).send("Hello world");
});
//add product
app.post("/products/add", (req, res) => {
    const productDetail = req.body;
    console.log("Product detail written");
});
// Routes
app.use('/auth/api', authRoutes);
app.use('/product/api', authMiddleWares.restrictTo(["NORMAL"]), productRoutes);
app.use('/payment/api', authMiddleWares.restrictTo(["NORMAL"]), paymentRoutes);
app.use('/cart/api', authMiddleWares.restrictTo(["NORMAL"]), cartRoutes);
app.use('/order/api', authMiddleWares.restrictTo(["NORMAL"]), orderRoutes);
// app.use('/product/api', restrictTo(["ADMIN"]), productRoutes);
// app.use('/payment/api', restrictTo(["ADMIN"]), paymentRoutes);
app.use('/', staticRoutes);
export default app;
