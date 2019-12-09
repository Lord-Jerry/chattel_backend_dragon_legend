/* eslint-disable camelcase */
const Validator = require('validatorjs');
const { users } = require('../../models');

const register = async (req, _res, next) => {
  const rules = {
    fname: 'required',
    lname: 'required',
    email: 'required|email',
    password: 'required',
    mobile: 'required',
    gender: 'required',
    type: 'required',
  };
  const validate = new Validator(req.body, rules);

  if (!validate.passes()) {
    const err = new Error();
    err.message = validate.errors;
    err.statusCode = 400;
    return next(err);
  }

  const { email, mobile } = req.body;
  try {
    const checkEmailExists = await users.findOne({
      where: {
        email,
      },
    });

    if (checkEmailExists) {
      const err = new Error();
      err.message = 'email address already exists';
      err.statusCode = 400;
      return next(err);
    }
  } catch (err) {
    return next(err);
  }

  try {
    const checkMobileExists = await users.findOne({
      where: {
        mobile,
      },
    });

    if (checkMobileExists) {
      const err = new Error();
      err.message = 'mobile number already exists';
      err.statusCode = 400;
      return next(err);
    }
  } catch (err) {
    return next(err);
  }

  return next();
};

const login = async (req, _res, next) => {
  const rules = {
    email: 'required|email',
    password: 'required',
  };
  const validate = new Validator(req.body, rules);

  if (!validate.passes()) {
    const err = new Error();
    err.message = validate.errors;
    err.statusCode = 400;
    return next(err);
  }

  return next();
}


module.exports = {
  register,
  login,
};
