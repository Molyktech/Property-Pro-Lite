/* eslint-disable class-methods-use-this */

import db from '../models/db/propertyDb';
import {
  imageUpload,
} from '../middleware/multer';
import {
  newDate,
} from '../middleware/helpers';

class Property {
  getAllProperty(req, res) {
    if (req.query.type) {
      const filteredProperty = db.filter(property => property.type.includes(`${req.query.type}`));
      return res.status(200).json({
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

  async createProperty(req, res) {
    let imageUrl;
    if (req.file) {
      const fileUrl = await imageUpload(req);
      if (fileUrl) {
        imageUrl = fileUrl;
      } else {
        imageUrl = 'https://via.placeholder.com/250/92c952';
      }
    }

    const newProperty = {
      id: db.length + 1,
      owner: req.user.id,
      status: req.body.status || 'available',
      state: req.body.state,
      price: req.body.price,
      city: req.body.city,
      address: req.body.address,
      type: req.body.type,
      created_on: newDate(),
      reason: req.body.reason,
      description: req.body.description,
      image_url: imageUrl,
      owner_email: req.user.email,
      owner_phone_number: req.user.phone_number,
    };
    const filterdb = db.find(property => property.address === req.body.address);

    if (!filterdb) {
      db.push(newProperty);

      return res.status(201).json({
        status: 'Success',
        data: newProperty,
      });
    }
    res.status(409).json({
      status: 'Error',
      error: 'a property advert has already been created with this address',
    });
  }


  async updateProperty(req, res) {
    let imageUrl;
    if (req.file) {
      const fileUrl = await imageUpload(req);
      if (fileUrl) {
        imageUrl = fileUrl;
      } else {
        imageUrl = 'https://via.placeholder.com/250/92c952';
      }
    }
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
      image_url: imageUrl || foundProperty.image_url,
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
      status: 'sold',
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
      image_url: foundProperty.image_url,
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