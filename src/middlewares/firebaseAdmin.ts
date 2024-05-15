// import admin, { initializeApp, credential as _credential } from 'firebase-admin';
import admin from 'firebase-admin';

import serviceAccount from '../../certificates/service_account.json' with { type: 'json' };

if (serviceAccount) {
  // console.log(serviceAccount); // Add this line to log the service account details
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
} else {
  console.error('Service account is undefined or null');
}

export default admin;