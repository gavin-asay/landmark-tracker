const seedUsers = require("./user-seeds");
const seedLandmarks = require("./landmarks-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("---------------");
  await seedUsers();
  console.log("---------------");

  await seedLandmarks();
  console.log("---------------");

  process.exit(0);
};

seedAll();
