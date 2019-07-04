/* eslint-disable class-methods-use-this */

import db from '../models/db/propertyDb';

import {
  isEmpty,
  isNumber,
} from '../api/validator';

class Property {
  getAllProperty(req, res) {
    if (req.query.type) {
      const filteredProperty = db.filter(property => property.type.includes(`${req.query.type}`));
      return res.status(201).json({
        status: 'success',
        data: filteredProperty,
      });
    }
    return res.status(200).json({
      status: 'Success',
      data: db,

    });
  }

  getOneProperty(req, res) {
    const id = parseInt(req.params.id, 10);
    const foundProperty = db.find(property => property.id === id);

    if (foundProperty) {
      return res.status(200).json({
        status: 'Success',
        data: foundProperty,
      });
    }
    return res.status(404).json({
      status: 'Error',
      error: 'Property does not exist',
    });
  }

  createProperty(req, res) {
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

    const newProperty = {
      id: db.length + 1,
      owner: req.user.id,
      status: req.body.status,
      state: req.body.state,
      price: req.body.price,
      city: req.body.city,
      address: req.body.address,
      type: req.body.type,
      created_on: req.body.created_on,
      reason: req.body.reason,
      description: req.body.description,
      owner_email: req.user.email,
      owner_phone_number: req.user.phone_number,
    };
    const filterdb = db.find(property => property.address === req.body.address);

    if (!filterdb) {
      db.push(newProperty);

      return res.status(200).json({
        status: 'Success',
        data: newProperty,
      });
    }
    res.status(400).json({
      status: 'Error',
      message: 'a property advert has already been created with this address',
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
      owner: req.user.id || foundProperty.owner,
      status: req.body.status || foundProperty.status,
      state: req.body.state || foundProperty.state,
      price: req.body.price || foundProperty.price,
      city: req.body.city || foundProperty.city,
      address: req.body.address || foundProperty.address,
      type: req.body.type || foundProperty.type,
      created_on: req.body.created_on || foundProperty.created_on,
      reason: req.body.reason || foundProperty.reason,
      description: req.body.description || foundProperty.description,
      owner_email: req.user.email || foundProperty.owner_email,
      owner_phone_number: req.user.phone_number || foundProperty.owner_phone_number,
    };

    db.splice(propertyIndex, 1, updatedProperty);
    return res.status(201).json({
      status: 'success',
      data: updatedProperty,
    });
  }

  soldProperty(req, res) {
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
        status: 'error',
        data: {
          message: 'property not found',
        },
      });
    }
    const updatedProperty = {
      id: foundProperty.id,
      owner: foundProperty.owner,
      status: req.body.status || 'sold',
      state: foundProperty.state,
      price: foundProperty.price,
      city: foundProperty.city,
      address: foundProperty.address,
      type: foundProperty.type,
      created_on: foundProperty.created_on,
      reason: foundProperty.reason,
      description: foundProperty.description,
      owner_email: foundProperty.owner_email,
      owner_phone_number: foundProperty.owner_phone_number,
    };

    db.splice(propertyIndex, 1, updatedProperty);
    return res.status(201).json({
      status: 'success',
      data: updatedProperty,
    });
  }

  deleteProperty(req, res) {
    const id = parseInt(req.params.id, 10);
    db.map((property, index) => {
      if (property.id === id) {
        db.splice(index, 1);
        return res.status(200).json({
          status: 'Success',
          data: {
            message: 'Property deleted',
          },
        });
      }
    });
    return res.status(404).json({
      status: 'Error',
      error: 'Property not found',
    });
  }
}

const propertyController = new Property();
export default propertyController;
