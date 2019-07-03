import jwt from 'jsonwebtoken';

// express middleware to check for token and pull a user out of it and if not just move along
const authUser = (req, res, next) => {
  const authHeader = req.get('authorization');
  if (authHeader && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, (error, payload) => {
        if (error) {
          console.log(error);
        }
        req.user = payload;
        // next();
      });
    } else {
      next();
    }
    next();
  } else {
    next();
  }
};

export const authorizeUser = (req, res, next) => {
  let token;
  let decode;
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { // Authorization: Bearer g1jipjgi1ifjioj
    // Handle token presented as a Bearer token in the Authorization header
    const authHeader = req.headers.authorization.split(' ');
    // token = authHeader[1];
    decode = jwt.decode(authHeader[1], process.env.TOKEN_SECRET);
  } else if (req.query && req.query.token) {
    // Handle token presented as URI param
    ({
      token,
    } = req.query);
    decode = jwt.decode(token, process.env.TOKEN_SECRET);
  } else if (req.cookies && req.cookies.token) {
    // Handle token presented as a cookie parameter
    ({
      token,
    } = req.cookies.token);
    decode = jwt.decode(token, process.env.TOKEN_SECRET);
  } else if (req.body && req.body.token) {
    // Handle token presented as a cookie parameter
    ({
      token,
    } = req.body.token);
    decode = jwt.decode(token, process.env.TOKEN_SECRET);
  }

  // find user
};

export default authUser;
