/* eslint-disable camelcase */
const Validator = require('validatorjs');
// const { users } = require('../../models');

const create = async (req, _res, next) => {
  const rules = {
    address: 'required',
    property_type: 'required',
    num_apartment: 'required|integer',
    num_bathroom: 'required|integer',
    rentage_amount: 'required|integer',
  };
  const validate = new Validator(req.body, rules);

  if (!validate.passes()) {
    const err = new Error();
    err.message = validate.errors;
    err.statusCode = 400;
    return next(err);
  }

  return next();
};

module.exports = {
  create,
};
