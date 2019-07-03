/* eslint-disable camelcase */
import bcrypt from 'bcryptjs';
import userService from '../Services/userService';
import users from '../models/db/userDb';
import {
  signupSchema,
} from '../middleware.js/schemas';
import {
  createTokenAndSend,
} from '../middleware.js/helpers';

const Joi = require('@hapi/joi');

const userController = {

  fetchUser(req, res) {
    const allUsers = userService.getAllUsers();
    return res.status(200).json({
      status: 'success',
      data: allUsers,
    });
  },

  createUser(req, res, next) {
    const newUser = Joi.validate(req.body, signupSchema);
    if (newUser.error === null) {
      // make sure email and is unique
      users.map((user) => {
        if (user.email === req.body.email) {
          const err = new Error('Email already exist');
          next(err);
        } else {
          // /hash password and add to db
          bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
            const {
              first_name,
              last_name,
              email,
              address,
              phone_number,
            } = req.body;
            const dbUser = {
              first_name,
              last_name,
              email,
              address,
              phone_number,
              password: hashedPassword,
            };
            const createdUser = userService.addUser(dbUser);
            Object.defineProperty(createdUser, 'password', {
              writable: true,
              enumerable: false,
            });
            return createTokenAndSend(createdUser, res);
          });
        }
      });
    } else {
      res.status(422);
      next(newUser.error);
    }
  },


};

export default userController;
