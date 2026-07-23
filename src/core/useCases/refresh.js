import { isSessionExpired }
from "../utils/isSessionExpired.js";

import SessionExpiredError
from "../../errors/auth/SessionExpiredError.js";

import SessionNotFoundError
from "../../errors/auth/SessionNotFoundError.js";

import ReplayAttackError
from "../../errors/auth/ReplayAttackError.js";

export function createRefresh({

    tokenService,

    sessionService,

    refreshTokenService,

}) {

    return async function refresh({

        refreshToken,

    }) {

        const payload =
            await tokenService.verifyRefreshToken(
                refreshToken
            );

        const session =
            await sessionService.findSession({

                id: payload.sessionId,

            });

        if (!session) {
            throw new SessionNotFoundError();
        }

        if (
            isSessionExpired(session)
        ) {

            await sessionService.deleteSession(
                session.id
            );

            throw new SessionExpiredError();
        }

        const valid =
            refreshTokenService.compare(
                refreshToken,
                session.refreshTokenHash
            );

        if (!valid) {

            await sessionService.deleteSession(
                session.id
            );

            throw new ReplayAttackError();
        }

        const accessToken =
            await tokenService.generateAccessToken({

                sub: payload.sub,

                sessionId: session.id,

            });

        const newRefreshToken =
            await tokenService.generateRefreshToken({

                sub: payload.sub,

                sessionId: session.id,

            });

        await sessionService.updateSession(
            session.id,
            {

                refreshTokenHash:
                    refreshTokenService.hash(
                        newRefreshToken
                    ),

                lastUsedAt:
                    new Date(),

            }
        );

        return {

            accessToken,

            refreshToken:
                newRefreshToken,

        };
    };
}