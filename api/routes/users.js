/* eslint-disable linebreak-style */
import express from 'express';
import userController from '../../controllers/usercontroller';


const router = express.Router();


router.get('/', userController.fetchUser);

router.post('/signup', userController.createUser);

router.post('/login', userController.loginUser);


export default router;
