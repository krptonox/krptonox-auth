export function sanitizeUser(user) {
    if (!user) {
        return user;
    }

    const {
        password,
        passwordHash,
        ...safeUser
    } = user;

    return safeUser;
}