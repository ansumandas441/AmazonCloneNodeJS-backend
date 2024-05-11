import config from './config.js';
import app from './app.js';

app.listen(config.port, () => console.log("listening to the port ", config.port));