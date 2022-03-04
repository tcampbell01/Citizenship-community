const router = require('express').Router();

// const apiRoutes = require('./api');

// router.use('/api', apiRoutes);

const landingRoutes = require('./landing-page-routes.js');

router.use('/', landingRoutes);

const homeRoutes = require('./homepage-routes.js');

router.use('/homepage', homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;