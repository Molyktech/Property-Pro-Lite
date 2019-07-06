"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _userDb = _interopRequireDefault(require("../models/db/userDb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userFunctions = {
  getAllUsers: function getAllUsers() {
    var allUsers = _userDb["default"].map(function (user) {
      var newUser = new _userModel["default"]();
      newUser.id = user.id;
      newUser.is_admin = user.is_admin;
      newUser.first_name = user.first_name;
      newUser.last_name = user.last_name;
      newUser.email = user.email;
      newUser.password = user.password;
      newUser.address = user.address;
      newUser.phone_number = user.phone_number;
      return newUser;
    });

    return allUsers;
  },
  addUser: function addUser(details) {
    var userLength = _userDb["default"].length;
    var newId = userLength + 1;
    details.id = newId;
    details.is_admin = false;

    _userDb["default"].push(details);

    return details;
  }
};
var _default = userFunctions;
exports["default"] = _default;