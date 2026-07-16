import { PasswordProvider } from '../validators/validatePasswordProvider.js';

export function PasswordProvider() {
    const ironpass = {
        hash(){},
        verify(){}
    }

    const bcrypt = {
       hash(){},
       compare(){}
    }
    return { ironpass, bcrypt };
}