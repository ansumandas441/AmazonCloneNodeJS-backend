import mongoose from 'mongoose';
import config from './config.js';
import { ServerApiVersion }  from 'mongodb';

const connectMongoDb = async () => {
    return mongoose.connect(config.connection_url, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            ...config.sslOptions,
            serverApi: ServerApiVersion.v1, // Adjust this as per your MongoDB version
        }).then(() => {
            console.log('Connected to MongoDB');
            // Start the server after successful connection
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        });
};

export default connectMongoDb;