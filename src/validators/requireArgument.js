export function requireArgument(value, name) {
    if (value === undefined || value === null) {
        throw new TypeError(`${name} is required.`);
    }

    return value;
}