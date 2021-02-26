const router = require("express").Router();
const { Landmark, User } = require("../../models");
const { latRange, lonRange } = require("../../utils/distance");
const { Op } = require("sequelize");

module.exports = router;
