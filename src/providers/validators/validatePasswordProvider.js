import ValidationError from "../errors/ValidationError.js";

const PASSWORD_PROVIDER_CONTRACT = Object.freeze({
         hash: "hash(password)",
         verify: "verify(password, hash)"
   });

export function validatePasswordProvider(passwordProvider) {

   if(
    passwordProvider === null ||
    (
        typeof passwordProvider !== "object" &&
        typeof passwordProvider !== "function"
    )
    ){
        throw new ValidationError(
           "Password provider must be an object."
    );
}
    
    for(const [method, signature] of Object.entries(PASSWORD_PROVIDER_CONTRACT)){

    if(typeof passwordProvider[method] !== "function"){

        throw new ValidationError(
            `Password provider must implement ${signature}.`
        );
      }
    }

    return passwordProvider;
}