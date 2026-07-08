class ConfigurationError extends Error {
    constructor(message="Configuration error occurred") {
        super(message);
        this.name = 'ConfigurationError';

    }
}

export default ConfigurationError;