export const DATABASE_PROVIDER_CONTRACT = Object.freeze({
    // User operations
    findUserBy: "findUserBy(criteria)",
    findUserById: "findUserById(id)",
    createUser: "createUser(userData)",
    updateUser: "updateUser(id, updates)",

    // Session operations
    createSession: "createSession(sessionData)",
    findSession: "findSession(criteria)",
    findSessionsByUser: "findSessionsByUser(userId)",
    updateSession: "updateSession(id, updates)",
    deleteSession: "deleteSession(id)",
    deleteAllSessions: "deleteAllSessions(userId)",
});
