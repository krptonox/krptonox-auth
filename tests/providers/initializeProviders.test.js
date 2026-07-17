import test from "node:test";
import assert from "node:assert/strict";

import { initializeProviders } from "../../src/providers/initializeProviders.js";


function createValidConfig() {
    return {
        database: {
            provider: {
                async findUserBy(criteria) {},
                async findUserById(id) {},
                async createUser(userData) {},
                async updateUser(id, updates) {},
            },
        },

        password: {
            provider: {
                async hash(password) {},
                async verify(password, hash) {},
            },
        },

        token: {
            provider: {
                async sign(payload) {},
                async verify(token) {},
            },
        },
    };
}


test("initializes and registers required providers", () => {
    const config = createValidConfig();

    const registry = initializeProviders(config);

    assert.equal(
        registry.get("database"),
        config.database.provider
    );

    assert.equal(
        registry.get("password"),
        config.password.provider
    );

    assert.equal(
        registry.get("token"),
        config.token.provider
    );
});


test("registers optional email provider when provided", () => {
    const config = createValidConfig();

    config.email = {
        provider: {
            async sendEmail(message) {},
        },
    };

    const registry = initializeProviders(config);

    assert.equal(
        registry.get("email"),
        config.email.provider
    );
});


test("does not register email provider when not provided", () => {
    const config = createValidConfig();

    const registry = initializeProviders(config);

    assert.equal(
        registry.has("email"),
        false
    );
});


test("rejects invalid password provider", () => {
    const config = createValidConfig();

    config.password.provider = {
        async hash(password) {},
        // verify() missing
    };

    assert.throws(
        () => initializeProviders(config),
        /verify/
    );
});


test("rejects invalid token provider", () => {
    const config = createValidConfig();

    config.token.provider = {
        async sign(payload) {},
        // verify() missing
    };

    assert.throws(
        () => initializeProviders(config),
        /verify/
    );
});


test("rejects invalid database provider", () => {
    const config = createValidConfig();

    config.database.provider = {
        async findUserBy(criteria) {},
        // other required methods missing
    };

    assert.throws(
        () => initializeProviders(config)
    );
});


test("rejects invalid optional email provider", () => {
    const config = createValidConfig();

    config.email = {
        provider: {},
    };

    assert.throws(
        () => initializeProviders(config),
        /sendEmail/
    );
});