const { Model, DataTypes, Op } = require('sequelize');
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
			type: DataTypes.DECIMAL(9, 7),
			allowNull: false,
			validate: {
				min: -90,
				max: 90,
			},
		},
		lon: {
			type: DataTypes.DECIMAL(10, 7),
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
			afterFind(dbLandmarkData, { user_lat, user_lon }) {
				// this will automatically serialize the data, add the distance from user's location to each landmark, and sort the results by distance
				// assuming it works, don't have any data to test it on yet
				let landmarks;
				if (Array.isArray(dbLandmarkData)) {
					landmarks = dbLandmarkData.map(landmark => landmark.get({ plain: true }));
					landmarks.forEach(landmark => {
						// console.log(landmark);
						landmark.lat = parseFloat(landmark.lat);
						landmark.lon = parseFloat(landmark.lon);
						// console.log(landmark.lat);
						landmark.distance = haversineDistance([landmark.lat, landmark.lon], [user_lat, user_lon]);
					});
					return landmarks.sort((a, b) => a.distance - b.distance);
				} else {
					landmarks = dbLandmarkData.get({ plain: true });
					landmarks.lat = parseFloat(landmarks.lat);
					landmarks.lon = parseFloat(landmarks.lon);
					// console.log(landmark.lat);
					landmarks.distance = haversineDistance([landmarks.lat, landmarks.lon], [user_lat, user_lon]);
					return landmarks;
				}
			},
		},
	}
);

module.exports = Landmark;
