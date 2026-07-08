import ConfigurationError from '../errors/ConfigurationError.js';

export function validateEmailConfig(emailConfig) {
    if (!emailConfig) {
        throw new ConfigurationError('Email configuration is required');
    }

    if (!emailConfig.provider) {
        throw new ConfigurationError('Email provider is required');
    }

    if (!emailConfig.options) {
        throw new ConfigurationError('Email provider options are required');
    }

    return emailConfig;
}