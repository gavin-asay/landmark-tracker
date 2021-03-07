let locationsArr = [];
let currentLocation = "";
let locationObj = {};

//this actively tracks users location. Anytime it changes, the new location gets pushed to locationArr array, and set as currentLocation. The landmarks lat and lon can then be set with currentLocation.latitude or longitude
navigator.geolocation.watchPosition(
  (data) => {
    locationsArr.push(data);
    currentLocation = data.coords;
    locationObj = {
      arr: locationsArr,
      current: currentLocation,
    };
  },
  (err) => console.log(err)
);
