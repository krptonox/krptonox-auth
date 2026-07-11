export function deepFreeze(obj) {
    if(Object.isFrozen(obj)){
        return obj;
    }

    Object.freeze(obj);

    for(const value of Object.values(obj)){
       if(isPlainObject(value)){
          deepFreeze(value);
        }
    } 

    return obj;
}