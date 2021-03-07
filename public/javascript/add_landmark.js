const latitudeArea = document.querySelector("#landmark-lat");
const longitudeArea = document.querySelector("#landmark-lon");
const Location = navigator.geolocation.getCurrentPosition((data) => {
  latitudeArea.value = data.coords.latitude;
  longitudeArea.value = data.coords.longitude;
});

async function newFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector("#landmark-name").value;
  const address = document.querySelector("#landmark-address").value;
  const lat = parseFloat(latitudeArea.value);
  const lon = parseFloat(longitudeArea.value);

  const response = await fetch(`/api/landmarks`, {
    method: "POST",
    body: JSON.stringify({
      name,
      address,
      lat,
      lon,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".landmark-form")
  .addEventListener("submit", newFormHandler);
