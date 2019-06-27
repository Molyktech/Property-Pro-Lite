import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import propertyRoute from './api/routes/property';
import userRoute from './api/routes/users';

const app = express();


app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());

// handle CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, x-Requested-With, Content-Type, Accept, Authorization',
//   );
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//     return res.status(200).json({});
//   }
// });

// Users Routes/
app.use('/api/v1/auth', userRoute);

// Property Routes/
app.use('/api/v1/property', propertyRoute);

// handle error the routes cant take
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Not found -${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// handle error from anywhere else inn the app
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      status: 'error',
      error: error.message,
    },
  });
});

export default app;
