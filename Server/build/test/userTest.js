"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("dotenv/config");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

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
describe('Users Authentication', function () {
  it('should check if user exists', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      first_name: 'Modupes',
      last_name: 'Grey',
      email: 'motuswit@gmail.com',
      password: 'MoBillionD',
      phone_number: '08833331011',
      address: 'Hollywood,usa'
    }).then(function (res) {
      res.should.have.status(500);
      res.body.should.be.an('object');
      res.body.should.have.keys('status', 'message');
      res.body.status.should.be.a('string');
      res.body.status.should.equal('Error');
      res.body.message.should.be.a('string');
      done();
    });
  });
  it('should check for wrong email formats', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      email: 'me.com',
      first_name: 'Jacob',
      last_name: 'Lawson',
      password: 'Jabowe1',
      address: 'No 1 Adebowale crescent lekki, Lagos',
      phone_number: '070-622-78182'
    }).then(function (res) {
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.should.have.keys('status', 'error');
      res.body.error.should.be.a('string');
      res.body.status.should.equal('Error');
      done();
    });
  });
  it('should return an error status code 400 if the email is empty', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      email: '',
      first_name: 'Jacob',
      last_name: 'doe',
      password: 'Jabowe1',
      address: 'No 1 Adebowale crescent lekki, Lagos',
      phone_number: '070-622-78182'
    }).then(function (res) {
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.should.have.keys('status', 'error');
      res.body.error.should.be.a('string');
      res.body.status.should.equal('Error');
      return done();
    });
  });
  it('should check for wrong first name formats', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      first_name: 'J-12UJN',
      email: 'test@test.com',
      last_name: 'Lawson',
      password: 'Jabowe1',
      address: 'No 1 Adebowale crescent lekki, Lagos',
      phone_number: '070-622-78182'
    }).then(function (res) {
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.should.have.keys('status', 'error');
      res.body.error.should.be.a('string');
      res.body.status.should.equal('Error');
      done();
    });
  });
  it('should return an error status code 400 if the firstname field is empty', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      email: 'jacob@gmail.com ',
      first_name: '',
      last_name: 'Lawson',
      password: 'Jabowe1',
      address: 'No 1 Adebowale crescent lekki, Lagos',
      phone_number: '070-622-78182'
    }).then(function (res) {
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.should.have.keys('status', 'error');
      res.body.error.should.be.a('string');
      res.body.status.should.equal('Error');
      return done();
    });
  });
  it('should check for wrong last name formats', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      first_name: 'Janet',
      email: 'test@test.com',
      last_name: 'i77h-d',
      password: 'Jabowe1',
      address: 'No 1 Adebowale crescent lekki, Lagos',
      phone_number: '070-622-78182'
    }).then(function (res) {
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.should.have.keys('status', 'error');
      res.body.error.should.be.a('string');
      res.body.status.should.equal('Error');
      done();
    });
  });
  it('should return an error status code 400 if the lastname is empty', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      email: 'jacob@test.com',
      first_name: 'Jacob',
      last_name: '',
      password: 'Jabowe1',
      address: 'No 1 Adebowale crescent lekki, Lagos',
      phone_number: '070-622-78182'
    }).then(function (res) {
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.should.have.keys('status', 'error');
      res.body.error.should.be.a('string');
      res.body.status.should.equal('Error');
      return done();
    });
  });
  it('should check for wrong password formats', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      first_name: 'Janet',
      email: 'test@test.com',
      last_name: 'Doe',
      password: '123',
      address: 'No 1 Adebowale crescent lekki, Lagos',
      phone_number: '070-622-78182'
    }).then(function (res) {
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.should.have.keys('status', 'error');
      res.body.error.should.be.a('string');
      res.body.status.should.equal('Error');
      done();
    });
  });
});
describe('POST /api/v1/auth/login', function () {
  it('should check if login details match user in the db', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
      email: 'janesanta@ymail.com',
      password: 'janetsanta'
    }).then(function (res) {
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.should.have.keys('status', 'error');
      res.body.error.should.be.a('string');
      res.body.status.should.equal('error');
      res.body.error.should.equal('Incorrect login details');
      done();
    });
  });
  it('should return an error status code 400 if the email is empty', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
      email: '',
      password: 'Jabowe1'
    }).then(function (res) {
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.should.have.keys('status', 'error');
      res.body.error.should.be.an('string');
      res.body.status.should.equal('Error');
      return done();
    });
  });
  it('should return an error status code 400 if the password is empty', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
      email: 'jacob@test.com',
      password: ''
    }).then(function (res) {
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.should.have.keys('status', 'error');
      res.body.error.should.be.an('string');
      res.body.status.should.equal('Error');
      return done();
    });
  });
});