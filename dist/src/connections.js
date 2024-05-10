import mongoose from 'mongoose';
import config from './config';
const connectMongoDb = async () => {
    return mongoose.connect(config.connection_url, {
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
};
export default connectMongoDb;
