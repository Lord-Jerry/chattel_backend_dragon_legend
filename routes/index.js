const router = require('express')();
const AuthRoute = require('./auth');

router.use('/api/v1', AuthRoute);

module.exports = router;
