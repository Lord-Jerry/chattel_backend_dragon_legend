const router = require('express').Router();
const { create } = require('../middleware/validation/property');
const { checkTokenValid } = require('../middleware/validation/token');
const PropertyController = require('../controllers/property');

router
  .route('/create-property')
  .post(
    checkTokenValid,
    create,
    PropertyController.create,
  );

router
  .route('/properties')
  .get(
    checkTokenValid,
    PropertyController.getAll,
  );

module.exports = router;
