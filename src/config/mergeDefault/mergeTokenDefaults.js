import {
    DEFAULT_ACCESS_TOKEN_EXPIRY,
    DEFAULT_REFRESH_TOKEN_EXPIRY,
} from '../../constants/auth.js';

export default function mergeTokenDefaults(config) {
    const tokenConfig = config.token;

    config.token = {
        ...tokenConfig,

        accessExpiry:
            tokenConfig.accessExpiry ??
            DEFAULT_ACCESS_TOKEN_EXPIRY,

        refreshExpiry:
            tokenConfig.refreshExpiry ??
            DEFAULT_REFRESH_TOKEN_EXPIRY,
    };

    return config;
}