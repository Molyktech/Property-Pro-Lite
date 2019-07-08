"use strict";

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
var port = process.env.PORT || 8080;

var server = _http["default"].createServer(_app["default"]);

server.listen(port, function () {
  console.log("server is running on ".concat(port));
});