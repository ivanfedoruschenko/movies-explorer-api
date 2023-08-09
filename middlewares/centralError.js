const { ERROR_DEFAULT } = require('../errors/errors');

const centralError = (err, req, res, next) => {
  const { statusCode = ERROR_DEFAULT, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === ERROR_DEFAULT
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};

module.exports = centralError;
