const config = require('./config');
const app = require('./app');

app.listen(config.port, () => console.log("listening to the port ", config.port));