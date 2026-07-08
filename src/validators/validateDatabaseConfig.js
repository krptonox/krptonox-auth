export function validateDatabaseConfig(config) {
    if (!config) {
        throw new ConfigurationError("Database configuration is required");
    }

}