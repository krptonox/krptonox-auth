import test from "node:test";
import assert from "node:assert/strict";

import { SessionService } from "../../../src/core/services/SessionService.js";

function createProvider() {
    return {
        async createSession(session) {
            return session;
        },

        async findSession(criteria) {
            return {
                id: "session-1",
                ...criteria,
            };
        },

        async updateSession(id, updates) {
            return {
                id,
                ...updates,
            };
        },

        async deleteSession(id) {
            return {
                success: true,
                id,
            };
        },

        async deleteAllSessions(userId) {
            return {
                success: true,
                userId,
            };
        },
    };
}

test("SessionService creates a session", async () => {
    const service = new SessionService(createProvider());

    const session = {
        userId: "user-1",
        refreshTokenHash: "hashed-token",
    };

    const result = await service.createSession(session);

    assert.deepEqual(result, session);
});

test("SessionService finds a session", async () => {
    const service = new SessionService(createProvider());

    const result = await service.findSession({
        id: "session-1",
    });

    assert.equal(result.id, "session-1");
});

test("SessionService updates a session", async () => {
    const service = new SessionService(createProvider());

    const result = await service.updateSession(
        "session-1",
        {
            lastUsedAt: Date.now(),
        }
    );

    assert.equal(result.id, "session-1");
});

test("SessionService deletes a session", async () => {
    const service = new SessionService(createProvider());

    const result = await service.deleteSession("session-1");

    assert.equal(result.success, true);
});

test("SessionService deletes all sessions", async () => {
    const service = new SessionService(createProvider());

    const result = await service.deleteAllSessions("user-1");

    assert.equal(result.success, true);
});

test("SessionService rejects missing session", async () => {
    const service = new SessionService(createProvider());

    await assert.rejects(
        () => service.createSession(),
        {
            name: "TypeError",
            message: "Session is required.",
        }
    );
});

test("SessionService rejects missing criteria", async () => {
    const service = new SessionService(createProvider());

    await assert.rejects(
        () => service.findSession(),
        {
            name: "TypeError",
            message: "Criteria is required.",
        }
    );
});

test("SessionService rejects missing session id for update", async () => {
    const service = new SessionService(createProvider());

    await assert.rejects(
        () => service.updateSession(),
        {
            name: "TypeError",
            message: "Session id is required.",
        }
    );
});

test("SessionService rejects missing update", async () => {
    const service = new SessionService(createProvider());

    await assert.rejects(
        () => service.updateSession("session-1"),
        {
            name: "TypeError",
            message: "Session update is required.",
        }
    );
});

test("SessionService rejects missing session id for delete", async () => {
    const service = new SessionService(createProvider());

    await assert.rejects(
        () => service.deleteSession(),
        {
            name: "TypeError",
            message: "Session id is required.",
        }
    );
});

test("SessionService rejects missing user id", async () => {
    const service = new SessionService(createProvider());

    await assert.rejects(
        () => service.deleteAllSessions(),
        {
            name: "TypeError",
            message: "User id is required.",
        }
    );
});