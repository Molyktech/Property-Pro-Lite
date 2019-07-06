"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTokenAndSend = exports.dataError = exports.userExist = exports.responseError = exports.verrifyUserExist = exports.newDate = exports.getNewId = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _userDb = _interopRequireDefault(require("../models/db/userDb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var getNewId = function getNewId(array) {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  }

  return 1;
};

exports.getNewId = getNewId;

var newDate = function newDate() {
  return new Date().toString();
};

exports.newDate = newDate;

var verrifyUserExist = function verrifyUserExist(req, res, next) {
  var email = req.body.email.email;
  var error = {};

  _userDb["default"].filter(function (user) {
    return user.email === email;
  }).then(function (user) {
    if (user && user.length > 0) {
      error.user = 'This email already exist in our server try signing in';
      return res.status(400).json({
        error: error
      });
    }

    return next();
  });
};

exports.verrifyUserExist = verrifyUserExist;

var responseError = function responseError(res) {
  res.status(401).json({
    status: 'Error',
    error: 'Invalid login details, wrong email/password'
  });
};

exports.responseError = responseError;

var userExist = function userExist(res, err) {
  res.status(409).json({
    status: 'Error',
    error: err.message
  });
};

exports.userExist = userExist;

var dataError = function dataError(res, data) {
  res.status(422).json({
    status: 'error',
    message: 'Invalid login details',
    error: data.error
  });
};

exports.dataError = dataError;

var createTokenAndSend = function createTokenAndSend(user, res, statusCode) {
  var payload = {
    id: user.id,
    email: user.email,
    phone_number: user.phone_number
  };

  _jsonwebtoken["default"].sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: '1d'
  }, function (err, token) {
    if (err) {
      res.status(400).json({
        status: 'error',
        message: 'Unable to process request',
        error: err
      });
    } else {
      res.status(statusCode).json({
        status: 'success',
        data: {
          token: token,
          user: user
        }
      });
    }
  });
};

exports.createTokenAndSend = createTokenAndSend;