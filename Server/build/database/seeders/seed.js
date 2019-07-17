"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var connectionString = null;
if (process.env.NODE_ENV === 'test') connectionString = process.env.DATABASE_URL_TEST;
if (process.env.NODE_ENV === 'PROD') connectionString = process.env.DATABASE_URL;
if (process.env.NODE_ENV === 'development') connectionString = process.env.DATABASE_URL_DEV;
var pool = new _pg.Pool({
  connectionString: connectionString
});
pool.on('connect', function () {
  console.log('connected to the db');
});
var data = "INSERT INTO Users(\n    first_name, \n    last_name,\n    is_admin,\n    email,\n    password,\n    address,\n    phone_number,\n    \n) VALUES(\n    'Modupe',\n    'Adebayo',\n    true,\n    'modupeadebayo001@gmail.com',\n    'IamAdmin',\n    'wuse II, abuja',\n    '07088331011'\n);\n\nINSERT INTO Properties(\n    state,\n    city,\n    type,\n    price,\n    address,\n    image_url,\n    owner,\n    created_on,\n    status,\n) VALUES(\n    'abuja',\n    'fct',\n    '2-bedroom',\n    '20000000',\n    'no 4, koforidua street, wuse abuja',\n    'https://via.placeholder.com/250/92c952',\n    1,\n    '2019-07-14 22:46:19',\n    'available'\n)";
pool.query(data).then(function (res) {
  pool.end();
})["catch"](function (err) {
  pool.end();
});