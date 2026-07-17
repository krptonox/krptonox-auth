import { sanitizeUser } from "../utils/sanitizeUser.js";

export function createSignup({
    userService,
    passwordService,
    tokenService,
}) {
    return async function signup({
        email,
        password,
    }) {
        const existingUser =
            await userService.findUserBy({
                email,
            });

        if (existingUser) {
            throw new Error(
                "User already exists"
            );
        }

        const passwordHash =
            await passwordService.hash(password);

        const user =
            await userService.createUser({
                email,
                password: passwordHash,
            });

        const accessToken =
            await tokenService.sign({
                userId: user.id,
            });

        return {
            user: sanitizeUser(user),
            accessToken,
        };
    };
}