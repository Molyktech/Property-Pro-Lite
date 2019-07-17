"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _property = _interopRequireDefault(require("./api/routes/property"));

var _users = _interopRequireDefault(require("./api/routes/users"));

var _swagger = _interopRequireDefault(require("../swagger.json"));

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"]));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); // Users Routes/

app.use('/api/v1/auth', _users["default"]); // Property Routes/

app.use('/api/v1/property', _property["default"]);
app.get('/', function (req, res) {
  res.send('Welcome to Property-Pro Lite');
});
var _default = app;
exports["default"] = _default;