const authSessionToUserMap = new Map();
  
const setSessionId = (sessionId, user) => {
    authSessionToUserMap.set(sessionId, user);
};

const getSessionId = (sessionId) => {
    authSessionToUserMap.get(sessionId);
};

module.exports = {
    setSessionId,
    getSessionId,
};