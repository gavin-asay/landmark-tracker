let map;
let currentCoords = {};

function success(pos) {
	console.log(pos.coords);
	currentCoords.lat = pos.coords.latitude;
	currentCoords.lng = pos.coords.longitude;
}

function getPosition() {
	if (!map) {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});
	}
}

function setMapPosition(pos) {
	map.setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
}

async function initMap() {
	const pos = await getPosition();

	map = new google.maps.Map(document.querySelector('#map'), {
		center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
		zoom: 16,
	});

	const response = await fetch(`/api/landmarks/${pos.coords.latitude}/${pos.coords.longitude}`);
	const landmarks = await response.json();

	for (let i = 0; i < landmarks.length; i++) {
		const { lat, lon, name } = landmarks[i];
		new google.maps.Marker({
			position: { lat, lng: lon },
			map,
			title: name,
		});
	}

	navigator.geolocation.watchPosition(setMapPosition);
}
