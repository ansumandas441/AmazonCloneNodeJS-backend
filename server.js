const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const {connectMongoDb} = require('./connections');
const cookieParser = require('cookie-parser');
const {restrictToLoggedinUsers} = require('./middlewares/authMiddleWares');
const authRoutes = require('./routes/authRouter'); 
const userRoutes = require('./routes/userRouter'); 
const productRoutes = require('./routes/productRouter');
const paymentRoutes = require('./routes/paymentRouter');
const staticRoutes = require('./routes/staticRouter');

const app = express();

//Middlewares
// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.resolve('views'));

// Content Security Policy middleware
app.use((req,res,next)=>{
    res.setHeader('Content-Security-Policy', 'default-src https:');
    next();
});

// JSON and CORS middlewares
app.use(express.json());  
app.use(cors());
app.use(cookieParser());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

//connect to mongoDb
connectMongoDb();

//Apis 
//test
app.get("/",(req,res)=>{
    res.status(200).send("Hello world");
});

//add product
app.post("/products/add",(req,res)=>{
    const productDetail = req.body;
    console.log("Product detail written");
});

// Routes
app.use('/auth/api', authRoutes);
app.use('/user/api', restrictToLoggedinUsers, userRoutes);
app.use('/product/api', productRoutes);
app.use('/payment/api', paymentRoutes);
app.use('/', staticRoutes); 

app.listen(config.port, ()=>console.log("listening to the port ",config.port));




