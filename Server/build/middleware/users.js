"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _index = _interopRequireDefault(require("../models/index"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _schemas = require("./schemas");

var _Utils = _interopRequireDefault(require("../utils/Utils"));

var UserMiddleware =
/*#__PURE__*/
function () {
  function UserMiddleware() {
    (0, _classCallCheck2["default"])(this, UserMiddleware);
  }

  (0, _createClass2["default"])(UserMiddleware, null, [{
    key: "checkIsValidBody",
    value: function checkIsValidBody(req, res, next) {
      _joi["default"].validate(req.body, _schemas.signupSchema, function (error, value) {
        if (error) {
          return res.status(400).json({
            status: 'Error',
            error: error.details[0].message
          });
        }

        return next();
      });
    }
  }, {
    key: "checkLogin",
    value: function checkLogin(req, res, next) {
      _joi["default"].validate(req.body, _schemas.loginSchema, function (error, value) {
        if (error) {
          return res.status(400).json({
            status: 'Error',
            error: error.details[0].message
          });
        }

        return next();
      });
    }
  }, {
    key: "checkEmail",
    value: function checkEmail(req, res, next) {
      var useremail = req.params.useremail;

      _joi["default"].validate(useremail, _schemas.email, function (error) {
        if (error) {
          _Utils["default"].setError(400, error.details[0].message);

          return _Utils["default"].send(res);
        }
      });

      return next();
    }
  }, {
    key: "checkPassword",
    value: function checkPassword(req, res, next) {
      _joi["default"].validate(req.body, _schemas.passwordSchema, function (error) {
        if (error) {
          _Utils["default"].setError(400, error.details[0].message);

          return _Utils["default"].send(res);
        }
      });

      return next();
    }
  }]);
  return UserMiddleware;
}();

exports["default"] = UserMiddleware;