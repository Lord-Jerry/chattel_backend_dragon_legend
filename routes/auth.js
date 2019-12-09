const router = require('express').Router();
const { register, login } = require('../middleware/validation/auth');
const AuthController = require('../controllers/auth');

router
  .route('/register')
  .post(
    register,
    AuthController.create,
  );

router
  .route('/login')
  .post(
    login,
    AuthController.login,
  );

module.exports = router;
