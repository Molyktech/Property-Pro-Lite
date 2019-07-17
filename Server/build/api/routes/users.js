"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../../middleware/users"));

var _users2 = _interopRequireDefault(require("../../controllers/users"));

var _auth = require("../../middleware/auth");

var _sendPassword = _interopRequireDefault(require("../../middleware/sendPassword"));

/* eslint-disable linebreak-style */
var router = _express["default"].Router();

router.post('/signup', _users["default"].checkIsValidBody, _users2["default"].create);
router.post('/signin', _users["default"].checkLogin, _users2["default"].login);
router.post('/:useremail/reset_password', _auth.authUser, _users["default"].checkEmail, _sendPassword["default"], _users["default"].checkPassword, _users2["default"].resetPassword);
var _default = router;
exports["default"] = _default;