import { mergeTokenDefaults } from './mergeTokenDefault.js';

import ConfigurationError from '../../errors/ConfigurationError.js';

export default function mergeDefaults(config) {
    if(!config) {
        throw new ConfigurationError("Configuration object is required");
    }

    let mergedConfig = mergeTokenDefaults(config);
    
    return mergedConfig;
}