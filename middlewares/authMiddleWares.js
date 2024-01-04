const {getSession} = require('../service/auth');

const restrictToLoggedinUsers = (req, res, next)=>{
    console.log(req);
    const sessionId = req.cookie?.uid;
    if (!sessionId) return res.status(400).json({error:"Please Log In"});
    const user = getSession(sessionId);
    if (!user) return res.status(404).json({error:"No user for this session found, please login"})
    req.user = user;
    next();
};

module.exports = {
    restrictToLoggedinUsers,
}