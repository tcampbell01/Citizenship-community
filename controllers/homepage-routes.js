const router = require("express").Router();
const sequelize = require("../config/connection");
const { User } = require("../models");

router.get('/', (req, res) => {
  if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
  }
  res.render('forum-page', { loggedIn: req.session.loggedIn });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/forum');
      return;
  }
  res.render('login');
});

// router.get("/signup", (req, res) => {
//   res.render("signup");
// });

module.exports = router;
