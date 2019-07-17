"use strict";

var _require = require('pg'),
    Pool = _require.Pool;

var dotenv = require('dotenv');

dotenv.config();
var connectionString = null;
if (process.env.NODE_ENV === 'test') connectionString = process.env.DATABASE_URL_TEST;
if (process.env.NODE_ENV === 'PROD') connectionString = process.env.DATABASE_URL_PROD;
if (process.env.NODE_ENV === 'development') connectionString = process.env.DATABASE_URL;
console.log(connectionString);
var pool = new Pool({
  connectionString: connectionString
});
pool.on('connect', function () {
  console.log('connected to the db');
  console.log(connectionString);
});
/*** CREATE TABLES */

var queryText = "DROP TABLE IF EXISTS Properties, Users CASCADE;\n     \n        CREATE TABLE \n     Users(\n        id SERIAL PRIMARY KEY NOT NULL,\n        first_name VARCHAR NOT NULL,\n        last_name VARCHAR NOT NULL,\n        email VARCHAR UNIQUE NOT NULL,\n        password VARCHAR NOT NULL,\n        phone_number VARCHAR NOT NULL,\n        address VARCHAR NOT NULL,\n        is_admin BOOLEAN DEFAULT FALSE\n\n     );\n\n     CREATE TABLE Properties (\n        id SERIAL PRIMARY KEY NOT NULL,\n        owner INTEGER REFERENCES Users(id) NOT NULL,\n        status VARCHAR(45) DEFAULT 'available',\n        price FLOAT NOT NULL,\n        state VARCHAR(45) NOT NULL,\n        city VARCHAR NOT NULL,\n        address TEXT NOT NULL,\n        type VARCHAR(128) NOT NULL,\n        created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n        image_url TEXT NOT NULL\n        \n    );\n     \n     ";
pool.query(queryText).then(function (res) {
  console.log(res);
  pool.end();
})["catch"](function (err) {
  console.log(err);
  pool.end();
});