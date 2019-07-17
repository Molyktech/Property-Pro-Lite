"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = _interopRequireDefault(require("../models/index"));

var _authHelpers = _interopRequireDefault(require("../helpers/authHelpers"));

var _Utils = _interopRequireDefault(require("../utils/Utils"));

var User = {
  create: function () {
    var _create = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res) {
      var _req$body, first_name, last_name, email, password, address, phone_number, is_admin, admin, createQuery, values, _ref, rows;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, first_name = _req$body.first_name, last_name = _req$body.last_name, email = _req$body.email, password = _req$body.password, address = _req$body.address, phone_number = _req$body.phone_number, is_admin = _req$body.is_admin;
              admin = is_admin === 'true' ? true : false;
              _context.next = 4;
              return _authHelpers["default"].hashPassword(password);

            case 4:
              password = _context.sent;
              createQuery = "INSERT INTO Users\n          (first_name, last_name, email, password, phone_number, address, is_admin )\n              VALUES($1, $2, $3, $4, $5, $6, $7)\n              returning *";
              values = [first_name, last_name, email, password, phone_number, address, admin];
              _context.prev = 7;
              _context.next = 10;
              return _index["default"].query(createQuery, values);

            case 10:
              _ref = _context.sent;
              rows = _ref.rows;
              return _context.abrupt("return", _authHelpers["default"].createTokenAndSend(rows[0], res, 201, 'Signup Successful'));

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](7);

              if (!(_context.t0.routine === '_bt_check_unique' || _context.t0.code === '23505')) {
                _context.next = 19;
                break;
              }

              return _context.abrupt("return", res.status(500).json({
                status: "Error",
                message: 'User with that EMAIL already exist'
              }));

            case 19:
              return _context.abrupt("return", res.status(500).json({
                status: 'Error',
                error: _context.t0.message
              }));

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[7, 15]]);
    }));

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  login: function () {
    var _login = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res) {
      var text, _ref2, rows;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              text = 'SELECT * FROM Users WHERE email = $1';
              _context2.prev = 1;
              _context2.next = 4;
              return _index["default"].query(text, [req.body.email]);

            case 4:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context2.next = 9;
                break;
              }

              _Utils["default"].setError(400, 'Incorrect login details');

              return _context2.abrupt("return", _Utils["default"].send(res));

            case 9:
              if (_authHelpers["default"].comparePassword(rows[0].password, req.body.password)) {
                _context2.next = 12;
                break;
              }

              _Utils["default"].setError(400, 'Incorrect login details');

              return _context2.abrupt("return", _Utils["default"].send(res));

            case 12:
              return _context2.abrupt("return", _authHelpers["default"].createTokenAndSend(rows[0], res, 200, 'Login Successful'));

            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(500).json({
                status: 'Error',
                error: _context2.t0.message
              }));

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 15]]);
    }));

    function login(_x3, _x4) {
      return _login.apply(this, arguments);
    }

    return login;
  }(),
  resetPassword: function () {
    var _resetPassword = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res) {
      var email, _req$body2, password, newPassword, checkQuery, value, _ref3, rows, comparePassword, updateOneQuery, values, _resetPassword2;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              email = req.user.email;
              _req$body2 = req.body, password = _req$body2.password, newPassword = _req$body2.new_password;
              checkQuery = 'SELECT password FROM Users WHERE email = $1';
              value = [email];
              _context3.prev = 4;
              _context3.next = 7;
              return _index["default"].query(checkQuery, value);

            case 7:
              _ref3 = _context3.sent;
              rows = _ref3.rows;
              _context3.next = 11;
              return _authHelpers["default"].comparePassword(rows[0].password, password);

            case 11:
              comparePassword = _context3.sent;

              if (!comparePassword) {
                _context3.next = 26;
                break;
              }

              _context3.next = 15;
              return _authHelpers["default"].hashPassword(newPassword);

            case 15:
              newPassword = _context3.sent;
              updateOneQuery = "UPDATE Users SET password = $1 WHERE email = $2 returning *";
              values = [newPassword, email];
              _context3.next = 20;
              return _index["default"].query(updateOneQuery, values);

            case 20:
              _resetPassword2 = _context3.sent;

              if (!_resetPassword2) {
                _context3.next = 24;
                break;
              }

              _Utils["default"].setSuccess(200, 'Password reset successful');

              return _context3.abrupt("return", _Utils["default"].send(res));

            case 24:
              _context3.next = 28;
              break;

            case 26:
              _Utils["default"].setError(422, 'Incorrect Password, Password did not macth stored password, please check and try again');

              return _context3.abrupt("return", _Utils["default"].send(res));

            case 28:
              _context3.next = 34;
              break;

            case 30:
              _context3.prev = 30;
              _context3.t0 = _context3["catch"](4);

              _Utils["default"].setError(500, _context3.t0.message);

              return _context3.abrupt("return", _Utils["default"].send(res));

            case 34:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[4, 30]]);
    }));

    function resetPassword(_x5, _x6) {
      return _resetPassword.apply(this, arguments);
    }

    return resetPassword;
  }()
};
var _default = User;
exports["default"] = _default;