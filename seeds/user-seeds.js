const { User } = require("../models");

const userdata = [
  {
    username: "test",
    email: "test@email.com",
    password: "test1234",
  },
  {
    username: "test2",
    email: "email@email.com",
    password: "password",
  },
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;
