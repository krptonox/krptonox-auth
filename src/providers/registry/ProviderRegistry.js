export class ProviderRegistry {
    constructor() {
        this.providers = new Map();
    }

    register(name, provider) {
        if (!name) {
            throw new Error(
                "Provider name is required."
            );
        }

        if (!provider) {
            throw new Error(
                `Provider "${name}" is required.`
            );
        }

        this.providers.set(name, provider);

        return this;
    }

    get(name) {
        if (!this.providers.has(name)) {
            throw new Error(
                `Provider "${name}" is not registered.`
            );
        }

        return this.providers.get(name);
    }

    has(name) {
        return this.providers.has(name);
    }
}