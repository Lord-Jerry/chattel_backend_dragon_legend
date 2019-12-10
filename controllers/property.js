/* eslint-disable camelcase */
const { decode } = require('../helpers/token');
const { users, properties } = require('../models');

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
      const userId = decode(req)[0].id;
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

      const registeredProperty = await properties.create({
        userId,
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

  /**
   * TODO: implement pagination
   * @param { object } req - request body
   * @param { object } res - api response
   * @param { function } next - next middleware function
   */
  static async getAll(req, res, next) {
    try {
      const userId = decode(req)[0].id;

      const findUser = await users.findByPk(userId);

      if (!findUser) {
        const err = new Error();
        err.message = `user with ID ${userId} not found`;
        err.statusCode = 404;
        return next(err);
      }

      const userProperties = await properties.findAll({
        where: {
          userId,
        },
      });

      return res.status(200).json({
        message: 'registered properties',
        statusCode: 200,
        data: {
          properties: userProperties,
        },
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * @param { object } req - request body
   * @param { object } res - api response
   * @param { function } next - next middleware function
   */
  static async getSingle(req, res, next) {
    try {
      const { propertyId } = req.params;
      const userId = decode(req)[0].id;

      const findUser = await users.findByPk(userId);

      if (!findUser) {
        const err = new Error();
        err.message = `user with ID ${userId} not found`;
        err.statusCode = 404;
        return next(err);
      }

      const userProperty = await properties.findOne({
        where: {
          id: propertyId,
          userId,
        },
      });

      if (!userProperty) {
        const err = new Error();
        err.message = `property with ID ${propertyId} not found`;
        err.statusCode = 404;
        return next(err);
      }

      return res.status(200).json({
        message: 'single property',
        statusCode: 200,
        data: {
          property: userProperty,
        },
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * @param { object } req - request body
   * @param { object } res - api response
   * @param { function } next - next middleware function
   */
  static async update(req, res, next) {
    try {
      const {
        address, property_type, num_apartment, num_bathroom, rentage_amount,
      } = req.body;

      const { propertyId } = req.params;
      const userId = decode(req)[0].id;
      const userProperty = await properties.findOne({
        where: {
          id: propertyId,
          userId,
        },
      });

      if (!userProperty) {
        const err = new Error();
        err.message = `property with ID ${propertyId} not found`;
        err.statusCode = 404;
        return next(err);
      }

      const updatedProperty = await userProperty.update({
        address,
        property_type,
        num_apartment,
        num_bathroom,
        rentage_amount,
      });

      return res.status(200).json({
        message: 'Property updated successfully',
        statusCode: 200,
        data: {
          property: updatedProperty,
        },
      });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { propertyId } = req.params;
      const userId = decode(req)[0].id;
      const findUser = await users.findByPk(userId);

      if (!findUser) {
        const err = new Error();
        err.message = `user with ID ${userId} not found`;
        err.statusCode = 404;
        return next(err);
      }

      const findProperty = await properties.findOne({
        where: {
          id: propertyId,
          userId,
        },
      });

      if (!findProperty) {
        const err = new Error();
        err.message = `property with ID ${propertyId} not found`;
        err.statusCode = 404;
        return next(err);
      }

      await findProperty.destroy();

      return res.status(204).json({
        message: 'property deleted succesfully',
        statusCode: 204,
      });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = Property;
