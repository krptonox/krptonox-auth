import ConfigurationError from '../errors/ConfigurationError.js';


export default function mergePolicyDefaults(config) {
    if(!config) {
        throw new ConfigurationError("Configuration object is required");
    }
    
}