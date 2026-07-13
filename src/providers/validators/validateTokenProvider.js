import ValidationError from "../errors/ValidationError.js";

const TOKEN_PROVIDER_CONTRACT = Object.freeze({
    sign: "sign(payload, options)",
    verify: "verify(token, options)",
    decode: "decode(token)"
});

export function validateTokenProvider(tokenProvider) {

   if(
    tokenProvider === null ||
    (
        typeof tokenProvider !== "object" &&
        typeof tokenProvider !== "function"
    )
    ){
        throw new ValidationError(
           "Token provider must be an object."
    );
}
    
    for(const [method, signature] of Object.entries(TOKEN_PROVIDER_CONTRACT)){

    if(typeof tokenProvider[method] !== "function"){

        throw new ValidationError(
            `Token provider must implement ${signature}.`
        );
      }
    }

    return tokenProvider;
}