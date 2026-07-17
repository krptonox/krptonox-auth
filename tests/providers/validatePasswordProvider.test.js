import test from "node:test";
import assert from "node:assert/strict";

import { validatePasswordProvider } from "../../src/providers/validators/validatePasswordProvider.js";

test("accepts a valid password provider", () => {
    const provider = {
        async hash(password) {},
        async verify(password, hash) {},
    };

    const result = validatePasswordProvider(provider);

    assert.equal(result, provider);
});

test("rejects password provider missing verify()", () => {
    const provider = {
        async hash(password) {},
    };

    assert.throws(
        () => validatePasswordProvider(provider),
        /verify/
    );
});

test("rejects invalid password provider values", () => {
    assert.throws(() => validatePasswordProvider(null));
    assert.throws(() => validatePasswordProvider("ironpass"));
    assert.throws(() => validatePasswordProvider(123));
});