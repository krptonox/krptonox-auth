import { mergeTokenDefaults } from './mergeTokenDefaults.js';

import { mergePolicyDefaults } from './mergePolicyDefaults.js';

import ConfigurationError from '../../errors/ConfigurationError.js';

export default function mergeDefaults(config) {
    if(!config) {
        throw new ConfigurationError("Configuration object is required");
    }

    const newConfig = structuredClone(config);

    let mergedConfig = mergeTokenDefaults(newConfig);

    mergedConfig = mergePolicyDefaults(mergedConfig);

    return mergedConfig;
}