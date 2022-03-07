const router = require("express").Router();
const sequelize = require("../config/connection");
const { User } = require("../models");


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }
  res.render('forum');
});


//need to test this with our page-- may need res.render('forum')
router.get("/signup", (req, res) => {
  res.render("signup");
});


module.exports = router;
