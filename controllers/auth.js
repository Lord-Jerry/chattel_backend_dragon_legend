const jwt = require('jsonwebtoken');
const { users } = require('../models');
/**
 * This class contains methods for authenticating users
 *
 */
class User {
  /**
   * create account
   * @param { object } req - request body
   * @param { object } res - api response
   * @param { function } next - next middleware function
   */
  static async create(req, res, next) {
    try {
      const {
        mobile, fname, lname, email, gender, type,
      } = req.body;
      let { password } = req.body;

      // hash password
      password = bcrypt.hashSync(password, 10);

      const details = await users.create({
        fname,
        lname,
        email,
        gender,
        mobile,
        password,
        type,
      });

      const token = jwt.sign({
        id: details.id,
        mobile: details.mobile,
      }, process.env.SECRET_KEY, { expiresIn: '24h' });

      return res.status(201).json({
        statusCode: 201,
        message: 'Account created successfully',
        data: {
          token,
        },
      });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = User;
