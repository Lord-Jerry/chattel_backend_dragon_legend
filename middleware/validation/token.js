/* eslint-disable no-console */
const jwt = require('jsonwebtoken');

class authenticate {
  /**
   * check token valid
   * @param {object} req - api request
   * @param {object} res - api response
   * @param {function} next - next middleware function
   * @return {json}
   */
  static checkTokenValid(req, res, next) {
    try {
      const { token } = req.headers;

      if (token === undefined || token === null || token === '') {
        const err = new Error();
        err.message = 'token does not exist';
        err.statusCode = 401;
        return next(err);
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (!decoded) {
        const err = new Error();
        err.message = 'invalid token';
        err.statusCode = 401;
        return next(err);
      }

      return next();
    } catch (e) {
      const err = new Error();
      err.message = 'invalid token';
      err.statusCode = 401;
      console.log(e);
      return next(err);
    }
  }
}

module.exports = authenticate;
