const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const fs = require('fs');
const path = require('path');
const app = express();
const {connectMongoDb} = require('./connections');
const userRoutes = require('./routes/userRouter'); 
const staticRoutes = require('./routes/staticRouter');

//Middlewares
app.set("view engine", "ejs");
app.set("views", path.resolve('views'));
app.use((req,res,next)=>{
    res.setHeader('Content-Security-Policy', 'default-src https:');
    next();
});
app.use(express.json());
app.use(cors());
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
app.use('/user', userRoutes);
app.use('/', staticRoutes);

app.listen(config.port, ()=>console.log("listening to the port ",config.port));




