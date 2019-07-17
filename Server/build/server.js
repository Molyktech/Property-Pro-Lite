"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./app"));

/* eslint-disable linebreak-style */
var port = process.env.PORT || 8000;

var server = _http["default"].createServer(_app["default"]);

server.listen(port, function () {
  console.log(process.env.NODE_ENV);
  console.log("server is running on ".concat(port));
});