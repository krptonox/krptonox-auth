import ConfigurationError from "../../errors/ConfigurationError.js";

export function validateDatabaseConfig(databaseConfig) {
    if(!databaseConfig){
        throw new ConfigurationError("Database configuration is required");
    }

    if(!databaseConfig.provider){
        throw new ConfigurationError("Database provider is required");
    }

    if(!databaseConfig.userModel){
        throw new ConfigurationError("Database user model is required");
    }

    return databaseConfig;

}