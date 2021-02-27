// chunky formula for calculating distance between two lat/lon coordinates
// shamelessly copied from https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
// we'll likely want this to sort landmarks by distance from user's location
// An SQL god could probably crunch these numbers in a single query, but uh, I know JavaScript
// this returns as-the-crow-flies distance, Google can give travel distance (by car, etc.)
const haversineDistance = ([lat1, lon1], [lat2, lon2], isMiles = true) => {
	const toRadian = angle => (Math.PI / 180) * angle;
	const distance = (a, b) => (Math.PI / 180) * (a - b);
	const RADIUS_OF_EARTH_IN_KM = 6371;

	const dLat = distance(lat2, lat1);
	const dLon = distance(lon2, lon1);

	lat1 = toRadian(lat1);
	lat2 = toRadian(lat2);

	// Haversine Formula
	const a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
	const c = 2 * Math.asin(Math.sqrt(a));

	let finalDistance = RADIUS_OF_EARTH_IN_KM * c;

	if (isMiles) {
		finalDistance /= 1.60934;
	}
	console.log([lat1, lon1], [lat2, lon2]);
	return finalDistance;
};

module.exports = haversineDistance;
