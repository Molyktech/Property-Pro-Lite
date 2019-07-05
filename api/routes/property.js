/* eslint-disable linebreak-style */
import express from 'express';
import {

  authLoggedIn,
} from '../../middleware/auth';
import {
  multerUploads,
} from '../../middleware/multer';

import {
  propertyValidator,
} from '../../middleware/schemas';
import {
  cloudinaryConfig,
} from '../../config/cloudinaryConfig';


import propertyController from '../../controllers/propertyControllers';

const router = express.Router();


router.get('/', propertyController.getAllProperty);

router.get('/:id', propertyController.getOneProperty);

router.post('/', authLoggedIn, cloudinaryConfig, multerUploads, propertyValidator, propertyController.createProperty);

router.patch('/:id', authLoggedIn, multerUploads, cloudinaryConfig, propertyValidator, propertyController.updateProperty);

router.patch('/:id/sold', authLoggedIn, propertyController.soldProperty);

router.delete('/:id', authLoggedIn, propertyController.deleteProperty);


export default router;
