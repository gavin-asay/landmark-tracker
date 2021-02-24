const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const haversineDistance = require('../utils/haversine');

class Landmark extends Model {}

Landmark.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			// Can be null, not all sights have a definite street address
			type: DataTypes.STRING,
			allowNull: true,
		},
		lat: {
			// Lat and lon cannot be null
			type: DataTypes.DECIMAL(8, 6),
			allowNull: false,
			validate: {
				min: -90,
				max: 90,
			},
		},
		lon: {
			type: DataTypes.DECIMAL(9, 6),
			allowNull: false,
			validate: {
				min: -180,
				max: 180,
			},
		},
		image_url: {
			// considering we'll probably use an API like imgur to store images, we'll reference the image url here, can be null
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isUrl: true,
			},
		},
		added_by: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		freezeTableName: true,
		modelName: 'landmark',
		hooks: {
			afterFind(dbLandmarkData) {
				// this will automatically serialize the data, add the distance from user's location to each landmark, and sort the results by distance
				// assuming it works, don't have any data to test it on yet
				let landmarks = dbLandmarkData.map(result => result.get({ plain: true }));
				landmarks.forEach(landmark => {
					landmark.distance = haversineDistance([landmark.lat, landmark.lon], [req.body.user_lat, req.body.user_lon]);
				});
				return landmarks.sort((a, b) => a.distance - b.distance);
			},
		},
	}
);

module.exports = Landmark;