import ValidationError from "../errors/ValidationError.js";

const EMAIL_PROVIDER_CONTRACT = Object.freeze({
    sendEmail: "sendEmail(message)",
    
});

export function validateEmailProvider(emailProvider){

   if(
    emailProvider === null ||
    (
        typeof emailProvider !== "object" &&
        typeof emailProvider !== "function"
    )
    ){
        throw new ValidationError(
           "Email provider must be an object."
    );
    }
    
    for(const [method, signature] of Object.entries(EMAIL_PROVIDER_CONTRACT)){

    if(typeof emailProvider[method] !== "function"){

        throw new ValidationError(
            `Email provider must implement ${signature}.`
        );
      }
    }

    return emailProvider;
}