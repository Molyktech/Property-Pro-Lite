import db from '../models/index';
import Joi from '@hapi/joi';
import {
    signupSchema,
    loginSchema,
    email,
    passwordSchema
} from './schemas';
import Util from '../utils/Utils';

export default class UserMiddleware {


    static checkIsValidBody(req, res, next) {

        Joi.validate(req.body, signupSchema, (error, value) => {
            if (error) {

                return res.status(400).json({
                    status: 'Error',
                    error: error.details[0].message,
                })
            }

            return next();
        })

    }

    static checkLogin(req, res, next) {
        Joi.validate(req.body, loginSchema, (error, value) => {
            if (error) {
                return res.status(400).json({
                    status: 'Error',
                    error: error.details[0].message,
                })

            }

            return next();
        })
    }

    static checkEmail(req, res, next) {
        let {
            useremail
        } = req.params
        Joi.validate(useremail, email, (error) => {
            if (error) {
                Util.setError(400, error.details[0].message, );
                return Util.send(res);
            }
        });
        return next();

    }

    static checkPassword(req, res, next) {
        Joi.validate(req.body, passwordSchema, (error) => {
            if (error) {
                Util.setError(400, error.details[0].message, );
                return Util.send(res);
            }
        });
        return next();

    }


}