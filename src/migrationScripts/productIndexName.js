const mongoose = require('mongoose');
const config = require('../config');

// Connect to MongoDB
mongoose.connect(config.connection_url, { ...config.sslOptions })
  .then(() => {
    console.log('Connected to MongoDB');

    // Define schema
    const productSchema = new mongoose.Schema({
      name: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String },
      tags: [String],
    });

    // Define index on the 'name' field
    productSchema.index({ name: 1 });

    // Define model
    const Product = mongoose.model('Product', productSchema);

    // Create the index
    Product.createIndexes()
      .then(() => {
        console.log('Index created successfully');
      })
      .catch((err) => {
        console.error('Error creating index:', err);
      })
      .finally(() => {
        // Disconnect from MongoDB
        mongoose.disconnect();
      });
      
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
