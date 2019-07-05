import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import propertyRoute from './api/routes/property';
import userRoute from './api/routes/users';
import {
  authUser,
} from './middleware/auth';

const app = express();


app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());


app.use(authUser);
// Users Routes/
app.use('/api/v1/auth', userRoute);

// Property Routes/
app.use('/api/v1/property', propertyRoute);

app.get('/', (req, res) => {
  res.send('Welcome to Property-Pro Lite');
});

// handle error the routes cant take
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Not found -${req.originalUrl}`);
  const errorFormat = {
    status: 'Error',
    error: error.message,
  };
  error.status = 404;
  next(errorFormat);
});

// handle error from anywhere else inn the app
app.use((error, req, res) => {
  res.status(res.statusCode || 500);
  res.json({
    status: 'error',
    message: error.message,
    stack: error.stack,
  });
});

export default app;
