"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var Helper = {
  hashPassword: function () {
    var _hashPassword = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(password) {
      var salt, hashedPassword;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _bcryptjs["default"].genSalt(12);

            case 2:
              salt = _context.sent;
              _context.next = 5;
              return _bcryptjs["default"].hash(password, salt);

            case 5:
              hashedPassword = _context.sent;
              return _context.abrupt("return", hashedPassword);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function hashPassword(_x) {
      return _hashPassword.apply(this, arguments);
    }

    return hashPassword;
  }(),
  //compare password
  comparePassword: function () {
    var _comparePassword = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(hashPassword, password) {
      var comparedPassword;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _bcryptjs["default"].compare(password, hashPassword);

            case 2:
              comparedPassword = _context2.sent;
              return _context2.abrupt("return", comparedPassword);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function comparePassword(_x2, _x3) {
      return _comparePassword.apply(this, arguments);
    }

    return comparePassword;
  }(),
  createTokenAndSend: function createTokenAndSend(user, res, statusCode, message) {
    var payload = {
      id: user.id,
      email: user.email,
      phone_number: user.phone_number,
      is_admin: user.is_admin
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
        Object.defineProperty(user, 'password', {
          writable: true,
          enumerable: false
        });
        res.status(statusCode).json({
          status: 'success',
          data: (0, _objectSpread2["default"])({
            token: token
          }, user, {
            message: message
          })
        });
      }
    });
  },
  generatePassword: function generatePassword(num) {
    var password = Array(num).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function (x) {
      return x[Math.floor(Math.random() * x.length)];
    }).join('');
    return password;
  }
};
var _default = Helper;
exports["default"] = _default;