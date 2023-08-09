const { ERROR_INCORRECT_TOKEN } = require('./errors');

class IncorrectTokenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_INCORRECT_TOKEN;
  }
}

module.exports = IncorrectTokenError;
