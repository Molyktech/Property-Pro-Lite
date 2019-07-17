"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Utils = _interopRequireDefault(require("../utils/Utils"));

var _index = _interopRequireDefault(require("../models/index"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config(); // express middleware to check for token and pull a user out of it and if not just move along


var authUser =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var token, decoded, authHeader, text, _ref2, rows;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            authHeader = req.get('authorization');

            if (!authHeader) {
              _Utils["default"].setError(403, 'UnAuthorised');

              _Utils["default"].send(res);

              next();
            }

            token = authHeader.split(' ')[1];

            if (!token) {
              _context.next = 16;
              break;
            }

            _context.next = 7;
            return _jsonwebtoken["default"].verify(token, process.env.TOKEN_SECRET);

          case 7:
            decoded = _context.sent;
            text = 'SELECT * FROM Users WHERE id = $1';
            _context.next = 11;
            return _index["default"].query(text, [decoded.id]);

          case 11:
            _ref2 = _context.sent;
            rows = _ref2.rows;

            if (!rows[0]) {
              _Utils["default"].setError(400, 'Invalid Token');

              _Utils["default"].send(res);

              next();
            }

            req.user = {
              id: decoded.id,
              email: decoded.email,
              phone_number: decoded.phone_number,
              is_admin: decoded.is_admin
            };
            next();

          case 16:
            _context.next = 22;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);

            _Utils["default"].setError(500, _context.t0.message);

            return _context.abrupt("return", _Utils["default"].send(res));

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 18]]);
  }));

  return function authUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.authUser = authUser;