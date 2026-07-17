import { validateConfig } from "../validators/Validate_Config/validateConfig.js";
import mergeDefaults from "./mergeDefault/index.js";
import { freezeConfig } from "./freezeConfig.js";

export function resolveConfig(config) {
    validateConfig(config);

    const mergedConfig = mergeDefaults(config);

    return freezeConfig(mergedConfig);
}