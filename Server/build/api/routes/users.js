"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _usercontroller = _interopRequireDefault(require("../../controllers/usercontroller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
var router = _express["default"].Router();

router.get('/', _usercontroller["default"].fetchUser);
router.post('/signup', _usercontroller["default"].createUser);
router.post('/signin', _usercontroller["default"].loginUser);
var _default = router;
exports["default"] = _default;