const bcrypt = require('bcryptjs');
const { encode } = require('../helpers/token');
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

      // unset user password
      delete details.password;

      const token = encode(details);

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

  /**
   * log users in
   * @param { object } req - request body
   * @param { object } res - api response
   * @param { function } next - next middleware function
   */
  static async login(req, res, next) {
    try {
      const {
        email,
        password,
      } = req.body;

      const findUser = await users.findOne({
        where: {
          email,
        },
      });

      if (!findUser) {
        const err = new Error();
        err.message = 'invalid email or password';
        err.statusCode = 401;
        return next(err);
      }

      const checkPassword = await bcrypt.compare(password, findUser.password);

      if (!checkPassword) {
        const err = new Error();
        err.message = 'invalid email or password';
        err.statusCode = 401;
        return next(err);
      }

      // unset user password
      delete findAdmin.password;

      // sign user token
      const token = encode(findUser);

      return res.status(200).json({
        statusCode: 200,
        message: 'logged in',
        data: {
          token,
        }
      });
    } catch (err) {
      return next(err);
    }
  }

}

module.exports = User;
