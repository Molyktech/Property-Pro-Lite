/* eslint-disable linebreak-style */
import express from 'express';
import UserMiddleware from '../../middleware/users';
import User from '../../controllers/users';
import {
    authUser
} from '../../middleware/auth';
import sendPassword from '../../middleware/sendPassword';



const router = express.Router();


router.post('/signup', UserMiddleware.checkIsValidBody, User.create);

router.post('/signin', UserMiddleware.checkLogin, User.login);

router.post('/:useremail/reset_password', UserMiddleware.checkEmail, authUser, sendPassword, UserMiddleware.checkPassword, User.resetPassword);

export default router;