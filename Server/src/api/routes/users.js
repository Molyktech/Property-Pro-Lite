/* eslint-disable linebreak-style */
import express from 'express';
import UserMiddleware from '../../middleware/users';
import User from '../../controllers/users';


const router = express.Router();


router.post('/signup', UserMiddleware.checkIsValidBody, User.create);

router.post('/signin', UserMiddleware.checkLogin, User.login);

export default router;