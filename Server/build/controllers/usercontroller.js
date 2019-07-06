"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _userService = _interopRequireDefault(require("../Services/userService"));

var _userDb = _interopRequireDefault(require("../models/db/userDb"));

var _schemas = require("../middleware/schemas");

var _helpers = require("../middleware/helpers");

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable camelcase */
var Joi = require('@hapi/joi');

var userController = {
  fetchUser: function fetchUser(req, res) {
    var allUsers = _userService["default"].getAllUsers();

    return res.status(200).json({
      status: 'success',
      data: allUsers,
      // return user object from the token if the user is loggedin
      user: req.user
    });
  },
  createUser: function createUser(req, res) {
    var newUser = Joi.validate(req.body, _schemas.signupSchema);

    if (newUser.error === null) {
      // make sure email and is unique
      _userDb["default"].map(function (user) {
        if (user.email === req.body.email) {
          var err = new Error('User with that email already exists');
          (0, _helpers.userExist)(res, err);
        } else {
          // /hash password and add to db
          _bcryptjs["default"].hash(req.body.password, 12).then(function (hashedPassword) {
            var _req$body = req.body,
                first_name = _req$body.first_name,
                last_name = _req$body.last_name,
                email = _req$body.email,
                address = _req$body.address,
                phone_number = _req$body.phone_number;
            var dbUser = {
              first_name: first_name,
              last_name: last_name,
              email: email,
              address: address,
              phone_number: phone_number,
              password: hashedPassword
            };

            var createdUser = _userService["default"].addUser(dbUser);

            Object.defineProperty(createdUser, 'password', {
              writable: true,
              enumerable: false
            });
            return (0, _helpers.createTokenAndSend)(createdUser, res, 201);
          });
        }
      });
    } else {
      res.status(422).json({
        status: 'Error',
        error: newUser.error
      });
    }
  },
  loginUser: function loginUser(req, res) {
    var newUser = Joi.validate(req.body, _schemas.loginSchema);
    var foundUser;

    if (newUser.error === null) {
      // query the db for the user
      _userDb["default"].filter(function (user) {
        if (user.email === req.body.email) {
          foundUser = user;
        }

        return foundUser;
      });

      if (foundUser) {
        // woot woot compare password
        _bcryptjs["default"].compare(req.body.password, foundUser.password).then(function (result) {
          if (result) {
            // correct password
            (0, _helpers.createTokenAndSend)(foundUser, res, 200);
          } else {
            // throw error
            (0, _helpers.responseError)(res);
          }
        });
      } else {
        (0, _helpers.responseError)(res);
      }
    } else {
      (0, _helpers.dataError)(res, newUser);
    }
  }
};
var _default = userController;
exports["default"] = _default;