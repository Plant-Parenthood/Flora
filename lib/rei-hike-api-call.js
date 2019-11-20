const request = require('superagent');
// const stringHash = require('string-hash');



// navigator.geolocation.getCurrentPosition(function(position) {
//     let lat = position.coords.latitude;
//     let lon = position.coords.longitude;
//     localStorage.setItem('LOCATION', JSON.stringify({
//         lat: lat,
//         lon: lon
//     }));
// });


// const location = JSON.parse(localStorage.getItem('LOCATION'));
const geocodeApi = require('./google-geocode-api-call.js');

module.exports = {
    async get(req) {
        const { lat } = req.query;
        const { lon } = req.query;
        const URL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=20&maxResults=20&key=${process.env.HIKING_API_KEY}`;

        const response = await request.get(URL);

        const actualResponse = JSON.parse(response.text);

        let responseArray = actualResponse.trails;

        return responseArray;
    }
};
 // revisit line 23 if issue, it used to be a map 