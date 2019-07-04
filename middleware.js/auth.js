import jwt from 'jsonwebtoken';

// express middleware to check for token and pull a user out of it and if not just move along
export const authUser = (req, res, next) => {
  const authHeader = req.get('authorization');
  if (authHeader && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, (error, payload) => {
        if (error) {
          res.status(403).json({
            status: 'error',
            error,
            message: 'No access token',
          });
        }
        req.user = payload;
      });
    } else {
      next();
    }
    next();
  } else {
    next();
  }
};


export const authLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    const error = new Error('Un-Authorised');
    res.status(401);
    next(error);
  }
};
