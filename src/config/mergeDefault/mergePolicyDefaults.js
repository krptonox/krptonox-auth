import ConfigurationError from '../errors/ConfigurationError.js';

import { DEFAULT_PASSWORD_MIN_LENGTH, DEFAULT_PASSWORD_MAX_LENGTH, DEFAULT_REQUIRE_LOWERCASE, DEFAULT_REQUIRE_NUMBER, DEFAULT_REQUIRE_SPECIAL, DEFAULT_REQUIRE_UPPERCASE } from '../../constants/policy.js';

export default function mergePolicyDefaults(config) {
    if(!config){
        throw new ConfigurationError("Configuration object is required");
    }

    const newConfig = structuredClone(config);

    if (!newConfig.policy?.password){
    return newConfig;
    }

    newConfig.policy.password = {
        ...newConfig.policy.password,

        minLength:
            newConfig.policy.password.minLength ??
            DEFAULT_PASSWORD_MIN_LENGTH,

        maxLength:
            newConfig.policy.password.maxLength ??
            DEFAULT_PASSWORD_MAX_LENGTH,

        requireUppercase:
            newConfig.policy.password.requireUppercase ??
            DEFAULT_REQUIRE_UPPERCASE,

        requireLowercase:
            newConfig.policy.password.requireLowercase ??
            DEFAULT_REQUIRE_LOWERCASE,

        requireNumber:
            newConfig.policy.password.requireNumber ??
            DEFAULT_REQUIRE_NUMBER,

        requireSpecial:
            newConfig.policy.password.requireSpecial ??
            DEFAULT_REQUIRE_SPECIAL,
       };

    return newConfig;
}