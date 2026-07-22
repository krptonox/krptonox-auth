export function createSessionEntity({
    userId,
    refreshTokenHash,
    createdAt,
    expiresAt,
    lastUsedAt = null,
    revokedAt = null,
    ip = null,
    userAgent = null,
    device = null,
}) {
    return Object.freeze({
        userId,
        refreshTokenHash,
        createdAt,
        expiresAt,
        lastUsedAt,
        revokedAt,
        ip,
        userAgent,
        device,
    });
}