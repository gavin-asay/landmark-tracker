const { Landmark } = require('../models');

const locationdata = [
	{
		name: 'some cool place',
		address: '123 south 456 east',
		lat: 40.7608,
		lon: -111.891,
	},
	{
		name: 'Orem City Library',
		lat: 40.2986608,
		lon: -111.6947186,
	},
	{
		name: 'Orem Pedestrian Bridge',
		lat: 40.2797497,
		lon: -111.7215328,
	},
];

const seedLandmarks = () => Landmark.bulkCreate(locationdata);

module.exports = seedLandmarks;
