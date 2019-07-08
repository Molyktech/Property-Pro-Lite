"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authLoggedIn = exports.authUser = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// express middleware to check for token and pull a user out of it and if not just move along
var authUser = function authUser(req, res, next) {
  var authHeader = req.get('authorization');

  if (authHeader && req.headers.authorization.split(' ')[0] === 'Bearer') {
    var token = req.headers.authorization.split(' ')[1];

    if (token) {
      _jsonwebtoken["default"].verify(token, process.env.TOKEN_SECRET, function (error, payload) {
        if (error) {
          res.status(403).json({
            status: 'error',
            error: error,
            message: 'No access token'
          });
        }

        req.user = payload;
      });
    } else {
      next();
    }

    next();
  } else {
    next();
  }
};

exports.authUser = authUser;

var authLoggedIn = function authLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    var error = new Error('Un-Authorised');
    res.status(401);
    next(error);
  }
};

exports.authLoggedIn = authLoggedIn;