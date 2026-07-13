import ValidationError from "../errors/ValidationError.js";

export function validatePasswordProvider(passwordProvider) {
    if(!passwordProvider){
        throw new ValidationError("Password provider is required");
    }

    if(typeof passwordProvider.hash !== "function"){
        throw new ValidationError("Password provider hash function is required");
    }

    if(typeof passwordProvider.verify !== "function"){
        throw new ValidationError("Password provider verify function is required");
    }

    return passwordProvider;
}