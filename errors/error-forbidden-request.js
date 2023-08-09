const { ERROR_FORBIDDEN_REQUEST } = require('./errors');

class ForbiddenRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_FORBIDDEN_REQUEST;
  }
}

module.exports = ForbiddenRequestError;
