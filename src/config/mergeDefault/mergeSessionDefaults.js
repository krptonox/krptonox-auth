import { DEFAULT_SESSION_MAX_AGE } from "../../constants/session.js";

export default function mergeSessionDefaults(config) {
    const sessionConfig = config.session;

    if (!sessionConfig) {
        return config;
    }

    config.session = {
        ...sessionConfig,

        maxAge:
            sessionConfig.maxAge ??
            DEFAULT_SESSION_MAX_AGE,
    };

    return config;
}