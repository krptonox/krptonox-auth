import test from "node:test";
import assert from "node:assert/strict";

import { validateDatabaseProvider } from "../../src/providers/validators/validateDatabaseProvider.js";

test("accepts a valid database provider", () => {
    const provider = {
        // User methods
        async findUserBy(criteria) {},
        async findUserById(id) {},
        async createUser(userData) {},
        async updateUser(id, updates) {},

        // Session methods
        async createSession(sessionData) {},
        async findSession(criteria) {},
        async findSessionsByUser(userId) {},
        async updateSession(id, updates) {},
        async deleteSession(id) {},
        async deleteAllSessions(userId) {},
    };

    assert.equal(
        validateDatabaseProvider(provider),
        provider
    );
});

test("rejects incomplete database provider", () => {
    const provider = {
        // User methods
        async findUserBy(criteria) {},
        async findUserById(id) {},
        async createUser(userData) {},
        async updateUser(id, updates) {},

        // Session methods
        async createSession(sessionData) {},
        // findSession intentionally missing
        async findSessionsByUser(userId) {},
        async updateSession(id, updates) {},
        async deleteSession(id) {},
        async deleteAllSessions(userId) {},
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