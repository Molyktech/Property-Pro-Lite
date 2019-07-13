import Joi from '@hapi/joi';

const email = Joi.string().email({
  minDomainSegments: 2,
}).required().error(() => ({
  message: 'Please enter a valid email address, it should include an @ sign and a dot',
}));

const password = Joi.string().min(7).alphanum().trim()
  .required().error(() => ({
    message: 'Password is required and should be at least 7 characters long',
  }));

const signupSchema = Joi.object().keys({
  first_name: Joi.string().regex(/(^[a-zA-Z]+$)/).min(2).max(30)
    .required().error(() => ({
      message: 'First Name is required and cannot be empty',
    })),
  last_name: Joi.string().regex(/(^[a-zA-Z]+$)/).min(2).max(30)
    .required().error(() => ({
      message: 'Last Name is required',
    })),
  // accepts alphanumeric strings at least 7 characters long and is not empty
  password,
  email,
  address: Joi.string().trim().required(),
  // phone is required
  // and must be a string of the format XXX-XXX-XXXX
  // where X is a digit (0-9)
  phone_number: Joi.string().regex(/^\d{3}-\d{4}-\d{4}$/).required().error(() => ({
    message: 'Phone is required and must follow the format 070-3331-8186',
  })),
});

const loginSchema = Joi.object().keys({
  email,
  password,
});
const propertySchema = Joi.object().keys({
  price: Joi.number().required().integer().min(1000)
    .max(1000000000),
  state: Joi.string().required(),
  city: Joi.string().required(),
  type: Joi.string().required(),
  address: Joi.string().required().min(10).max(500),
  status: Joi.string().valid('sold', 'available'),
});

const propertyValidator = (req, res, next) => {
  let {
    price,
  } = req.body;
  price = Number(price);
  req.body.price = price;

  return Joi.validate(req.body, propertySchema, (err) => {
    if (err) {
      return res.status(400).json({
        status: 'Error',
        error: err.details[0].message,
      });
    }
    return next();
  });
};


export {
  propertyValidator,
  signupSchema,
  loginSchema,
};