'use strict';

let geoController = (function () {

  let position = null;
  let lastMessage = null;
  let lastError = null;
  let successCallback = null;
  let errorCallback = null;

  let options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 300000
  };

  function getCurrentPosition(success, error, posOptions) {
    // Set callbacks
    successCallback = success;
    errorCallback = error;
    if (posOptions) {
      options = posOptions;
    }

    // Reset private variables
    position = null;
    lastError = null;
    lastMessage = null;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        setPosition, handleError, options);
    }
    else {
      callError("Update your browser to use Geolocation.");
    }
  }

  function setPosition(pos) {
    position = pos;

    if (successCallback) {
      successCallback(position);
    }
  }

  function handleError(error) {
    lastError = error;

    switch (error.code) {
      case error.PERMISSION_DENIED:
        lastMessage = "User does not want to display their location."
        break;
      case error.POSITION_UNAVAILABLE:
        lastMessage = "Can't determine user's location."
        break;
      case error.TIMEOUT:
        lastMessage = "The request for geolocation information timed out."
        break;
      case error.UNKNOWN_ERROR:
        lastMessage = "An unknown error occurred."
        break;
    }

    callError(lastMessage);
  }

  function callError(msg) {
    lastMessage = msg;
    console.log(msg);
    if (errorCallback) {
      errorCallback(lastMessage);
    }
  }

  return {
    "getCurrentPosition": function (success, error, posOptions) {
      getCurrentPosition(success, error, posOptions);
    },
    "getPosition": function () {
      return position;
    },
    "getLastError": function () {
      return lastError;
    },
    "getLastMessage": function () {
      return lastMessage;
    },
    "getOptions": function () {
      return options;
    }
  }
})();

var gmapController = (function () {
    function initialize() {
      geoController.getCurrentPosition(displayPosition, displayError);

      locationObj();

        addMap(locationsArray[0]);
        for (let index = 0; index < locationsArray.length; index++) {
          // Add marker for location
          addMarker(locationsArray[index]);
        }
    }

    function displayPosition(pos) {
      let coords = pos.coords;
      $("#lat").text(coords.latitude);
      $("#long").text(coords.longitude);

      addMap(coords);
    }

    function displayError(msg) {
      $("#errorArea").removeClass("d-none");
      $("#errorArea").html(msg);
    }

    function addMap(location) {
      // Create a lat/lng object
      let pos = new google.maps.LatLng(location.latitude, location.longitude);
      // Create map options
      let mapOptions = {
        center: pos,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      // Create new google map
      let map = new google.maps.Map(document.getElementById("map"), mapOptions);
    }

    function addMarker(location) {
        location.marker = new google.maps.Marker({
          position: new google.maps.LatLng(location.latitude, location.longitude),
          map: map,
          title: location.title
        });

        // Add marker to the map
        location.marker.setMap(map);
    }

    return {
      "initialize": initialize
    }
  })();