const admin = require('firebase-admin');
var serviceAccount = require('../../certificates/service_account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});  

module.exports = admin;