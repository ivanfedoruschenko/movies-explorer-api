const { ERROR_CONFLICT_VALUE } = require('./errors');

class ConflictValueError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CONFLICT_VALUE;
  }
}

module.exports = ConflictValueError;
