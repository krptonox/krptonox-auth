import { resolveConfig } from "./config/resolveConfig.js";
import { initializeProviders } from "./providers/initializeProviders.js";

import { createServices } from "./core/createServices.js";
import { createUseCases } from "./core/createUseCases.js";

export function createAuth(config) {

    // 1. Resolve configuration
    const resolvedConfig = resolveConfig(config);

    // 2. Initialize providers
    const providerRegistry =
        initializeProviders(resolvedConfig);

    // 3. Create services
    const services =
        createServices(providerRegistry);

    // 4. Create use cases
    const useCases =
        createUseCases(services);

    // 5. Public API
    const {
    signup,
    login,
    } = createUseCases(services);

return {
    signup,
    login,
    config: resolvedConfig,
    providers: providerRegistry,
};
}