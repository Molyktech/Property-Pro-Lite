"use strict";

require("dotenv/config");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var userForTest = {
  email: 'janedoe@gmail.com',
  first_name: 'jane',
  last_name: 'doe',
  password: 'janetdoe1',
  phone_number: '080-333-21212',
  address: 'trademore estate, lekki'
};
describe('Testing Token verification on protected routes', function () {
  var testToken;
  before(function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(userForTest).end(
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(err, res) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
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
  it('should return error 403 when a wrong token is used', function (done) {
    _chai["default"].request(_app["default"]).patch('/api/v1/property/1/sold').set('Authorization', "Bearer ".concat("".concat(testToken, "s"))).end(function (err, res) {
      if (err) done(err);
      res.status.should.equal(403);
      done();
    });
  });
  it('should return error 401 when there is no token provided', function (done) {
    _chai["default"].request(_app["default"]).patch('/api/v1/property/1/sold').end(function (err, res) {
      if (err) done(err);
      res.status.should.equal(401);
      done();
    });
  });
});