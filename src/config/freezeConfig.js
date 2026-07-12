import { isPlainObject } from "../utils/freezeConfig/isPlainObject.js";

import ConfigurationError from "../errors/ConfigurationError.js";

import { deepFreeze } from "../utils/freezeConfig/deepFreeze.js";

export function freezeConfig(config){
    if(!isPlainObject(config)){
        throw new ConfigurationError("Config must be a plain object");
    }
    return deepFreeze(config);
}