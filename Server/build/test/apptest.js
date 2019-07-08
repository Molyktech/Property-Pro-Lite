"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _path = _interopRequireDefault(require("path"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint disable import/no-extraneous-dependencies */
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should(); // user auth test


var testToken;
describe('Home endpoint', function () {
  describe('GET /', function () {
    it('should welcome you to Property-Pro Lite', function (done) {
      _chai["default"].request(_app["default"]).get('/').end(function (err, res) {
        if (err) return done(err);
        res.text.should.be.a('string');
        done();
      });
    });
  });
});
describe('User endpoints', function () {
  describe('POST /auth', function () {
    it('should create a new user/ signup a new user to the database', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
        email: 'janed@gmail.com',
        first_name: 'Janeb',
        last_name: 'Lawson',
        password: 'Janedbso1',
        address: 'No 1 Adebowale crescent lekki, Lagos',
        phone_number: '070-622-78182'
      }).end(function (err, res) {
        if (err) return done(err);
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.keys('status', 'data');
        res.body.data.should.be.an('object');
        res.body.data.user.email.should.be.a('string');
        res.body.data.user.first_name.should.be.a('string');
        res.body.data.user.last_name.should.be.a('string');
        res.body.data.token.should.be.a('string');
        res.body.data.user.should.be.an('object');
        res.body.data.user.id.should.be.a('number');
        testToken = res.body.data.token;
        done();
      });
    });
    it('should allow a signedup user stored in the database to login', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
        email: 'janed@gmail.com',
        password: 'Janedbso1'
      }).end(function (err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.keys('status', 'data');
        res.body.data.should.be.an('object');
        res.body.data.user.email.should.be.a('string');
        res.body.data.user.first_name.should.be.a('string');
        res.body.data.user.last_name.should.be.a('string');
        res.body.data.token.should.be.a('string');
        res.body.data.user.should.be.an('object');
        res.body.data.user.id.should.be.a('number');
        done();
      });
    });
  });
}); // property test

