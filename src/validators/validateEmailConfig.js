import ConfigurationError from "../errors/ConfigurationError.js";

export function validateEmailConfig(emailConfig) {
    if (!emailConfig) {
        throw new ConfigurationError("Email configuration is required");
    }

    if (!emailConfig.host) {
        throw new ConfigurationError("Email host is required");
    }

    if (!emailConfig.port) {
        throw new ConfigurationError("Email port is required");
    }

    if (!emailConfig.secure) {
        throw new ConfigurationError("Email secure setting is required");
    }

    return emailConfig;

}