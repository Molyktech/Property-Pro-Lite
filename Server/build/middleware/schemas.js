"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginSchema = exports.signupSchema = exports.propertyValidator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var email = _joi["default"].string().email({
  minDomainSegments: 2
}).required();

var password = _joi["default"].string().min(7).alphanum().trim().required();

var signupSchema = _joi["default"].object().keys({
  first_name: _joi["default"].string().regex(/(^[a-zA-Z]+$)/).min(2).max(30).required(),
  last_name: _joi["default"].string().regex(/(^[a-zA-Z]+$)/).min(2).max(30).required(),
  // accepts alphanumeric strings at least 7 characters long and is not empty
  password: password,
  email: email,
  address: _joi["default"].string().trim().required(),
  // phone is required
  // and must be a string of the format XXX-XXX-XXXX
  // where X is a digit (0-9)
  phone_number: _joi["default"].string().regex(/^\d{3}-\d{3}-\d{5}$/).required()
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
  status: _joi["default"].string().valid('sold', 'available').required()
});

var propertyValidator = function propertyValidator(req, res, next) {
  var price = req.body.price;
  price = Number(price);
  req.body.price = price;
  return _joi["default"].validate(req.body, propertySchema, function (err) {
    if (err) {
      return res.status(422).json({
        status: 'Error',
        error: err
      });
    }

    return next();
  });
};

exports.propertyValidator = propertyValidator;