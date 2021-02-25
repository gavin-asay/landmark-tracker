const { Landmark } = require("../models");

const locationdata = [
  {
    name: "some cool place",
    address: "123 south 456 east",
    lat: 40.7608,
    lon: 111.891,
  },
];

const seedLandmarks = () => Landmark.bulkCreate(locationdata);

module.exports = seedLandmarks;
