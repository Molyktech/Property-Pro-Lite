/* eslint-disable linebreak-style */
import express from 'express';
import {
  authUser,
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


router.get('/', authUser, propertyController.getAllProperty);


router.get('/:id', authUser, propertyController.getOneProperty);

router.post('/', authUser, cloudinaryConfig, multerUploads, propertyValidator, propertyController.createProperty);

router.patch('/:id', authUser, cloudinaryConfig, multerUploads, propertyValidator, propertyController.updateProperty);

router.patch('/:id/sold', authUser, propertyController.soldProperty);

router.delete('/:id', authUser, propertyController.deleteProperty);


export default router;