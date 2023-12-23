const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const app = express();
const port = 3001;

//Middlewares
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

// mongoose.set()

mongoose.connect(config.connection_url,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    ...config.sslOptions,
}).then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful connection
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

//Api
app.get("/",(req,res)=>{
    res.status(200).send("Hello world");
    // console.log('SSL_CERT_PATH:', process.env.SSL_CERT_PATH);
    // console.log('path:',config.tlsCertificateKeyFile)
});

//add product
app.post("/products/add",(req,res)=>{
    const productDetail = req.body;
    console.log("Product detail written");
});

app.listen(port, ()=>console.log("listening to the port ",port));




