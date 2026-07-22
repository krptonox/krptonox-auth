import { DEFAULT_SESSION_MAX_AGE } from "../../constants/session.js";

export default function mergeSessionDefaults(config) {
    config.session = {
        maxAge: DEFAULT_SESSION_MAX_AGE,
        ...(config.session ?? {}),
    };

    return config;
}