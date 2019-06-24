const express = require('express');

const app = express();
const propertyRoute = require('./api/routes/property');
const userRoute = require('./api/routes/users');

app.use('/users', userRoute);
app.use('/properties', propertyRoute);

module.exports = app;
