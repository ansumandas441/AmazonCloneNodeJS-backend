const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
// Define the schema for TestModel
const testSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Add more fields as needed
  });

const credentials = '/home/ansuman/.ssh/X509-cert-2381793436636801278.pem'; // Path to X.509 certificate

mongoose.connect('mongodb+srv://cluster0.cpyxhzh.mongodb.net/testDB', {
  ssl: true,
  tlsCertificateKeyFile: credentials,
  serverApi: ServerApiVersion.v1,
})
.then(() => {
  console.log('Connected to MongoDB using Mongoose');

  // Access your database models, perform operations, etc.
  const TestModel = mongoose.model('TestModel', testSchema);

  TestModel.countDocuments().then(()=>{
    console.log('Document count:', docCount);
}).catch(()=>{
    console.error('Error counting documents:');
}).finally(()=>{
    mongoose.disconnect(); // Close the connection after operation
});
});