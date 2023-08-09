const jwt = require('jsonwebtoken');
const ERROR_INCORRECT_TOKEN = require('../errors/error_incorrect_token');
const { SECRET_STRING } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new ERROR_INCORRECT_TOKEN('Необходима авторизация '));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_STRING);
  } catch (err) {
    next(new ERROR_INCORRECT_TOKEN('Необходима авторизация '));
    return;
  }
  req.user = payload;
  next();
};
