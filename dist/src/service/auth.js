import { sign, verify } from 'jsonwebtoken';
const secret = "NewSecret*()$";
const setSession = (user) => {
    if (!user) {
        return null;
    }
    try {
        return sign({
            _id: user._id,
            email: user.email,
            role: user.role
        }, secret, {});
    }
    catch (error) {
        console.log("Error getting setSession", error);
        throw error;
    }
};
const getSession = (token) => {
    if (!token) {
        return null;
    }
    try {
        return verify(token, secret);
    }
    catch (error) {
        console.log("Error getting getSession", error);
        throw error;
    }
};
export default {
    setSession,
    getSession,
};
