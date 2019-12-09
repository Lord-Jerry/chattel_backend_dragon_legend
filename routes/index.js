const router = require('express')();
const AuthRoute = require('./auth');
const PropertyRoute = require('./properties');

router.use('/api/v1', AuthRoute);
router.use('/api/v1', PropertyRoute);

module.exports = router;
