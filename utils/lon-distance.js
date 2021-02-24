const haversineDistance = require('./haversine');

// say we want to find all the landmarks within five miles of the client (radius argument in the following function)
// say we're at the equator (0 deg latitude) and we go five miles north, what is our latitude now?
// the distance between 0 deg lat and 1 deg lat is just about 69 miles
// 5 miles / 69 miles/degree = 0.072 deg; when we travel five miles north, we travel 0.072 degrees north
// lines of latitude are parallel, so that 69 miles/degree figure is constant
function latRange(userLat, radius) {
	const degDistance = radius / 69;
	return [userLat - degDistance, userLat + degDistance]; // we'll query the database for landmarks with lat that falls between these two values
}

// but lines of longitude are farthest apart at the equator and closest together at the poles, so how do we calculate the change in longitude?
// use the Haversine formula as seen below
// SLC is at about 40 deg latitude, and there, the distance between 0 and 1 degree longitude is 52.93 miles
// if we go five miles west, our longitude changes by 0.094 degrees
function lonRange(userLat, userLon, radius) {
	const degDistance = haversineDistance([userLat, 0], [userLat, 1]);
	const lonDiff = radius / degDistance;

	return [userLon - lonDiff, userLon + lonDiff]; // query the database for landmarks with lon that falls between these two values
}

module.exports = { latRange, lonRange };
