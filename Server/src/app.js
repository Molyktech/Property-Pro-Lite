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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(authUser);
// Users Routes/
app.use('/api/v1/auth', userRoute);

// Property Routes/
app.use('/api/v1/property', propertyRoute);

app.get('/', (req, res) => {
  res.send('Welcome to Property-Pro Lite');
});


export default app;