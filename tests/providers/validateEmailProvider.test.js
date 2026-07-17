import test from "node:test";
import assert from "node:assert/strict";

import { validateEmailProvider } from "../../src/providers/validators/validateEmailProvider.js";

test("accepts a valid email provider", () => {
    const provider = {
        async sendEmail(message) {},
    };

    assert.equal(
        validateEmailProvider(provider),
        provider
    );
});

test("rejects email provider missing sendEmail()", () => {
    const provider = {};

    assert.throws(
        () => validateEmailProvider(provider),
        /sendEmail/
    );
});

test("rejects invalid email provider values", () => {
    assert.throws(() => validateEmailProvider(null));
    assert.throws(() => validateEmailProvider("nodemailer"));
    assert.throws(() => validateEmailProvider(123));
});