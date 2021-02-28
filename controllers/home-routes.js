const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Landmark } = require("../models");

router.get("/", (req, res) => {
  res.render("homepage", {
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
