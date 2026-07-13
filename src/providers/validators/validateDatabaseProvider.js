import ValidationError from "../errors/ValidationError.js";

const DATABASE_PROVIDER_CONTRACT = Object.freeze({
    findUser: "findUser(criteria)",
    findUserById: "findUserById(id)",
    createUser: "createUser(userData)",
    updateUser: "updateUser(id, updates)"
});

export function validateDatabaseProvider(databaseProvider){

   if(
    databaseProvider === null ||
    (
        typeof databaseProvider !== "object" &&
        typeof databaseProvider !== "function"
    )
    ){
        throw new ValidationError(
           "Database provider must be an object."
    );
    }
    
    for(const [method, signature] of Object.entries(DATABASE_PROVIDER_CONTRACT)){

    if(typeof databaseProvider[method] !== "function"){

        throw new ValidationError(
            `Database provider must implement ${signature}.`
        );
      }
    }

    return databaseProvider;
}