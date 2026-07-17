import ValidationError from "../../errors/ValidationError.js";

import{
    DATABASE_PROVIDER_CONTRACT
} from "../contracts/database.contract.js";

export function validateDatabaseProvider(provider) {

    if(
        provider === null ||
        (
            typeof provider !== "object" &&
            typeof provider !== "function"
        )
    ){
        throw new ValidationError(
            "Database provider must be an object or function."
        );
    }

    for(const [method, signature] of Object.entries(
        DATABASE_PROVIDER_CONTRACT
    )){
        if(typeof provider[method] !== "function") {
            throw new ValidationError(
                `Database provider must implement ${signature}.`
            );
        }
    }

    return provider;
}