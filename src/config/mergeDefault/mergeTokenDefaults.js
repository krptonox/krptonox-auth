import ConfigurationError from '../../errors/ConfigurationError.js';

import { DEFAULT_ACCESS_TOKEN_EXPIRY, DEFAULT_REFRESH_TOKEN_EXPIRY } from '../../constants/auth.js';

export default function mergeTokenDefaults(config) {
    if (!config) {
        throw new ConfigurationError("Configuration object is required");
    }

    const newConfig = structuredClone(config);

    // Ensure nested objects exist
    newConfig.token ??= {};

    // Merge defaults
    newConfig.token = {
        ...newConfig.token,
        accessExpiry:
            newConfig.token.accessExpiry ??
            DEFAULT_ACCESS_TOKEN_EXPIRY,

        refreshExpiry:
            newConfig.token.refreshExpiry ??
            DEFAULT_REFRESH_TOKEN_EXPIRY,
    };

    return newConfig;
}