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
		const marker = new google.maps.Marker({
			position: { lat, lng: lon },
			map,
			title: name,
		});

		const contentString =
		'<div id="content">' +
		'<div id="siteNotice">' +
		"</div>" +
		'<h1 id="firstHeading" class="firstHeading"> ${name} </h1>' +
		'<div id="bodyContent">' +
		"<p>DESCRIPTION</p>" +
		"</div>" +
		"</div>";
		
		const infowindow = new google.maps.InfoWindow({
			content: contentString,
		});

		marker.addListener("click", () => {
			infowindow.open(map, marker);
		});
	}

	navigator.geolocation.watchPosition(setMapPosition);
}