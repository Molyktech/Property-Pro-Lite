/* eslint-disable linebreak-style */
import express from 'express';
import {

  authLoggedIn,
} from '../../middleware/auth';

import propertyController from '../../controllers/propertyControllers';

const router = express.Router();


router.get('/', propertyController.getAllProperty);

router.get('/:id', propertyController.getOneProperty);

router.post('/', authLoggedIn, propertyController.createProperty);

router.patch('/:id', authLoggedIn, propertyController.updateProperty);

router.patch('/:id/sold', authLoggedIn, propertyController.soldProperty);

router.delete('/:id', authLoggedIn, propertyController.deleteProperty);


export default router;
