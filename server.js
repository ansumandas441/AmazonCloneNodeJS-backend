const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const app = express();
const port = 3001;

//Path to ssl certificate
const sslCertPath = '/home/ansuman/.ssh/X509-cert-2381793436636801278.pem';

// Connection URL
const connection_url = 'mongodb+srv://cluster0.cpyxhzh.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority';

// SSL options
const sslOptions = {
    ssl: true,
    tlsCertificateKeyFile: sslCertPath,
    serverApi: ServerApiVersion.v1,
  };

//Middlewares
app.use(express.json());
app.use(cors());

// mongoose.set()

mongoose.connect(connection_url,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    ...sslOptions,
}).then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful connection
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

//Api
app.get("/",(req,res)=>{
    res.status(200).send("Hello world")
});

app.post("/product/add",(req,res)=>{
    console.log("Product detail written");
});

app.listen(port, ()=>console.log("listening to the port ",port));




