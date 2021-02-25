const { User } = require("../models");

const userdata = [
  {
    username: "test",
    email: "test@email.com",
    password: "test1234",
  },
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;
