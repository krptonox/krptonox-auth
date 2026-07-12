import { validateConfig } from "../validators/validateConfig.js";
import { mergeDefaults } from "../config/mergeDefault/index.js";
import { freezeConfig } from "../config/freezeConfig.js";

export function resolveConfig(config) {
    validateConfig(config);

    const mergedConfig = mergeDefaults(config);

    return freezeConfig(mergedConfig);
}