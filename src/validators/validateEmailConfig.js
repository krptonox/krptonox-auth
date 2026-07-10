import ConfigurationError from "../errors/ConfigurationError.js";

export default function validateEmailConfig(emailConfig) {
    if(!emailConfig.provider){
        throw new ConfigurationError(
            "Email provider is required."
        );
    }

    if(!emailConfig.options){
        throw new ConfigurationError(
            "Email provider options are required."
        );
    }

    if(!emailConfig.options.host){
        throw new ConfigurationError(
            'Email "options.host" is required.'
        );
    }

    if(!emailConfig.options.auth){
        throw new ConfigurationError(
            'Email "options.auth" is required.'
        );
    }

    if(!emailConfig.options.auth.user){
        throw new ConfigurationError(
            'Email "options.auth.user" is required.'
        );
    }

    if(!emailConfig.options.auth.pass){
        throw new ConfigurationError(
            'Email "options.auth.pass" is required.'
        );
    }

    if(!emailConfig.from){
        throw new ConfigurationError(
            'Email "from" configuration is required.'
        );
    }

    if(!emailConfig.from.email){
        throw new ConfigurationError(
            'Email "from.email" is required.'
        );
    }

    return emailConfig;
}