import { timingSafeEqual } from "node:crypto";
import { hashRefreshToken } from "./hashRefreshToken.js";

export function compareRefreshHash(
    refreshToken,
    storedHash
) {
    const computedHash =
        hashRefreshToken(refreshToken);

    return timingSafeEqual(
        Buffer.from(computedHash),
        Buffer.from(storedHash)
    );
}