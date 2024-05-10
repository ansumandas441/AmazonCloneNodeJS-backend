// import admin, { initializeApp, credential as _credential } from 'firebase-admin';
import admin from 'firebase-admin'
import serviceAccount from '../../certificates/service_account.json';

if (serviceAccount) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
    });  
} else {
    console.error('Service account is undefined or null');
}
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
// });  


export default admin;