import test from "node:test";
import assert from "node:assert/strict";

import { createAuth } from "../src/createAuth.js";


function createValidConfig() {
    // Fake user model for configuration validation
    class UserModel {}

    return {
        database: {
            provider: {
                async findUserBy(criteria) {
                    return null;
                },

                async findUserById(id) {
                    return null;
                },

                async createUser(userData) {
                    return userData;
                },

                async updateUser(id, updates) {
                    return updates;
                },
            },

            userModel: UserModel,
        },

        password: {
            provider: {
                async hash(password) {
                    return `hashed:${password}`;
                },

                async verify(password, hash) {
                    return hash === `hashed:${password}`;
                },
            },
        },

        token: {
            provider: {
                async sign(payload) {
                    return "fake-token";
                },

                async verify(token) {
                    return {};
                },
            },

            accessSecret: "test-access-secret",
            refreshSecret: "test-refresh-secret",
        },
    };
}


test("createAuth initializes the framework successfully", () => {
    const config = createValidConfig();

    const auth = createAuth(config);

    assert.ok(auth);

    assert.ok(auth.config);

    assert.ok(auth.providers);
});


test("createAuth resolves and freezes configuration", () => {
    const config = createValidConfig();

    const auth = createAuth(config);

    assert.equal(
        Object.isFrozen(auth.config),
        true
    );
});


test("createAuth initializes required providers", () => {
    const config = createValidConfig();

    const auth = createAuth(config);

    assert.equal(
        auth.providers.get("database"),
        auth.config.database.provider
    );

    assert.equal(
        auth.providers.get("password"),
        auth.config.password.provider
    );

    assert.equal(
        auth.providers.get("token"),
        auth.config.token.provider
    );
});


test("createAuth does not register email when not configured", () => {
    const config = createValidConfig();

    const auth = createAuth(config);

    assert.equal(
        auth.providers.has("email"),
        false
    );
});


test("createAuth fails when a provider violates its contract", () => {
    const config = createValidConfig();

    config.password.provider = {
        async hash(password) {
            return `hashed:${password}`;
        },

        // verify() intentionally missing
    };

    assert.throws(
        () => createAuth(config),
        /verify/
    );
});