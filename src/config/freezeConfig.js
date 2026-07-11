import { isPlainObject } from "../utils/freezeConfig/isPlainObject.js";

import { deepFreeze } from "../utils/freezeConfig/deepFreeze.js";

export function freezeConfig(config){
    if(!isPlainObject(config)){
        throw new Error("Config must be a plain object");
    }
    return deepFreeze(config);
}