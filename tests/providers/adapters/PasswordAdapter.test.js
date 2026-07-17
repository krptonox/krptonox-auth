import test from "node:test";
import assert from "node:assert/strict";

import { PasswordAdapter } from "../../../src/providers/adapters/PasswordAdapter.js";

test("PasswordAdapter delegates hash() to provider", async () => {
    const fakeProvider = {
        async hash(password) {
            return `hashed:${password}`;
        },

        async verify(password, hash) {
            return hash === `hashed:${password}`;
        },
    };

    const adapter = new PasswordAdapter(fakeProvider);

    const result = await adapter.hash("secret");

    assert.equal(result, "hashed:secret");
});

test("PasswordAdapter delegates verify() to provider", async () => {
    const fakeProvider = {
        async hash(password) {
            return `hashed:${password}`;
        },

        async verify(password, hash) {
            return hash === `hashed:${password}`;
        },
    };

    const adapter = new PasswordAdapter(fakeProvider);

    const result = await adapter.verify(
        "secret",
        "hashed:secret"
    );

    assert.equal(result, true);
});

test("PasswordAdapter rejects invalid providers", () => {
    const invalidProvider = {
        async hash(password) {
            return password;
        },
        // verify() missing
    };

    assert.throws(
        () => new PasswordAdapter(invalidProvider),
        /verify/
    );
});