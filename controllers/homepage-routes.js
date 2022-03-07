const router = require("express").Router();
const sequelize = require("../config/connection");
const { User } = require("../models");

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/forum');
      return;
  }
  res.render('login');
});

// we dont need this part
router.get("/signup", (req, res) => {
  res.render("signup");
});


module.exports = router;