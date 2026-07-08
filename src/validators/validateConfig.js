import ConfigurationError from '../errors/ConfigurationError.js';

import { validateDatabaseConfig } from './validateDatabaseConfig.js';

import { validatePasswordConfig } from './validatePasswordConfig.js';

import { validateTokenConfig } from './validateTokenConfig.js';

import { validatePolicyConfig } from './validatePolicyConfig.js';

export function validateConfig(config) {
    if (!config) {
        throw new ConfigurationError("Configuration is required");
    }

     const {
        database,
        password,
        token,
        policy,
        email
    } = config;

    validateDatabaseConfig(database);

    validatePasswordConfig(password);

    validateTokenConfig(token);

    if (policy) {
    validatePolicyConfig(policy);
    }

    if (email) {
    validateEmailConfig(email);
    }

    return config;
}