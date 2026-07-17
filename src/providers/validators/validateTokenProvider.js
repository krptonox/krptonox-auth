import ValidationError from "../../errors/ValidationError.js";

import {
    TOKEN_PROVIDER_CONTRACT
} from "../contracts/token.contract.js";

export function validateTokenProvider(provider) {

    if (
        provider === null ||
        (
            typeof provider !== "object" &&
            typeof provider !== "function"
        )
    ) {
        throw new ValidationError(
            "Token provider must be an object or function."
        );
    }

    for (const [method, signature] of Object.entries(
        TOKEN_PROVIDER_CONTRACT
    )) {
        if (typeof provider[method] !== "function") {
            throw new ValidationError(
                `Token provider must implement ${signature}.`
            );
        }
    }

    return provider;
}