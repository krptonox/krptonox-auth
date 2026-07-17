export class TokenService {
    constructor(tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    async sign(payload, options) {
        return this.tokenProvider.sign(
            payload,
            options
        );
    }

    async verify(token, options) {
        return this.tokenProvider.verify(
            token,
            options
        );
    }
}