const {
    getSession
} = require('../service/auth');

const checkForAuthentication = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        req.user = null;
        console.log("Token: ", token);
        if (!token) return next();
        const user = getSession(token);
        console.log("User: ", user);
        req.user = user;
        return next();
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}


const restrictTo = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) return res.status(400).json({
            error: "No user for this session found, Please Log In"
        });
        console.log(`roles: `, roles);
        console.log(`req.user.role : `, req.user.role);
        if (!roles.includes(req.user.role)) return res.status(401).json({
            error: "Unauthorized"
        });
        return next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo
}