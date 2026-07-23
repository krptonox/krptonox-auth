import { createSignup } from "./useCases/signup.js";
import { createLogin } from "./useCases/login.js";
import { createRefresh } from "./useCases/refresh.js";

export function createUseCases(services) {
    return {
        signup: createSignup(services),
        login: createLogin(services),
        refresh: createRefresh(services),
    };
}