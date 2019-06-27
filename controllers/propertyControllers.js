/* eslint-disable class-methods-use-this */

import db from '../models/db/propertyDb';
import {
  isEmpty,
  isNumber,
} from '../api/validator';

class Property {
  getAllProperty(req, res) {
    return res.status(200).json({
      status: 'Success',
      data: db,
    });
  }
}


const propertyController = new Property();
export default propertyController;
