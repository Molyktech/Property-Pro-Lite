"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var connectionString = process.env.DATABASE_URL_DEV;

if (process.env.NODE_ENV == 'test') {
  connectionString = process.env.DATABASE_URL_TEST;
} else if (process.env.NODE_ENV == 'PROD') {
  connectionString = process.env.DATABASE_URL;
}

var pool = new _pg.Pool({
  connectionString: connectionString
});
pool.on('connect', function () {});
var _default = pool;
exports["default"] = _default;