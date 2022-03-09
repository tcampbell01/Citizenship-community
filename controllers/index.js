const router = require('express').Router();

const apiRoutes = require('./api');

const homeRoutes = require('./homepage-routes.js');

const forumRoutes = require('./forum-page-routes.js');

const dashboardRoutes =require('./dashboard-routes')

const topicRoutes =require('./topic-routes')


router.use('/', homeRoutes);

router.use('/api', apiRoutes);

router.use('/forum', forumRoutes);

router.use('/dashboard', dashboardRoutes);

router.use('/topic', topicRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;