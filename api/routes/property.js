/* eslint-disable linebreak-style */
import express from 'express';

import propertyController from '../../controllers/propertyControllers';

const router = express.Router();


router.get('/', propertyController.getAllProperty);

router.get('/:id', propertyController.getOneProperty);

router.post('/', propertyController.createProperty);

router.patch('/:id', propertyController.updateProperty);


router.delete('/:id', propertyController.deleteProperty);


export default router;
