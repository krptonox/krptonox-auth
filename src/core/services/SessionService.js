import { requireObject } from "../../validators/requireObject.js";
import { requireId } from "../../validators/requireId.js";

export class SessionService {

    constructor(provider) {
        this.provider = provider;
    }

    async createSession(session) {
        requireObject(session, "Session");

        return this.provider.createSession(session);
    }

    async findSession(criteria) {
        requireObject(criteria, "Criteria");

        return this.provider.findSession(criteria);
    }

    async updateSession(id, updates) {
        requireId(id, "Session id");
        requireObject(updates, "Session update");

        return this.provider.updateSession(id, updates);
    }

    async deleteSession(id) {
        requireId(id, "Session id");

        return this.provider.deleteSession(id);
    }

    async deleteAllSessions(userId) {
        requireId(userId, "User id");

        return this.provider.deleteAllSessions(userId);
    }

}