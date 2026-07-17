import test from "node:test";
import assert from "node:assert/strict";

import { TokenService } from "../../../src/core/services/TokenService.js";


function createTokenProvider() {
    return {
        async sign(payload, options) {
            return {
                token: "fake-token",
                payload,
                options,
            };
        },

        async verify(token, options) {
            if (token === "valid-token") {
                return {
                    id: "user-1",
                };
            }

            throw new Error("Invalid token");
        },
    };
}


test("TokenService signs a token using token provider", async () => {
    const provider = createTokenProvider();

    const tokenService = new TokenService(provider);

    const result = await tokenService.sign(
        {
            id: "user-1",
        },
        {
            expiresIn: "15m",
        }
    );

    assert.equal(
        result.token,
        "fake-token"
    );

    assert.equal(
        result.payload.id,
        "user-1"
    );
});


test("TokenService verifies a valid token", async () => {
    const provider = createTokenProvider();

    const tokenService = new TokenService(provider);

    const payload = await tokenService.verify(
        "valid-token"
    );

    assert.equal(
        payload.id,
        "user-1"
    );
});


test("TokenService rejects an invalid token", async () => {
    const provider = createTokenProvider();

    const tokenService = new TokenService(provider);

    await assert.rejects(
        () => tokenService.verify("invalid-token"),
        /Invalid token/
    );
});