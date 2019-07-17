"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("dotenv/config");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var user = {
  email: 'fiyin@ymail.com',
  first_name: 'fiyin',
  last_name: 'jacobs',
  password: 'Fiyjayc22',
  phoneNumber: '080-4562-1114',
  address: 'Festac, Lagos'
};
describe('Testing validators', function () {
  before(function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(user).end(function (err, res) {
      if (err) return done(err);
      return done();
    });
  });
  it('should return an error status code 500 if the email already exists', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send(user).end(function (err, res) {
      if (err) return done(err);
      res.should.have.status(400);
      res.body.should.have.property('status');
      res.body.should.be.an('object');
      res.body.status.should.equal('Error');
      res.body.should.have.keys('status', 'error');
      return done();
    });
  });
});