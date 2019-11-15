/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const secret = process.env.JWT_SECRET || "This is secret"
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({
          error: `invalid request ${err}`
        })
      } else {
        req.decodedJwt = decoded;
        next();
      }
    })
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};
