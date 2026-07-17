import test from "node:test";
import assert from "node:assert/strict";

import {
    createSignup
} from "../../../src/core/useCases/signup.js";


function createServices() {
    const userService = {
        async findUserBy() {
            return null;
        },

        async createUser(userData) {
            return {
                id: "user-1",
                ...userData,
            };
        },
    };

    const passwordService = {
        async hash(password) {
            return `hashed:${password}`;
        },
    };

    const tokenService = {
        async sign(payload) {
            return `token:${payload.userId}`;
        },
    };

    return {
        userService,
        passwordService,
        tokenService,
    };
}


test("signup creates a new user and returns access token", async () => {
    const services = createServices();

    const signup = createSignup(services);

    const result = await signup({
        email: "user@example.com",
        password: "SecurePassword123!",
    });

    assert.equal(
        result.user.id,
        "user-1"
    );

    assert.equal(
        result.user.email,
        "user@example.com"
    );

    assert.equal(
        result.user.password,
        undefined
    );

    assert.equal(
        result.accessToken,
        "token:user-1"
    );
});


test("signup rejects when user already exists", async () => {
    const services = createServices();

    services.userService.findUserBy =
        async () => ({
            id: "existing-user",
            email: "user@example.com",
        });

    const signup = createSignup(services);

    await assert.rejects(
        () =>
            signup({
                email: "user@example.com",
                password: "SecurePassword123!",
            }),
        /User already exists/
    );
});


test("signup hashes password before creating user", async () => {
    let createdUserData;

    const services = createServices();

    services.userService.createUser =
        async (userData) => {
            createdUserData = userData;

            return {
                id: "user-1",
                ...userData,
            };
        };

    const signup = createSignup(services);

    await signup({
        email: "user@example.com",
        password: "plain-password",
    });

    assert.equal(
        createdUserData.password,
        "hashed:plain-password"
    );

    assert.notEqual(
        createdUserData.password,
        "plain-password"
    );
});