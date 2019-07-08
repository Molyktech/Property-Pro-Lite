"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _property = _interopRequireDefault(require("./api/routes/property"));

var _users = _interopRequireDefault(require("./api/routes/users"));

var _auth = require("./middleware/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
app.use(_auth.authUser); // Users Routes/

app.use('/api/v1/auth', _users["default"]); // Property Routes/

app.use('/api/v1/property', _property["default"]);
app.get('/', function (req, res) {
  res.send('Welcome to Property-Pro Lite');
});
var _default = app;
exports["default"] = _default;