/* eslint-disable class-methods-use-this */
import {
  Pool
} from "pg";
import dotenv from "dotenv";

import {
  imageUpload
} from "../middleware/multer";

import db from "../models/index";
import Util from "../utils/Utils";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

class Property {
  async createProperty(req, res) {
    try {
      let imageUrl = "https://via.placeholder.com/250/92c952";
      if (req.file) {
        const fileUrl = await imageUpload(req);
        if (fileUrl) {
          imageUrl = fileUrl;
        } else {
          imageUrl = "https://via.placeholder.com/250/92c952";
        }
      }

      const {
        price,
        state,
        city,
        address,
        type
      } = req.body;
      const createQuery = `INSERT INTO Properties( price, state, city, address, type, image_url, owner)
    VALUES( $1, $2, $3, $4, $5, $6, $7)  returning *`;

      const values = [price, state, city, address, type, imageUrl, req.user.id];

      const {
        rows
      } = await db.query(createQuery, values);
      if (rows) {
        const data = {
          ...rows[0]
        };
        Util.setSuccess(201, "Property created succesfully", data);
        return Util.send(res);
      }
      Util.setError(400, "failed");
      return Util.send(res);
    } catch (error) {
      Util.setError(500, error.message);
      return Util.send(res);
    }
  }

  async getAllProperty(req, res) {
    try {
      const findTables =
        "SELECT Properties.id, Properties.state, Properties.city, Properties.type, Properties.status, Properties.address, Properties.price, Properties.created_on, Properties.image_url, Users.email AS ownerEmail, Users.phone_number AS ownerPhoneNumber FROM Users JOIN Properties ON Users.id = Properties.owner";
      if (req.query.type) {
        const {
          type
        } = req.query;
        const queryTables = `SELECT Properties.id, Properties.state, Properties.city, Properties.type, Properties.status, Properties.address, Properties.price, Properties.created_on, Properties.image_url, Users.email AS ownerEmail, Users.phone_number AS ownerPhoneNumber FROM Users JOIN Properties ON Properties.owner = Users.id WHERE type = '${type}'`;
        const {
          rows,
          rowCount
        } = await pool.query(queryTables);
        if (!rows.length) {
          Util.setError(404, "No property found");
          return Util.send(res);
        }
        const data = {
          ...rows
        };

        Util.setSuccess(200, "Succesful", {
          data,
          rowCount
        });
        return Util.send(res);
      }

      const {
        rows,
        rowCount
      } = await pool.query(findTables);
      if (!rows.length) {
        Util.setError(404, "No property found");
        return Util.send(res);
      }

      Util.setSuccess(200, "Success", {
        ...rows,
        rowCount
      });
      return Util.send(res);
    } catch (error) {

      Util.setError(500, error.message);
      return Util.send(res);
    }
  }



  async getOneProperty(req, res) {
    const id = req.params.id;
    console.log(id);
    const queryTables = `SELECT Properties.id, Properties.state, Properties.city, Properties.type, Properties.status, Properties.address, Properties.price, Properties.created_on, Properties.image_url, Users.email AS ownerEmail, Users.phone_number AS ownerPhoneNumber FROM Users JOIN Properties ON Users.id = Properties.owner WHERE Properties.id = ${id}`;
    try {
      const property = await pool.query(queryTables);
      console.log(property.rowCount);

      if (property.rowCount < 1) {
        Util.setError(404, 'Property not found');
        return Util.send(res);
      }

      Util.setSuccess(200, `Found Property with an id of ${req.params.id}`, property.rows[0]);
      return Util.send(res);
    } catch (error) {

      Util.setError(500, error.message)
      return Util.send(res);
    }
  }

  async updateProperty(req, res) {
    const {
      state,
      city,
      address,
      type,
      price
    } = req.body;
    const id = parseInt(req.params.id);
    let imageUrl;
    if (req.file) {
      const fileUrl = await imageUpload(req);
      if (fileUrl) {
        imageUrl = fileUrl;
      } else {
        imageUrl = "https://via.placeholder.com/250/92c952";
      }
    }
    const findOneQuery =
      "SELECT * FROM Properties WHERE id = $1 AND owner = $2";
    const updateOneQuery = `UPDATE Properties SET state = $1, price = $2, address = $3, city = $4, type = $5, image_url = $6 WHERE id = $7 AND owner = $8 returning *`;
    try {
      const {
        rows
      } = await db.query(findOneQuery, [
        parseInt(req.params.id),
        req.user.id
      ]);
      if (!rows[0]) {
        Util.setError(
          404,
          "Property not found, input a correct id and try again"
        );
        return Util.send(res);
      }
      const values = [
        state || rows[0].state,
        price || rows[0].price,
        address || rows[0].address,
        city || rows[0].city,
        type || rows[0].type,
        imageUrl || rows[0].image_url,
        id,
        req.user.id
      ];

      const response = await db.query(updateOneQuery, values);
      Util.setSuccess(200, "Update Successful", response.rows[0]);
      return Util.send(res);
    } catch (error) {
      Util.setError(500, error.message);
      return Util.send(res);
    }
  }

  async soldProperty(req, res) {
    const id = parseInt(req.params.id);
    const findOneQuery =
      "SELECT * FROM Properties WHERE id = $1 AND owner = $2";
    const updateOneQuery = `UPDATE Properties SET status = $1 WHERE id = $2 AND owner = $3 returning *`;
    try {
      const {
        rows
      } = await db.query(findOneQuery, [id, req.user.id]);
      if (!rows[0]) {
        Util.setError(
          404,
          "Property not found, input a correct id and try again"
        );
        return Util.send(res);
      }
      const values = ["sold", id, req.user.id];

      const response = await db.query(updateOneQuery, values);
      Util.setSuccess(200, "Status update Successful", response.rows[0]);
      return Util.send(res);
    } catch (error) {
      Util.setError(500, error.message);
      return Util.send(res);
    }
  }

  async deleteProperty(req, res) {
    const id = parseInt(req.params.id);

    const deleteQuery =
      "DELETE FROM Properties WHERE id = $1 AND owner = $2 returning *";
    try {
      const {
        rows
      } = await db.query(deleteQuery, [id, req.user.id]);
      if (!rows[0]) {
        Util.setError(404, "Property not found");
        return Util.send(res);
      }
      Util.setSuccess(200, "Property DELETED");
      return Util.send(res);
    } catch (error) {

      Util.setError(500, error.message);
      return Util.send(res);
    }
  }
}

const propertyController = new Property();
export default propertyController;