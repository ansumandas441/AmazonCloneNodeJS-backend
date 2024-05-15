import { connect, Schema, model, disconnect } from 'mongoose';

import { connection_url, sslOptions } from '../';

// Connect to MongoDB
connect(connection_url, { ...sslOptions })
  .then(() => {
    console.log('Connected to MongoDB');

    // Define schema
    const productSchema = new Schema({
      name: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String },
      tags: [String],
    });

    // Define index on the 'name' field
    productSchema.index({ name: 1 });

    // Define model
    const Product = model('Product', productSchema);

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
        disconnect();
      });
      
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