describe('Property endpoints', function () {
  describe('GET, POST /property', function () {
    it('should create and a save a property advert provided by registered user to the db', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/property').set('Authorization', "Bearer ".concat(testToken)).field('price', 5000000).field('state', 'Lagos').field('city', 'Lekki').field('address', 'No 1 Admiralty way,Lekki').field('type', '2 bedroom').field('status', 'available').attach('image', _path["default"].join("".concat(__dirname, "/images/apartments.jpg"))).end(function (err, res) {
        if (err) done(err);
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.keys('status', 'data');
        res.body.data.should.be.an('object');
        res.body.data.state.should.be.a('string');
        res.body.data.city.should.be.a('string');
        res.body.data.address.should.be.a('string');
        res.body.data.type.should.be.a('string');
        res.body.data.status.should.be.a('string');
        res.body.data.price.should.be.a('number');
        res.body.data.id.should.be.a('number');
        res.body.data.image_url.should.be.a('string');
        done();
      });
    });
    it('should update property advert previously created by the user', function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/property/2').set('Authorization', "Bearer ".concat(testToken)).field('price', 5000000).field('state', 'Lagos').field('city', 'Lekki').field('address', 'No 1 Admiralty way,Lekki').field('type', '2 bedroom').field('status', 'available').attach('image', _path["default"].join("".concat(__dirname, "/images/apartments.jpg"))).end(function (err, res) {
        if (err) done(err);
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.keys('status', 'data');
        res.body.data.should.be.an('object');
        res.body.data.state.should.be.a('string');
        res.body.data.city.should.be.a('string');
        res.body.data.address.should.be.a('string');
        res.body.data.type.should.be.a('string');
        res.body.data.status.should.be.a('string');
        res.body.data.price.should.be.a('number');
        res.body.data.id.should.be.a('number');
        res.body.data.image_url.should.be.a('string');
        done();
      });
    }); // update property as sold

    it('should update a property advert posted by the user as sold', function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/property/2/sold').set('Authorization', "Bearer ".concat(testToken)).end(function (err, res) {
        if (err) done(err);
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.keys('status', 'data');
        res.body.data.should.be.an('object');
        res.body.data.state.should.be.a('string');
        res.body.data.city.should.be.a('string');
        res.body.data.address.should.be.a('string');
        res.body.data.type.should.be.a('string');
        res.body.data.status.should.be.a('string');
        res.body.data.price.should.be.a('number');
        res.body.data.id.should.be.a('number');
        res.body.data.image_url.should.be.a('string');
        done();
      });
    });
    it('should get all property record', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/property').end(function (err, res) {
        if (err) done(err);
        res.body.should.have.keys('status', 'data');
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.data[0].id.should.be.a('number');
        res.body.data[0].status.should.be.a('string');
        res.body.data[0].state.should.be.a('string');
        res.body.data[0].type.should.be.a('string');
        res.body.data[0].city.should.be.a('string');
        res.body.data[0].address.should.be.a('string');
        res.body.data[0].image_url.should.be.a('string');
        res.body.data[0].price.should.be.a('number');
        res.body.data[0].owner_email.should.be.a('string');
        res.body.data[0].owner_phone_number.should.be.a('string');
        done();
      });
    });
    it('should get all property advert of a specific type posted on the application', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/property?type=1 bedroom').end(function (err, res) {
        if (err) done(err);
        res.body.should.have.keys('status', 'data');
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.data[0].id.should.be.a('number');
        res.body.data[0].status.should.be.a('string');
        res.body.data[0].state.should.be.a('string');
        res.body.data[0].type.should.be.a('string');
        res.body.data[0].city.should.be.a('string');
        res.body.data[0].address.should.be.a('string');
        res.body.data[0].image_url.should.be.a('string');
        res.body.data[0].price.should.be.a('number');
        res.body.data[0].owner_email.should.be.a('string');
        res.body.data[0].owner_phone_number.should.be.a('string');
        done();
      });
    }); // test to get a single property

    it('should get a single property record', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/property/1').end(function (err, res) {
        if (err) done(err);
        res.body.should.have.keys('status', 'data');
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.data.id.should.be.a('number');
        res.body.data.status.should.be.a('string');
        res.body.data.state.should.be.a('string');
        res.body.data.type.should.be.a('string');
        res.body.data.city.should.be.a('string');
        res.body.data.address.should.be.a('string');
        res.body.data.image_url.should.be.a('string');
        res.body.data.price.should.be.a('number');
        res.body.data.owner_email.should.be.a('string');
        res.body.data.owner_phone_number.should.be.a('string');
        done();
      });
    }); // for failure to get a single record

    it('should not get a property and return a message indicating why', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/property/9').end(function (err, res) {
        res.body.should.have.keys('status', 'error');
        res.should.have.status(404);
        res.body.should.be.an('object');
        res.body.status.should.be.a('string');
        res.body.error.should.be.an('string');
        res.body.error.should.equal('Property does not exist');
        done();
      });
    }); // delete a property

    it('should delete a property advert provided by the user', function (done) {
      _chai["default"].request(_app["default"])["delete"]('/api/v1/property/2').set('Authorization', "Bearer ".concat(testToken)).end(function (err, res) {
        if (err) done(err);
        res.body.should.have.keys('status', 'data');
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.status.should.be.a('string');
        res.body.data.should.be.an('object');
        res.body.data.message.should.be.an('string');
        done();
      });
    }); // /handle delete error

    it('should not delete a property and return a message indicating why ', function (done) {
      _chai["default"].request(_app["default"])["delete"]('/api/v1/property/10').set('Authorization', "Bearer ".concat(testToken)).end(function (err, res) {
        if (err) done(err);
        res.body.should.have.keys('status', 'error');
        res.should.have.status(404);
        res.body.should.be.an('object');
        res.body.status.should.be.a('string');
        res.body.error.should.be.an('string');
        res.body.error.should.equal('Property not found');
        done();
      });
    });
  });
});