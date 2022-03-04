const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
  res.render('landing-page', {
  });
});

module.exports = router;