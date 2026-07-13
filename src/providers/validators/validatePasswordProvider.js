import ValidationError from "../errors/ValidationError.js";

export function validatePasswordProvider(passwordProvider) {
    if(!passwordProvider){
        throw new ValidationError("Password provider is required");
    }

    if(typeof passwordProvider.hash !== "function"){
        throw new ValidationError("Password provider must implement a hash(password) function.");
    }

    if(typeof passwordProvider.verify !== "function"){
        throw new ValidationError("Password provider must implement a verify(password, hash) function.");
    }

    return passwordProvider;
}