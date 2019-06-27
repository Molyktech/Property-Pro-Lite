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

  getOneProperty(req, res) {
    const id = parseInt(req.params.id, 10);
    db.forEach((property) => {
      if (property.id === id) {
        return res.status(200).json({
          status: 'Success',
          data: property,

        });
      }
    });
    return res.status(404).json({
      status: 'Error',
      error: 'Property does not exist',
    });
  }
}


const propertyController = new Property();
export default propertyController;
