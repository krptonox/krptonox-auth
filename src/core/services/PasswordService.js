export class PasswordService {
    constructor(passwordProvider) {
        this.passwordProvider = passwordProvider;
    }

    async hash(password) {
        return this.passwordProvider.hash(password);
    }

    async verify(password, hash) {
        return this.passwordProvider.verify(
            password,
            hash
        );
    }
}