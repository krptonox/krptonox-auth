export function isPlainObject(value){
    return(
        value !== null &&
        Object.getPrototypeOf(value) === Object.prototype
    );
}


