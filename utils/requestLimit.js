// Modules
const rateLimiter = require("express-rate-limit");

/**
 * Limit Number Of Request
 * @param {number} maximumRequest Maximum number of request limit
 * @param {string} errorMessage Error message to be thrown when maximum limit is reached
 * @param {number} resetTime Time in which the limit should be restored back to 0 in milliseconds (default: 1 hour)
 * @example
 * requestLimit(100, "Too many request. Please try again in an hour")
 */
const requestLimit = (maximumRequest, errorMessage, resetTime) => {
  return rateLimiter({
    windowMS: 60 * 60 * 1000 || resetTime,
    max: maximumRequest,
    message: { status: "fail", message: errorMessage },
  });
};

module.exports = requestLimit;
