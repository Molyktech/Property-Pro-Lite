import jwt from 'jsonwebtoken';

import bcrypt from 'bcryptjs';


const Helper = {


    async hashPassword(password) {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;

    },

    //compare password
    async comparePassword(hashPassword, password) {
        const comparedPassword = await bcrypt.compare(password, hashPassword);
        return comparedPassword;


    },


    createTokenAndSend(user, res, statusCode, message) {
        const payload = {
            id: user.id,
            email: user.email,
            phone_number: user.phone_number

        };

        jwt.sign(payload, process.env.TOKEN_SECRET, {
                expiresIn: '1d',
            },
            (err, token) => {
                if (err) {
                    res.status(400).json({
                        status: 'error',
                        message: 'Unable to process request',
                        error: err,
                    });
                } else {
                    Object.defineProperty(user, 'password', {
                        writable: true,
                        enumerable: false,
                    });
                    res.status(statusCode).json({
                        status: 'success',
                        data: {
                            token,
                            ...user,
                            message,

                        },
                    });
                }
            });
    },

    generatePassword(num) {
        let password = Array(num).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function (x) {
            return x[Math.floor(Math.random() * x.length)]
        }).join('');
        return password;
    }

}



export default Helper;