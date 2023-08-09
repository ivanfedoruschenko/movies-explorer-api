const { ERROR_CODE } = require('./errors');

class CodeError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE;
  }
}

module.exports = CodeError;
