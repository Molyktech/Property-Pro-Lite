"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv/config");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var testToken;
describe("Testing Token verification on protected routes", function () {
  before(function (done) {
    _chai["default"].request(_app["default"]).post("/api/v1/auth/signin").send({
      email: 'motuswit@gmail.com',
      password: 'MogotTrillions'
    }).end(
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(err, res) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return res.body.data.token;

              case 2:
                testToken = _context.sent;

                if (!err) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", done(err));

              case 5:
                return _context.abrupt("return", done());

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  });
  it("should return error 403 when there is no token provided", function (done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/property/1/sold").end(function (err, res) {
      if (err) done(err);
      res.status.should.equal(403);
      done();
    });
  });
});