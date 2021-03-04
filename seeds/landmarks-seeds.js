const { Landmark } = require("../models");

const locationdata = [
  {
    name: "some cool place",
    address: "123 south 456 east",
    lat: 40.7608,
    lon: -111.891,
    added_by: 3,
  },
  {
    name: "Orem City Library",
    lat: 40.2986608,
    lon: -111.6947186,
    added_by: 3,
  },
  {
    name: "Orem Pedestrian Bridge",
    lat: 40.2797497,
    lon: -111.7215328,
    added_by: 3,
  },
];

const seedLandmarks = () => Landmark.bulkCreate(locationdata);

module.exports = seedLandmarks;
