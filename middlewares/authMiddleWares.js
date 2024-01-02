const {isSessionValid} = require('../service/auth');

const restrictToLoggedinUsers = (req, res, next)=>{
    console.log(req);
    const sessionId = req.cookie?.uid;
    if (!sessionId || !isSessionValid(sessionId)) return res.status(400).send("Please Log In");
    req.user = user;
    next();
};

module.exports = {
    restrictToLoggedinUsers,
}