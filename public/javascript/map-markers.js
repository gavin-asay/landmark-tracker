let map;
let currentCoords = {};
let markers = [];

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

async function initMap() {
	async function getLandmarks(lat, lon) {
		const response = await fetch(`/api/landmarks/${lat}/${lon}`);
		const landmarks = await response.json();

		for (let i = 0; i < landmarks.length; i++) {
			const { lat, lon, name } = landmarks[i];
			const marker = new google.maps.Marker({
				position: { lat, lng: lon },
				map,
				title: name,
			});
			markers.push(marker);
		}
	}

	function getPosition() {
		return new Promise((resolve, reject) => {
			// if we can't get location data, reject promise
			if (!navigator.geolocation) {
				reject('Location not available');
				return;
			}

			navigator.geolocation.getCurrentPosition(pos => {
				if (!map) resolve(pos);
				// if map isn't made yet, get position for map center
				// otherwise, record current location
				else {
					if (haversineDistance([pos.coords.latitude, pos.coords.longitude], [currentCoords.lon, currentCoords.lng]) > 0.095) {
						// if position changes by 0.095 mi (about 500 ft), fetch landmarks for new position
						currentCoords.lat = pos.coords.latitude;
						currentCoords.lng = pos.coords.longitude;

						for (let i = 0; i < markers.length; i++) {
							markers[i].setMap(null);
						}
						markers = [];

						getLandmarks(currentCoords.lat, currentCoords.lng);
					} else {
						currentCoords.lat = pos.coords.latitude;
						currentCoords.lng = pos.coords.longitude;
					}
				}
			});
		});
	}

	const pos = await getPosition();
	if (pos === 'Location not available') {
		document.querySelector('#map').textContent = pos;
		return;
	}

	map = new google.maps.Map(document.querySelector('#map'), {
		center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
		zoom: 16,
	});

	getLandmarks(pos.coords.latitude, pos.coords.longitude);
}
