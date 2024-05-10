import session from '../service/auth';
const checkForAuthentication = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        req.user = null;
        if (!token)
            return next();
        const user = session.getSession(token);
        req.user = user;
        return next();
    }
    catch (error) {
        console.log("401 error occured");
        return res.status(401).json({
            error: "Unauthorized"
        });
    }
};
const restrictTo = (roles = []) => {
    return (req, res, next) => {
        if (!req.user)
            return res.status(400).json({
                error: "No user for this session found, Please Log In"
            });
        let user = req.user;
        if (!roles.includes(user.role))
            return res.status(401).json({
                error: "Unauthorized"
            });
        return next();
    };
};
export default {
    checkForAuthentication,
    restrictTo
};
