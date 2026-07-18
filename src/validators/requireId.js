import { requireArgument } from "./requireArgument.js";

export function requireId(id, name = "Id") {
    requireArgument(id, name);

    if (typeof id !== "string") {
        throw new TypeError(`${name} must be a string.`);
    }

    if (id.trim().length === 0) {
        throw new TypeError(`${name} cannot be empty.`);
    }

    return id;
}