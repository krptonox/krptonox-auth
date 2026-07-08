import ConfigurationError from '../errors/ConfigurationError.js';

import { validateDatabaseConfig } from './validateDatabaseConfig.js';


export function validateConfig(config){
    if (!config) {
        throw new ConfigurationError("Configuration is required");
    }

    validateDatabaseConfig(config.database);

    // Add more validation logic as needed
}