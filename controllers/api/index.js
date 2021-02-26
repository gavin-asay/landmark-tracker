const router = require("express").Router();

const LandmarkRoutes = require("./landmark-routes");
const UserRoutes = require("./user-routes");

router.use("/landmarks", LandmarkRoutes);
router.user("./user", UserRoutes);

module.exports = router;
