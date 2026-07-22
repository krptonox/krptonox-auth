import { sanitizeUser } from "../utils/sanitizeUser.js";
import { createSessionEntity } from "../models/session.js";
import { hashRefreshToken } from "../utils/hashRefreshToken.js";

export function createLogin({
    userService,
    passwordService,
    tokenService,
    sessionService,
    sessionConfig,
}) {
    return async function login({
        email,
        password,
    }) {
        // 1. Find user
        const user = await userService.findUserBy({
            email,
        });

        if (!user) {
            throw new Error(
                "Invalid email or password"
            );
        }

        // 2. Verify password
        const isPasswordValid =
            await passwordService.verify(
                password,
                user.password
            );

        if (!isPasswordValid) {
            throw new Error(
                "Invalid email or password"
            );
        }

        // 3. Create session entity
        const sessionEntity =
            createSessionEntity({
                userId: user.id,
                refreshTokenHash: null,
                createdAt: new Date(),
                expiresAt: new Date(
                    Date.now() +
                        sessionConfig.maxAge
                ),
            });

        // 4. Persist session
        const session =
            await sessionService.createSession(
                sessionEntity
            );

        // 5. Generate access token
        const accessToken =
            await tokenService.generateAccessToken({
                sub: user.id,
                sessionId: session.id,
            });

        // 6. Generate refresh token
        const refreshToken =
            await tokenService.generateRefreshToken({
                sub: user.id,
                sessionId: session.id,
            });

        // 7. Hash refresh token
        const refreshTokenHash =
            hashRefreshToken(refreshToken);

        // 8. Store refresh token hash
        await sessionService.updateSession(
            session.id,
            {
                refreshTokenHash,
            }
        );

        // 9. Return response
        return {
            user: sanitizeUser(user),
            accessToken,
            refreshToken,
        };
    };
}