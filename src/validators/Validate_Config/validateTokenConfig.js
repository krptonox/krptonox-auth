import ConfigurationError from "../errors/ConfigurationError.js";

export function validateTokenConfig(tokenConfig) {
    if(!tokenConfig){
        throw new ConfigurationError("Token configuration is required");
    }

    if(!tokenConfig.provider){
        throw new ConfigurationError("Token provider is required");
    }

    if(!tokenConfig.accessSecret){
        throw new ConfigurationError("Token access secret is required");
    }

    if(!tokenConfig.refreshSecret){
        throw new ConfigurationError("Token refresh secret is required");
    }

    return tokenConfig;
}