/**
 * Throw Operational Error
 * @class
 */
class AppError extends Error {
  /**
   * @constructor
   * @param {string} message Error message
   * @param {number} statusCode Error http status code
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = String(this.statusCode).startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
