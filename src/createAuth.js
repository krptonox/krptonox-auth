createAuth({

    database: {
        provider: mongoose,
        userModel: User
    },

    password: {
        provider: ironpass
    },

    token: {
        provider: jsonwebtoken,
        accessSecret: process.env.ACCESS_SECRET,
        refreshSecret: process.env.REFRESH_SECRET
    },

    policy: {
        password: {
            minLength: 8,
            maxLength: 128,
            requireUppercase: true,
            requireLowercase: true,
            requireNumber: true,
            requireSpecial: true
        }
    },

    email: {

     provider: nodemailer,

     options: {

        host,

        port,

        secure

       }

    }

});


export default createAuth;