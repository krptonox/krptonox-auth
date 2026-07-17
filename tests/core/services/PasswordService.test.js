import test from "node:test";
import assert from "node:assert/strict";

import { PasswordService } from "../../../src/core/services/PasswordService.js";


function createPasswordProvider() {
    return {
        async hash(password) {
            return `hashed:${password}`;
        },

        async verify(password, hash) {
            return hash === `hashed:${password}`;
        },
    };
}


test("PasswordService hashes a password using password provider", async () => {
    const provider = createPasswordProvider();

    const passwordService = new PasswordService(provider);

    const hash = await passwordService.hash("secret");

    assert.equal(
        hash,
        "hashed:secret"
    );
});


test("PasswordService verifies a valid password", async () => {
    const provider = createPasswordProvider();

    const passwordService = new PasswordService(provider);

    const result = await passwordService.verify(
        "secret",
        "hashed:secret"
    );

    assert.equal(result, true);
});


test("PasswordService rejects an invalid password", async () => {
    const provider = createPasswordProvider();

    const passwordService = new PasswordService(provider);

    const result = await passwordService.verify(
        "wrong-password",
        "hashed:secret"
    );

    assert.equal(result, false);
});