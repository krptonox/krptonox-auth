import { validateConfig } from './validators/validateConfig.js';

const createAuth = (config) => {
    // Validate the configuration
    validateConfig(config);
}
