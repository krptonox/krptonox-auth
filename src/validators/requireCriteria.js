import { requireObject } from "./requireObject.js";

export function requireCriteria(criteria) {
    requireObject(criteria, "Search criteria");

    if (Object.keys(criteria).length === 0) {
        throw new TypeError("Search criteria cannot be empty.");
    }

    return criteria;
}