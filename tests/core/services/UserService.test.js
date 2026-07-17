import test from "node:test";
import assert from "node:assert/strict";

import { UserService } from "../../../src/core/services/UserService.js";


function createDatabaseProvider() {
    return {
        async findUserBy(criteria) {
            return {
                id: "user-1",
                ...criteria,
            };
        },

        async findUserById(id) {
            return {
                id,
                email: "user@example.com",
            };
        },

        async createUser(userData) {
            return {
                id: "user-1",
                ...userData,
            };
        },

        async updateUser(id, updates) {
            return {
                id,
                ...updates,
            };
        },
    };
}


test("UserService finds user by criteria", async () => {
    const provider = createDatabaseProvider();

    const userService = new UserService(provider);

    const user = await userService.findUserBy({
        email: "user@example.com",
    });

    assert.equal(
        user.email,
        "user@example.com"
    );
});


test("UserService finds user by id", async () => {
    const provider = createDatabaseProvider();

    const userService = new UserService(provider);

    const user = await userService.findUserById(
        "user-1"
    );

    assert.equal(
        user.id,
        "user-1"
    );
});


test("UserService creates a user", async () => {
    const provider = createDatabaseProvider();

    const userService = new UserService(provider);

    const user = await userService.createUser({
        email: "user@example.com",
    });

    assert.equal(
        user.email,
        "user@example.com"
    );

    assert.equal(
        user.id,
        "user-1"
    );
});


test("UserService updates a user", async () => {
    const provider = createDatabaseProvider();

    const userService = new UserService(provider);

    const user = await userService.updateUser(
        "user-1",
        {
            email: "updated@example.com",
        }
    );

    assert.equal(
        user.id,
        "user-1"
    );

    assert.equal(
        user.email,
        "updated@example.com"
    );
});