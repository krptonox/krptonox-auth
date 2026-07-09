import { mergeTokenDefaults } from './mergeTokenDefaults.js';

import { mergePolicyDefaults } from './mergePolicyDefaults.js';

import ConfigurationError from '../../errors/ConfigurationError.js';

export default function mergeDefaults(config) {
    if (!config) {
        throw new ConfigurationError(
            "Configuration object is required"
        );
    }

    const mergedConfig = structuredClone(config);

    mergeTokenDefaults(mergedConfig);
    mergePolicyDefaults(mergedConfig);

    return mergedConfig;
}