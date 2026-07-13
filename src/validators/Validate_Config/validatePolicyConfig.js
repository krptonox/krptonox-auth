import ConfigurationError from "../errors/ConfigurationError.js";

export function validatePolicyConfig(policyConfig) {
    if(!policyConfig){
        return policyConfig;
    }

    if(!policyConfig.password){
        throw new ConfigurationError("Password policy configuration is required");
    }

    if(!policyConfig.password.minLength || !policyConfig.password.maxLength){
        throw new ConfigurationError("Password policy must specify minLength and maxLength");
    }

    if(policyConfig.password.minLength < 8 || policyConfig.password.maxLength < policyConfig.password.minLength){
        throw new ConfigurationError("Password policy minLength must be at least 8 and maxLength must be greater than or equal to minLength");
    }

    return policyConfig;
}