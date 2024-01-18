const jwt = require('jsonwebtoken');
const secret = "NewSecret*()$";

const setSession = (user) => {
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
        return res.status(500).json({error:"Internal server error"});
    }
};

const getSession = (token) => {
    if (!token) {
        return res.status(400).json({error:"Invalid token"});
    }
    try {
        return jwt.verify(token, secret);
    } catch(error) { 
        console.log("Error getting session", error);
        return res.status(500).json({error:"Internal server error"});
    }
};

const deleteSession = (sessionId) => {
    console.log("deleteSession");
};

const isSessionIdValid = (sessionId) => {
    console.log("validSession");
};

module.exports = {
    setSession,
    getSession,
    deleteSession,
    isSessionIdValid,
};