const latitudeArea = document.querySelector("#landmark-lat");
const longitudeArea = document.querySelector("#landmark-lon");
const Location = navigator.geolocation.getCurrentPosition((data) => {
  latitudeArea.value = data.coords.latitude;
  longitudeArea.value = data.coords.longitude;
});

async function newFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector('input[name="landmark-name"]').value;
  const address = document.querySelector('input[name="landmark-address"]')
    .value;

  const response = await fetch(`/api/landmarks`, {
    method: "POST",
    body: JSON.stringify({
      name,
      address,
      latitude,
      longitude,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}
