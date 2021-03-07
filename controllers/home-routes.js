const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Landmark } = require("../models");

router.get("/", (req, res) => {
  Landmark.findAll({
    attributes: [
      "id",
      "name",
      "address",
      "lat",
      "lon",
      "image_url",
      "added_by",
    ],
  })
    .then((dbLandmarkData) => {
      const landmarks = dbLandmarkData.map((landmark) =>
        landmark.get({ plain: true })
      );
      console.log(landmarks);
      res.render("homepage", {
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/account", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("account");
});

router.get("/addLandmark", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("addLandmark");
});

router.get("/deleteLandmark", (req, res) => {
  Landmark.findAll({
    where: {
      added_by: req.session.added_by,
    },
    attributes: ["id", "name", "address", "lat", "lon"],
  }).then((dbLandmarkData) => {
    const landmarks = dbLandmarkData.map((landmark) =>
      landmark.get({
        plain: true,
      })
    );
    console.log(landmarks);
  });
});

module.exports = router;
