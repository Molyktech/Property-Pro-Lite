"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _authHelpers = _interopRequireDefault(require("../helpers/authHelpers"));

require("dotenv/config");

_chai["default"].should();

describe('Hash password and compare password Tests', function () {
  var testResult = null;
  it('should return a string', function (done) {
    _authHelpers["default"].hashPassword("Hello").then(function (result) {
      testResult = result;

      try {
        result.should.be.a('string');
        done();
      } catch (err) {
        done(err);
      }
    });
  });
  it('should return a boolean', function (done) {
    _authHelpers["default"].comparePassword('Hello', testResult).then(function (result) {
      try {
        result.should.be.a('boolean');
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});