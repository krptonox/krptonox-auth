import { hashRefreshToken } from "../utils/hashRefreshToken.js";
import { compareRefreshHash } from "../utils/compareRefreshHash.js";

export class RefreshTokenService {
    hash(refreshToken) {
        return hashRefreshToken(refreshToken);
    }

    compare(refreshToken, storedHash) {
        return compareRefreshHash(
            refreshToken,
            storedHash
        );
    }

    rotate(refreshToken) {
        return this.hash(refreshToken);
    }
}