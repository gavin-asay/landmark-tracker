const router = require("express").Router();

const LandmarkRoutes = require("./landmark-routes");
const UserRoutes = require("./user-routes");

router.use("/users", UserRoutes);
router.use("/landmarks", LandmarkRoutes);

module.exports = router;
