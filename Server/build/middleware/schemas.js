"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordSchema = exports.email = exports.loginSchema = exports.signupSchema = exports.propertyValidator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var email = _joi["default"].string().email({
  minDomainSegments: 2
}).required().error(function () {
  return {
    message: 'Please enter a valid email address, it should include an @ sign and a dot'
  };
});

exports.email = email;

var password = _joi["default"].string().min(7).alphanum().trim().required().error(function () {
  return {
    message: 'Password is required and should be at least 7 characters long'
  };
});

var passwordSchema = _joi["default"].object().keys({
  password: password,
  new_password: password
});

exports.passwordSchema = passwordSchema;

var signupSchema = _joi["default"].object().keys({
  first_name: _joi["default"].string().regex(/(^[a-zA-Z]+$)/).min(2).max(30).required().error(function () {
    return {
      message: 'First Name is required and cannot be empty'
    };
  }),
  last_name: _joi["default"].string().regex(/(^[a-zA-Z]+$)/).min(2).max(30).required().error(function () {
    return {
      message: 'Last Name is required'
    };
  }),
  // accepts alphanumeric strings at least 7 characters long and is not empty
  password: password,
  email: email,
  is_admin: _joi["default"]["boolean"](),
  address: _joi["default"].string().trim().required(),
  // phone is required
  phone_number: _joi["default"].string().min(11).max(11).required().error(function () {
    return {
      message: 'Phone is required and must be 11 digits long '
    };
  })
});

exports.signupSchema = signupSchema;

var loginSchema = _joi["default"].object().keys({
  email: email,
  password: password
});

exports.loginSchema = loginSchema;

var propertySchema = _joi["default"].object().keys({
  price: _joi["default"].number().required().integer().min(1000).max(1000000000),
  state: _joi["default"].string().required(),
  city: _joi["default"].string().required(),
  type: _joi["default"].string().required(),
  address: _joi["default"].string().required().min(10).max(500),
  status: _joi["default"].string().valid('sold', 'available')
});

var propertyValidator = function propertyValidator(req, res, next) {
  var price = req.body.price;
  price = Number(price);
  req.body.price = price;
  return _joi["default"].validate(req.body, propertySchema, function (err) {
    if (err) {
      return res.status(400).json({
        status: 'Error',
        error: err.details[0].message
      });
    }

    return next();
  });
};

exports.propertyValidator = propertyValidator;