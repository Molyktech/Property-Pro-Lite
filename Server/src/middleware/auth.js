import jwt from 'jsonwebtoken';
import Util from '../utils/Utils';
import db from '../models/index';
import dotenv from 'dotenv';

dotenv.config();

// express middleware to check for token and pull a user out of it and if not just move along
const authUser = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    Util.setError(403, 'Token is not provided');
    return Util.send(res);
  }
  try {
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    const text = 'SELECT * FROM Users WHERE id = $1';
    const {
      rows
    } = await db.query(text, [decoded.id]);

    if (!rows[0]) {
      Util.setError(400, 'Invalid Token');
      return Util.send(res);

    }
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };
    next();
  } catch (error) {
    Util.setError(500, error.message);
    return Util.send(res);

  }

};



export {
  authUser,

};