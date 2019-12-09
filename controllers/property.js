/* eslint-disable camelcase */
const { decode } = require('../helpers/token');
const { users, property } = require('../models');

/**
 * this class contains method for managing user's properties
 */
class Property {
  /**
   * this method registers a user's property on the platform
   * @param { object } req - request body
   * @param { object } res - api response
   * @param { function } next - next middleware function
   */
  static async create(req, res, next) {
    try {
      const userId = decode(req).id;
      const {
        address, property_type, num_apartment, num_bathroom, rentage_amount,
      } = req.body;

      const findUser = await users.findByPk(userId);

      if (!findUser) {
        const err = new Error();
        err.message = `user with ID ${userId} not found`;
        err.statusCode = 404;
        return next(err);
      }

      const registeredProperty = await property.create({
        address,
        property_type,
        num_apartment,
        num_bathroom,
        rentage_amount,
      });

      return res.status(201).json({
        message: 'Property registered successfully',
        statusCode: 201,
        data: {
          registeredProperty,
        },
      });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = Property;
