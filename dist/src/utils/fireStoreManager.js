import admin from '../middlewares/firebaseAdmin';
// Initiliaze firestore database
const db = admin.firestore();
const fireStoreManager = {
    saveToOtp: async (email, username, hashedPassword, otp) => {
        // 1 minutes
        console.log('email', email);
        console.log('otp', otp);
        var expiryDate = Date.now() + 90000;
        console.log('expiryDate', expiryDate);
        await db.collection("otps").doc(email).set({
            email: email,
            username: username,
            hashedPassword: hashedPassword,
            otp: otp,
            expiry: expiryDate
        });
    },
    fetchOtp: async (email) => {
        // Retrieve the OTP details from the database
        const emailOtp = await db.collection("otps").doc(email).get();
        // return fetched otp
        return emailOtp;
    }
};
export default fireStoreManager;
