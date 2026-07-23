export default class ReplayAttackError extends Error {
    constructor(
        message = "Refresh token replay detected"
    ) {
        super(message);

        this.name =
            "ReplayAttackError";
    }
}