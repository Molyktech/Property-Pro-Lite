import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  const aToken = req.body.token || req.query.token || req.headers['x-access-token'];
  const authHeader = req.get('authorization');
  if (authHeader && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = authHeader.split('')[1];
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, (error, payload) => {
        if (error) {
          console.log(error);
        }
        req.user = payload;
        next();
      });
    } else {
      next();
    }
  } else {
    next();
  }
};
export default authUser;
