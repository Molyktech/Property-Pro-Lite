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

  updateProperty(req, res) {
    const id = parseInt(req.params.id, 10);
    let foundProperty;
    let propertyIndex;
    db.map((property, index) => {
      if (property.id === id) {
        foundProperty = property;
        propertyIndex = index;
      }
    });
    if (!foundProperty) {
      return res.status(404).json({
        status: 'Error',
        error: 'Property not found',

      });
    }
    if (!isEmpty(req.body.status)) {
      return res.status(400).json({
        status: 'Error',
        error: 'Status is required',
      });
    }
    if (!isEmpty(req.body.state)) {
      return res.status(400).json({
        status: 'Error',
        error: 'State is required',
      });
    }
    if (!isEmpty(req.body.city)) {
      return res.status(400).json({
        status: 'Error',
        error: 'City is required',
      });
    }
    if (!isEmpty(req.body.address)) {
      return res.status(400).json({
        status: 'Error',
        error: 'Address is required',
      });
    }
    if (!isEmpty(req.body.type)) {
      return res.status(400).json({
        status: 'Error',
        error: 'type is required',
      });
    }
    if (!isNumber(req.body.price) || !isEmpty(req.body.price)) {
      return res.status(400).json({
        status: 'Error',
        error: 'Price is required and should be a number',
      });
    }

    const updatedProperty = {
      id: foundProperty.id,
      owner: req.body.owner || foundProperty.owner,
      status: req.body.status || foundProperty.status,
      state: req.body.state || foundProperty.state,
      price: req.body.price || foundProperty.price,
      city: req.body.city || foundProperty.city,
      address: req.body.address || foundProperty.address,
      type: req.body.type || foundProperty.type,
      created_on: req.body.created_on || foundProperty.created_on,
      reason: req.body.reason || foundProperty.reason,
      description: req.body.description || foundProperty.description,
    };

    db.splice(propertyIndex, 1, updatedProperty);
    return res.status(201).json({
      status: 'sucsess',
      data: updatedProperty,
    });
  }
}


const propertyController = new Property();
export default propertyController;
