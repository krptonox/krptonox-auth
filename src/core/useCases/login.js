import { sanitizeUser } from "../utils/sanitizeUser.js";

export function createLogin({
    userService,
    passwordService,
    tokenService,
}) {
    return async function login({
        email,
        password,
    }) {
        // 1. Find user
        const user = await userService.findUserBy({
            email,
        });

        if (!user) {
            throw new Error(
                "Invalid email or password"
            );
        }

        // 2. Verify password
        const isPasswordValid =
            await passwordService.verify(
                password,
                user.password
            );

        if (!isPasswordValid) {
            throw new Error(
                "Invalid email or password"
            );
        }

        // 3. Generate access token
        const accessToken =
            await tokenService.sign({
                userId: user.id,
            });

        // 4. Return safe result
        return {
            user: sanitizeUser(user),
            accessToken,
        };
    };
}