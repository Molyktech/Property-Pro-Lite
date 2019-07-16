import jwt from 'jsonwebtoken';
import Util from '../utils/Utils';
import db from '../models/index';
import dotenv from 'dotenv';

dotenv.config();

// express middleware to check for token and pull a user out of it and if not just move along

const authUser = async (req, res, next) => {
  try {
    let token;
    let decoded;
    const authHeader = req.get('authorization')
    if (!authHeader) {
      Util.setError(403, 'UnAuthorised');
      Util.send(res);
      next();
    }

    token = authHeader.split(' ')[1];
    if (token) {

      decoded = await jwt.verify(token, process.env.TOKEN_SECRET);

      const text = 'SELECT * FROM Users WHERE id = $1';
      const {
        rows
      } = await db.query(text, [decoded.id]);
      if (!rows[0]) {
        Util.setError(400, 'Invalid Token');
        Util.send(res);
        next();

      }
      req.user = {
        id: decoded.id,
        email: decoded.email,
        phone_number: decoded.phone_number,
        is_admin: decoded.is_admin
      };
      next();

    }

  } catch (error) {
    Util.setError(500, error.message);
    return Util.send(res);

  }
};



export {
  authUser,

};