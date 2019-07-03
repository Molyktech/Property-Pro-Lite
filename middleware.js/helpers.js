import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import users from '../models/db/userDb';

dotenv.config();
export const getNewId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  }
  return 1;
};
export const newDate = () => new Date().toString();


export const verrifyUserExist = (req, res, next) => {
  const {
    email,
  } = req.body.email;

  const error = {};
  users.filter(user => user.email === email)
    .then((user) => {
      if (user && user.length > 0) {
        error.user = 'This email already exist in our server try signing in';

        return res.status(400).json({
          error,
        });
      }
      return next();
    });
};

export const responseError = (res) => {
  res.status(401).json({
    status: 'error',
    message: 'Invalid login details, wrong email/password',

  });
};


export const dataError = (res, data) => {
  res.status(422).json({
    status: 'error',
    message: 'Invalid login details',
    error: data.error,
  });
};
export const createTokenAndSend = (user, res) => {
  const payload = {
    id: user.id,
    email: user.email,
  };

  jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: '1d',
  },
  (err, token) => {
    if (err) {
      res.status(400).json({
        status: 'error',
        error: err,
      });
    } else {
      res.status(201).json({
        status: 'success',
        data: {
          token,
          user,

        },
      });
    }
  });
};
