let locationsArr = [];
let currentLocation = "";

//this actively tracks users location. Anytime it changes, the new location gets pushed to locationArr array, and set as currentLocation. The landmarks lat and lon can then be set with currentLocation.latitude or longitude
navigator.geolocation.watchPosition(
  (data) => {
    locationsArr.push(data);
    currentLocation = data.coords;
    console.log(data);
    console.log(locationsArr);
    console.log(currentLocation);
  },
  (err) => console.log(err)
);
