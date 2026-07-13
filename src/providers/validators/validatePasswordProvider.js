import ValidationError from "../errors/ValidationError.js";

export function validatePasswordProvider(passwordProvider) {
    
    const REQUIRED_PASSWORD_METHODS = {
         hash: "hash(password)",
         verify: "verify(password, hash)"
   };

    if(passwordProvider === null || passwordProvider === undefined){
        throw new ValidationError("Password provider is required");
    }
    
    for(const [method, signature] of Object.entries(REQUIRED_PASSWORD_METHODS)){

    if(typeof passwordProvider[method] !== "function"){

        throw new ValidationError(
            `Password provider must implement ${signature}.`
        );
      }
    }

    return passwordProvider;
}