/* eslint-disable linebreak-style */
import express from 'express';

import propertyController from '../../controllers/propertyControllers';

const router = express.Router();


router.get('/', propertyController.getAllProperty);


export default router;
