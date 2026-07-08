import { ConfigurationError } from '../errors/ConfigurationError.js';


export function validateConfig(config){
    if (!config) {
        throw new ConfigurationError("Configuration is required");
    }


    // Add more validation logic as needed
}