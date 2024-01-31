const jwt = require('jsonwebtoken');
const secret = "NewSecret*()$";

const setSession = (user) => {
    if(!user) {
        return null;
    }
    try {
        return jwt.sign({
            _id:user._id,
            email:user.email,
            role:user.role
        }, 
        secret,
        {});
    } catch (error) {
        console.log("Error getting session", error);
        return null;
    }
};

const getSession = (token) => {
    if (!token) {
        return null;
    }
    try {
        return jwt.verify(token, secret);
    } catch(error) { 
        console.log("Error getting session", error);
        return null;
    }
};

module.exports = {
    setSession,
    getSession,
};