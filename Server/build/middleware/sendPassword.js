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

var _nodemail = _interopRequireDefault(require("../helpers/nodemail"));

var sendPassword =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var password, email, newPassword, updateOneQuery, values, _ref2, rows;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!Object.keys(req.body).length) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", next());

          case 2:
            password = _authHelpers["default"].generatePassword(10);
            email = req.params.useremail;
            _context.prev = 4;
            _context.next = 7;
            return _authHelpers["default"].hashPassword(password);

          case 7:
            newPassword = _context.sent;
            updateOneQuery = "UPDATE Users SET password = $1 WHERE email = $2 returning *";
            values = [newPassword, email];
            _context.next = 12;
            return _index["default"].query(updateOneQuery, values);

          case 12:
            _ref2 = _context.sent;
            rows = _ref2.rows;
            _context.next = 16;
            return (0, _nodemail["default"])(res, rows[0].first_name, password, email);

          case 16:
            _context.next = 22;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](4);

            _Utils["default"].setError(500, _context.t0.message);

            return _context.abrupt("return", _Utils["default"].send(res));

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 18]]);
  }));

  return function sendPassword(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = sendPassword;
exports["default"] = _default;