import { ProviderRegistry } from "./registry/ProviderRegistry.js";

import { validatePasswordProvider } from "./validators/validatePasswordProvider.js";
import { validateTokenProvider } from "./validators/validateTokenProvider.js";
import { validateDatabaseProvider } from "./validators/validateDatabaseProvider.js";
import { validateEmailProvider } from "./validators/validateEmailProvider.js";

export function initializeProviders(resolvedConfig) {
    const registry = new ProviderRegistry();

    const {
        database,
        password,
        token,
        email,
    } = resolvedConfig;

    // Required providers
    validateDatabaseProvider(database.provider);
    validatePasswordProvider(password.provider);
    validateTokenProvider(token.provider);

    registry.register(
        "database",
        database.provider
    );

    registry.register(
        "password",
        password.provider
    );

    registry.register(
        "token",
        token.provider
    );

    // Optional provider
    if (email?.provider) {
        validateEmailProvider(email.provider);

        registry.register(
            "email",
            email.provider
        );
    }

    return registry;
}