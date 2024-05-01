const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config');



const {
    connectMongoDb
} = require('./connections');
const cookieParser = require('cookie-parser');
const {
    checkForAuthentication,
    restrictTo
} = require('./middlewares/authMiddleWares');
const authRoutes = require('./routes/authRouter');
const productRoutes = require('./routes/productRouter');
const paymentRoutes = require('./routes/paymentRouter');
const cartRoutes = require('./routes/cartRouter');
const staticRoutes = require('./routes/staticRouter');
const orderRoutes = require('./routes/orderRouter');
const openApiDocumentation = require('./openApiDocumentation');
const rateLimiter = require('./middlewares/rateLimiter');

const app = express();

//
app.use(rateLimiter);

//setting up documentation
app.use('/dev/docs', openApiDocumentation);

//Middlewares
// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.resolve('views'));

// Content Security Policy middleware
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 'default-src https:');
    next();
});

// JSON and CORS middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(checkForAuthentication);

// Error handling middleware
app.use((err, req, res, next) => {
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
app.use('/product/api', restrictTo(["NORMAL"]), productRoutes);
app.use('/payment/api', restrictTo(["NORMAL"]), paymentRoutes);
app.use('/cart/api', restrictTo(["NORMAL"]), cartRoutes);
app.use('/order/api', restrictTo(["NORMAL"]), orderRoutes);
// app.use('/product/api', restrictTo(["ADMIN"]), productRoutes);
// app.use('/payment/api', restrictTo(["ADMIN"]), paymentRoutes);
app.use('/', staticRoutes);

app.listen(config.port, () => console.log("listening to the port ", config.port));