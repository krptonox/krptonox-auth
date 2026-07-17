import test from "node:test";
import assert from "node:assert/strict";

import { createAuth } from "../src/createAuth.js";


function createValidConfig() {

    class UserModel {}

    return {

        database: {

            provider: {

                async findUserBy(criteria) {
                    return null;
                },


                async findUserById(id) {

                    return {
                        id,
                        email: "user@example.com",
                        password: "hashed:SecurePassword123!",
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

                    return {
                        userId: "user-1",
                    };

                },

            },


            accessSecret: "access-secret",

            refreshSecret: "refresh-secret",

        },

    };

}



// Login requires existing user
function createLoginConfig() {

    const config = createValidConfig();


    config.database.provider.findUserBy =
        async ({ email }) => {

            return {

                id: "user-1",

                email,

                password: "hashed:SecurePassword123!",

            };

        };


    return config;

}



// -------------------------
// createAuth tests
// -------------------------


test("createAuth initializes successfully", () => {

    const auth = createAuth(
        createValidConfig()
    );


    assert.ok(auth);


    assert.equal(
        typeof auth.signup,
        "function"
    );


    assert.equal(
        typeof auth.login,
        "function"
    );

});



test("createAuth freezes resolved configuration", () => {

    const auth = createAuth(
        createValidConfig()
    );


    assert.equal(
        Object.isFrozen(auth.config),
        true
    );

});



test("createAuth registers required providers", () => {

    const auth = createAuth(
        createValidConfig()
    );


    assert.equal(
        auth.providers.has("database"),
        true
    );


    assert.equal(
        auth.providers.has("password"),
        true
    );


    assert.equal(
        auth.providers.has("token"),
        true
    );

});



// -------------------------
// signup integration
// -------------------------


test("auth.signup works through full pipeline", async () => {

    const auth = createAuth(
        createValidConfig()
    );


    const result =
        await auth.signup({

            email: "new@example.com",

            password: "SecurePassword123!",

        });



    assert.equal(
        result.user.id,
        "user-1"
    );


    assert.equal(
        result.user.email,
        "new@example.com"
    );


    assert.equal(
        result.user.password,
        undefined
    );


    assert.equal(
        result.accessToken,
        "fake-token"
    );

});



// -------------------------
// login integration
// -------------------------


test("auth.login works through full pipeline", async () => {

    const auth = createAuth(
        createLoginConfig()
    );


    const result =
        await auth.login({

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
        "fake-token"
    );

});



// -------------------------
// provider failure
// -------------------------


test("createAuth rejects invalid password provider", () => {

    const config =
        createValidConfig();


    config.password.provider = {

        async hash(password) {

            return password;

        }

    };


    assert.throws(

        () => createAuth(config),

        /verify/

    );

});