import ValidationError from "../../errors/ValidationError.js";

import{
    EMAIL_PROVIDER_CONTRACT
} from "../contracts/email.contract.js";

export function validateEmailProvider(provider){

    if(
        provider === null ||
        (
            typeof provider !== "object" &&
            typeof provider !== "function"
        )
    ){
        throw new ValidationError(
            "Email provider must be an object or function."
        );
    }

    for(const [method, signature] of Object.entries(
        EMAIL_PROVIDER_CONTRACT
    )){
        if(typeof provider[method] !== "function") {
            throw new ValidationError(
                `Email provider must implement ${signature}.`
            );
        }
    }

    return provider;
}