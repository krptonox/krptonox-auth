import { createSignup } from "./useCases/signup.js";
import { createLogin } from "./useCases/login.js";

export function createUseCases(services) {
    return {
        signup: createSignup(services),
        login: createLogin(services),
    };
}