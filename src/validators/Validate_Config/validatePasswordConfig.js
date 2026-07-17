import ConfigurationError from "../../errors/ConfigurationError.js";

export function validatePasswordConfig(passwordConfig) {
    if(!passwordConfig){
        throw new ConfigurationError("Password configuration is required");
    }

    if(!passwordConfig.provider){
        throw new ConfigurationError("Password provider is required");
    }

    return passwordConfig;
}