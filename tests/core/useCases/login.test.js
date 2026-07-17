import test from "node:test";
import assert from "node:assert/strict";

import {
    createLogin
} from "../../../src/core/useCases/login.js";


function createServices() {
    const userService = {
        async findUserBy({ email }) {
            return {
                id: "user-1",
                email,
                password: "hashed:SecurePassword123!",
            };
        },
    };


    const passwordService = {
        async verify(password, hash) {
            return (
                hash ===
                `hashed:${password}`
            );
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


test("login authenticates user and returns access token", async () => {
    const services = createServices();

    const login = createLogin(services);


    const result = await login({
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
        result.accessToken,
        "token:user-1"
    );


    // Password hash must not leak
    assert.equal(
        result.user.password,
        undefined
    );
});


test("login rejects when user does not exist", async () => {
    const services = createServices();


    services.userService.findUserBy =
        async () => null;


    const login = createLogin(services);


    await assert.rejects(
        () =>
            login({
                email: "unknown@example.com",
                password: "password",
            }),

        /Invalid email or password/
    );
});


test("login rejects when password is incorrect", async () => {
    const services = createServices();


    services.passwordService.verify =
        async () => false;


    const login = createLogin(services);


    await assert.rejects(
        () =>
            login({
                email: "user@example.com",
                password: "wrong-password",
            }),

        /Invalid email or password/
    );
});