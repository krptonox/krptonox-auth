import { validatePasswordProvider } from "../validators/validatePasswordProvider.js";

export class PasswordAdapter {
    constructor(provider) {
        validatePasswordProvider(provider);

        this.provider = provider;
    }

    async hash(password) {
        return await this.provider.hash(password);
    }

    async verify(password, hash) {
        return await this.provider.verify(password, hash);
    }
}