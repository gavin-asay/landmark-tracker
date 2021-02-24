let locationsArr = [];

navigator.geolocation.watchPosition(
  (data) => {
    locationsArr.push(data);
    console.log(data);
    console.log(locationsArr);
  },
  (err) => console.log(err)
);
