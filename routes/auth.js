const router = require('express').Router();
// const { registerUser } = require('../middleware/auth');
// const authenticate = require('../middleware/authentication');
const AuthController = require('../controllers/auth');

router
  .route('/register')
  .post(
    AuthController.create,
  );

module.exports = router;
