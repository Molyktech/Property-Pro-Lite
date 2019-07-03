const Joi = require('@hapi/joi');


const email = Joi.string().email({
  minDomainSegments: 2,
}).required();

const password = Joi.string().min(7).alphanum().trim()
  .required();

export const signupSchema = Joi.object().keys({
  firstName: Joi.string().regex(/(^[a-zA-Z]+$)/).min(2).max(30)
    .required(),
  lastName: Joi.string().regex(/(^[a-zA-Z]+$)/).min(2).max(30)
    .required(),
  // accepts alphanumeric strings at least 7 characters long and is not empty
  password,
  email,
  address: Joi.string().trim().required(),
  // phone is required
  // and must be a string of the format XXX-XXX-XXXX
  // where X is a digit (0-9)
  phoneNumber: Joi.string().regex(/^\d{3}-\d{3}-\d{5}$/).required(),
});

export const loginSchema = Joi.object().keys({
  email,
  password,
});

export default {
  signupSchema,
  loginSchema,
};
