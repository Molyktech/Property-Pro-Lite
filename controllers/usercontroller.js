import bcrypt from 'bcryptjs';
import userService from '../Services/userService';
import users from '../models/db/userDb';

const Joi = require('@hapi/joi');


const schema = Joi.object().keys({
  firstName: Joi.string().regex(/(^[a-zA-Z]+$)/).min(2).max(30)
    .required(),
  lastName: Joi.string().regex(/(^[a-zA-Z]+$)/).min(2).max(30)
    .required(),
  // accepts alphanumeric strings at least 7 characters long
  password: Joi.string().min(7).alphanum().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
  }).required(),
  address: Joi.string().required(),
  // phone is required
  // and must be a string of the format XXX-XXX-XXXX
  // where X is a digit (0-9)
  phoneNumber: Joi.string().regex(/^\d{3}-\d{3}-\d{5}$/).required(),
});

const userController = {

  fetchUser(req, res) {
    const allUsers = userService.getAllUsers();
    return res.status(200).json({
      status: 'success',
      data: allUsers,
    });
  },

  createUser(req, res, next) {
    const newUser = Joi.validate(req.body, schema);
    if (newUser.error === null) {
      // make sure email and  is unique
      users.map((user) => {
        if (user.email === req.body.email) {
          const err = new Error('Email already exist');
          next(err);
        } else {
          // /hash password and add to db
          bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
            const {
              firstName,
              lastName,
              email,
              address,
              phoneNumber,
            } = req.body;
            const dbUser = {
              firstName,
              lastName,
              email,
              address,
              phoneNumber,
              password: hashedPassword,
            };
            const createdUser = userService.addUser(dbUser);
            return res.json({
              status: 'success',
              data: createdUser,
            });
          });
        }
      });
    } else {
      next(newUser.error);
    }
  },

};

export default userController;
