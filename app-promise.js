const yargs = require('yargs');
const axios = require('axios');
const keys = require('./config.js');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather',
      string: true
    }
  })
  .help()
  .alias('help', 'h').argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${
  keys.mapQuestApiKey
}&location=${encodedAddress}`;

axios
  .get(geocodeUrl)
  .then(response => {
    if (response.data.info.statuscode === 400) {
      throw new Error('Unable to find that address');
    }

    var lat = response.data.results[0].locations[0].latLng.lat;
    var lng = response.data.results[0].locations[0].latLng.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${
      keys.weatherApiKey
    }/${lat},${lng}`;
    console.log(response.data.results[0].locations[0]);
    return axios.get(weatherUrl);
  })
  .then(response => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(
      `It's currently ${temperature}.  It feels like ${apparentTemperature}`
    );
  })
  .catch(e => {
    if (e.code === 'ENOTFOUND') {
      console.log('Unable to connect to api servers');
    } else {
      console.log(e.message);
    }
  });
