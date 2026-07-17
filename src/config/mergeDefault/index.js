import mergeTokenDefaults from "./mergeTokenDefaults.js";
import mergePolicyDefaults from "./mergePolicyDefaults.js";
import mergeEmailDefaults from "./mergeEmailDefaults.js";

import ConfigurationError from "../../errors/ConfigurationError.js";

export default function mergeDefaults(config) {
    if (!config) {
        throw new ConfigurationError(
            "Configuration object is required"
        );
    }

    let resolvedConfig = {
        ...config
    };

    resolvedConfig = mergeTokenDefaults(resolvedConfig);
    resolvedConfig = mergePolicyDefaults(resolvedConfig);
    resolvedConfig = mergeEmailDefaults(resolvedConfig);

    return resolvedConfig;
}