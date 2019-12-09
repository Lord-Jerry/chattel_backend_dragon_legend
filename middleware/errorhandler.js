const response = require('../helper/response');

// eslint-disable-next-line no-unused-vars
const logger = (err, req, res, next) => {
  if (!err.statusCode) {
    /* eslint-disable-next-line no-console */
    console.error(err.stack);
    return response(res, 500, {
      message: 'internal server error',
    }, false);
  }

  return response(res, err.statusCode, {
    message: err.message,
  }, false);
};
module.exports = logger;
