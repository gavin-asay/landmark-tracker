const router = require("express").Router();

const LandmarkRoutes = require("./landmark-routes");
const UserRoutes = require("./user-routes");

<<<<<<< HEAD
router.use("/landmarks", LandmarkRoutes);
router.user("./user", UserRoutes);
=======
router.use("/users", UserRoutes);
router.use("/landmarks", LandmarkRoutes);
>>>>>>> b562232c4902bf3006be1b87dd360ecf0543f761

module.exports = router;
