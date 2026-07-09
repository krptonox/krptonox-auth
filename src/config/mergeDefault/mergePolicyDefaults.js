import ConfigurationError from '../errors/ConfigurationError.js';

import {
    DEFAULT_PASSWORD_MIN_LENGTH,
    DEFAULT_PASSWORD_MAX_LENGTH,
    DEFAULT_REQUIRE_LOWERCASE,
    DEFAULT_REQUIRE_NUMBER,
    DEFAULT_REQUIRE_SPECIAL,
    DEFAULT_REQUIRE_UPPERCASE,
} from "../../constants/policy.js";

export default function mergePolicyDefaults(config) {
    if (!config.policy?.password) {
        return config;
    }

    const passwordPolicy = config.policy.password;

    config.policy.password = {
        ...passwordPolicy,

        minLength:
            passwordPolicy.minLength ??
            DEFAULT_PASSWORD_MIN_LENGTH,

        maxLength:
            passwordPolicy.maxLength ??
            DEFAULT_PASSWORD_MAX_LENGTH,

        requireUppercase:
            passwordPolicy.requireUppercase ??
            DEFAULT_REQUIRE_UPPERCASE,

        requireLowercase:
            passwordPolicy.requireLowercase ??
            DEFAULT_REQUIRE_LOWERCASE,

        requireNumber:
            passwordPolicy.requireNumber ??
            DEFAULT_REQUIRE_NUMBER,

        requireSpecial:
            passwordPolicy.requireSpecial ??
            DEFAULT_REQUIRE_SPECIAL,
    };

    return config;
}