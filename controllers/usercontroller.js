/* eslint-disable camelcase */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userService from '../Services/userService';
import users from '../models/db/userDb';
import {
  loginSchema,
  signupSchema,
} from '../middleware.js/schemas';
import {
  createTokenAndSend,
  responseError,
  dataError,
} from '../middleware.js/helpers';
import authUser from '../middleware.js/auth';

const Joi = require('@hapi/joi');

const userController = {

  fetchUser(req, res) {
    const allUsers = userService.getAllUsers();
    return res.status(200).json({
      status: 'success',
      data: allUsers,

      // return user object from the token if the user is loggedin
      user: req.user,

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
            return createTokenAndSend(createdUser, res, 201);
          });
        }
      });
    } else {
      res.status(422);
      next(newUser.error);
    }
  },

  loginUser(req, res) {
    const newUser = Joi.validate(req.body, loginSchema);
    let foundUser;
    if (newUser.error === null) {
      // query the db for the user
      users.filter((user) => {
        if (user.email === req.body.email) {
          foundUser = user;
        }
        return foundUser;
      });

      if (foundUser) {
        // woot woot compare password
        bcrypt.compare(req.body.password, foundUser.password).then((result) => {
          if (result) {
            // correct password
            createTokenAndSend(foundUser, res, 200);
          } else {
            // throw error
            responseError(res);
          }
        });
      } else {
        responseError(res);
      }
    } else {
      dataError(res, newUser);
    }
  },


};

export default userController;
