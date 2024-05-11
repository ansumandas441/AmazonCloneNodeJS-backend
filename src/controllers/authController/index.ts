import registration from './registration.js';
import otpVerification from './otpVerification.js';
import login from './login.js';
import logout from './logout.js';

const authController = {
    handleUserRegistration: registration,
    verifyOtp: otpVerification,
    handleUserLogin: login,
    handleUserLogout: logout
}

export default authController;