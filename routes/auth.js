const router = require('express').Router();
const { register } = require('../middleware/validation/auth');
const AuthController = require('../controllers/auth');

router
  .route('/register')
  .post(
    register,
    AuthController.create,
  );

module.exports = router;
