import {
    DEFAULT_EMAIL_SECURE,
    DEFAULT_EMAIL_PORT,
    DEFAULT_EMAIL_FROM_NAME,
} from "../constants/email.js";

export default function mergeEmailDefaults(config) {
    const emailConfig = config.email;

    if(!emailConfig){
        return config;
    }

    const options = emailConfig.options;
    const from = emailConfig.from;

    config.email = {
        ...emailConfig,

        options: {
            ...options,

            port:
                options?.port ??
                DEFAULT_EMAIL_PORT,

            secure:
                options?.secure ??
                DEFAULT_EMAIL_SECURE,
        },

        from: {
            ...from,

            name:
                from?.name ??
                DEFAULT_EMAIL_FROM_NAME,
        },
    };

    return config;
}