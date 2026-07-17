import { resolveConfig } from '../../config/resolveConfig.js';

import { validatePasswordProvider } from '../../validators/validatePasswordProvider.js';

export function PasswordProviderFactory(resolvedConfig){

     const provider = resolvedConfig.password.provider;

    validatePasswordProvider(provider);

    return new PasswordAdapter(
        provider,
        resolvedConfig.password
    );
}