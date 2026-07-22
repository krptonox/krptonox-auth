import  mergeTokenDefaults  from "./mergeTokenDefaults.js";
import  mergePolicyDefaults  from "./mergePolicyDefaults.js";
import mergeEmailDefaults from "./mergeEmailDefaults.js";
import mergeSessionDefaults from "./mergeSessionDefaults.js";
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
resolvedConfig = mergeSessionDefaults(resolvedConfig);

    return resolvedConfig;
}