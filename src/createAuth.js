import { resolveConfig } from "./config/resolveConfig.js";
import { initializeProviders } from "./providers/initializeProviders.js";

import { PasswordService } from "./core/services/PasswordService.js";
import { UserService } from "./core/services/UserService.js";
import { TokenService } from "./core/services/TokenService.js";

import { createSignup } from "./core/useCases/signup.js";
import { createLogin } from "./core/useCases/login.js";


export function createAuth(config) {
    // 1. Resolve configuration
    const resolvedConfig = resolveConfig(config);

    // 2. Initialize providers
    const providerRegistry =
        initializeProviders(resolvedConfig);

    // 3. Initialize services
    const passwordService =
        new PasswordService(
            providerRegistry.get("password")
        );

    const userService =
        new UserService(
            providerRegistry.get("database")
        );

    const tokenService =
        new TokenService(
            providerRegistry.get("token")
        );

    // 4. Collect dependencies
    const services = {
        userService,
        passwordService,
        tokenService,
    };

    // 5. Initialize use cases
    const signup = createSignup(services);
    const login = createLogin(services);

    // 6. Public API
    return {
        signup,
        login,

        config: resolvedConfig,
        providers: providerRegistry,
    };
}