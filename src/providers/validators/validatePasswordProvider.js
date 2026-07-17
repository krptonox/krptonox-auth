import ValidationError from "../../errors/ValidationError.js";

import {
    PASSWORD_PROVIDER_CONTRACT
} from "../contracts/password.contract.js";

export function validatePasswordProvider(provider) {

    if (
        provider === null ||
        (
            typeof provider !== "object" &&
            typeof provider !== "function"
        )
    ) {
        throw new ValidationError(
            "Password provider must be an object or function."
        );
    }

    for (const [method, signature] of Object.entries(
        PASSWORD_PROVIDER_CONTRACT
    )) {

        if (typeof provider[method] !== "function") {
            throw new ValidationError(
                `Password provider must implement ${signature}.`
            );
        }
    }

    return provider;
}