import test from "node:test";
import assert from "node:assert/strict";

import { hashRefreshToken } from "../../../src/core/utils/hashRefreshToken.js";

test("hashRefreshToken returns deterministic hash", () => {
    const hash1 = hashRefreshToken("abc");
    const hash2 = hashRefreshToken("abc");

    assert.equal(hash1, hash2);
});

test("different refresh tokens generate different hashes", () => {
    const hash1 = hashRefreshToken("abc");
    const hash2 = hashRefreshToken("xyz");

    assert.notEqual(hash1, hash2);
});