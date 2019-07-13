import db from '../models/index';
import Joi from '@hapi/joi';
import {
    signupSchema,
    loginSchema
} from './schemas';
import Util from '../utils/Utils';

export default class UserMiddleware {
    static checkIsValidId(req, res, next) {

        if (req.param.id < 0 || req.params.id >= model.length) {
            return res.status(404).json({

                message: ` user not found`,
                status: 'error'
            })
        }

        req.data = model;
        return next()

    }

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
}