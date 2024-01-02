const authSessionToUserMap = new Map();
  
const setSession = (sessionId, user) => {
    authSessionToUserMap.set(sessionId, user);
};

const getSession = (sessionId) => {
    return authSessionToUserMap.get(sessionId);
};

const deleteSession = (sessionId) => {
    if (authSessionToUserMap.has(sessionId)) {
        authSessionToUserMap.delete(sessionId);
    }
};

const isSessionIdValid = (sessionId) => {
    return authSessionToUserMap.has(sessionId);
};

module.exports = {
    setSession,
    getSession,
    deleteSession,
    isSessionIdValid,
};