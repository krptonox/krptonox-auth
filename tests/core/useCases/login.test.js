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
            return hash === `hashed:${password}`;
        },
    };

    const tokenService = {
        async generateAccessToken(payload) {
            return `access:${payload.sub}`;
        },

        async generateRefreshToken(payload) {
            return `refresh:${payload.sub}`;
        },
    };

    const sessionService = {
        createdSession: null,
        updatedSession: null,

        async createSession(session) {
            this.createdSession = session;

            return {
                id: "session-1",
                ...session,
            };
        },

        async updateSession(id, update) {
            this.updatedSession = {
                id,
                ...update,
            };
        },
    };

    const sessionConfig = {
        maxAge: 30 * 24 * 60 * 60 * 1000,
    };

    return {
        userService,
        passwordService,
        tokenService,
        sessionService,
        sessionConfig,
    };
}