import test from "node:test";
import assert from "node:assert/strict";

import { validateDatabaseProvider } from "../../src/providers/validators/validateDatabaseProvider.js";

test("accepts a valid database provider", () => {
    const provider = {
        async findUserBy(criteria) {},
        async findUserById(id) {},
        async createUser(userData) {},
        async updateUser(id, updates) {},
    };

    assert.equal(
        validateDatabaseProvider(provider),
        provider
    );
});

test("rejects incomplete database provider", () => {
    const provider = {
        async findUserBy(criteria) {},
        async createUser(userData) {},
    };

    assert.throws(
        () => validateDatabaseProvider(provider)
    );
});

test("rejects invalid database provider values", () => {
    assert.throws(() => validateDatabaseProvider(null));
    assert.throws(() => validateDatabaseProvider("mongoose"));
    assert.throws(() => validateDatabaseProvider(123));
});