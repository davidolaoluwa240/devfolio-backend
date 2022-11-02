/**
 * Catch Asynchronous Error
 * @param {Function} handler Handler function
 */
const catchAsync = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (err) {
    next(err);
  }
};

module.exports = catchAsync;
