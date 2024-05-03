const jwt = require('jsonwebtoken');
const secret = "NewSecret*()$";

const setSession = (user) => {
    if (!user) {
        return null;
    }
    try {
        return jwt.sign({
                _id: user._id,
                email: user.email,
                role: user.role
            },
            secret, {});
    } catch (error) {
        console.log("Error getting setSession", error);
        throw error;
    }
};

const getSession = (token) => {
    if (!token) {
        return null;
    }
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.log("Error getting getSession", error);
        throw error;
    }
};

module.exports = {
    setSession,
    getSession,
};