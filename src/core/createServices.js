import { PasswordService } from "./services/PasswordService.js";
import { UserService } from "./services/UserService.js";
import { TokenService } from "./services/TokenService.js";
import { SessionService } from "./services/SessionService.js";

export function createServices(providerRegistry) {
    return {
        passwordService: new PasswordService(
            providerRegistry.get("password")
        ),

        userService: new UserService(
            providerRegistry.get("database")
        ),

        tokenService: new TokenService(
            providerRegistry.get("token")
        ),

        sessionService: new SessionService(
            providerRegistry.get("database")
        ),
    };
}