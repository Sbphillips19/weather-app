const request = require('request');

var geocodeAddress = (address, callback) => {
  let encodedAddress = encodeURIComponent(address);

  request(
    {
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=U6PEqkoRSwIVdcJGLbGs7k4rZ1KAAGIw&location=${encodedAddress}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback('Unable to connect to mapquest servers');
      } else if (body.info.statuscode === 400) {
        callback('Unable to find address');
      } else if (body.info.statuscode === 0) {
        callback(undefined, {
          address:
            body.results[0].locations[0].adminArea5 +
            ' ' +
            body.results[0].locations[0].adminArea3 +
            ' ' +
            body.results[0].locations[0].postalCode,
          latitude: body.results[0].locations[0].latLng.lat,
          longitude: body.results[0].locations[0].latLng.lng
        });
      }
    }
  );
};

module.exports.geocodeAddress = geocodeAddress;
