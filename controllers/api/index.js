const router = require('express').Router();

const LandmarkRoutes = require('./landmark-routes');

router.use('/landmarks', LandmarkRoutes);

module.exports = router;
