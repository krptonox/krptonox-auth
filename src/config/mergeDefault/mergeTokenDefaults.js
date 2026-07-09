import ConfigurationError from '../../errors/ConfigurationError.js';

import {
    DEFAULT_ACCESS_TOKEN_EXPIRY,
    DEFAULT_REFRESH_TOKEN_EXPIRY,
} from "../../constants/auth.js";

export default function mergeTokenDefaults(config) {
    config.token ??= {};

    const tokenPolicy = config.token;

    config.token = {
        ...tokenPolicy,

        accessExpiry:
            tokenPolicy.accessExpiry ??
            DEFAULT_ACCESS_TOKEN_EXPIRY,

        refreshExpiry:
            tokenPolicy.refreshExpiry ??
            DEFAULT_REFRESH_TOKEN_EXPIRY,
    };

    return config;
}