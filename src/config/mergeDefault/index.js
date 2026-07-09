import { mergeTokenDefaults } from './mergeTokenDefaults.js';

import { mergePolicyDefaults } from './mergePolicyDefaults.js';

import ConfigurationError from '../../errors/ConfigurationError.js';

export default function mergeDefaults(config) {
    if (!config) {
        throw new ConfigurationError(
            "Configuration object is required"
        );
    }

    let resolvedConfig = structuredClone(config);

    resolvedConfig = mergeTokenDefaults(resolvedConfig);
    resolvedConfig = mergePolicyDefaults(resolvedConfig);

    return resolvedConfig;
}