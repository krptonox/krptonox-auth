import { resolveConfig } from "./config/resolveConfig.js";
import { initializeProviders } from "./providers/initializeProviders.js";

export function createAuth(config) {
    // 1. Validate, merge defaults, and freeze configuration
    const resolvedConfig = resolveConfig(config);

    // 2. Validate and register runtime providers
    const providerRegistry = initializeProviders(resolvedConfig);

    // 3. Later:
    // Initialize authentication core/services here

    return {
        config: resolvedConfig,
        providers: providerRegistry,
    };
}