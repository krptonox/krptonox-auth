import test from "node:test";
import assert from "node:assert/strict";

import { validateTokenProvider } from "../../src/providers/validators/validateTokenProvider.js";

test("accepts a valid token provider", () => {
    const provider = {
        async sign(payload) {},
        async verify(token) {},
    };

    assert.equal(
        validateTokenProvider(provider),
        provider
    );
});

test("rejects token provider missing verify()", () => {
    const provider = {
        async sign(payload) {},
    };

    assert.throws(
        () => validateTokenProvider(provider),
        /verify/
    );
});

test("rejects invalid token provider values", () => {
    assert.throws(() => validateTokenProvider(null));
    assert.throws(() => validateTokenProvider("jwt"));
    assert.throws(() => validateTokenProvider(123));
});