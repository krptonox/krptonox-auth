export function requireObject(value, name) {
    if (value === undefined || value === null) {
        throw new TypeError(`${name} is required.`);
    }

    if (typeof value !== "object" || Array.isArray(value)) {
        throw new TypeError(`${name} must be an object.`);
    }

    return value;
}