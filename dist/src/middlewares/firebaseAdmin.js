import admin, { initializeApp, credential as _credential } from 'firebase-admin';
import serviceAccount from '../../certificates/service_account.json';
initializeApp({
    credential: _credential.cert(serviceAccount)
});
export default admin;
