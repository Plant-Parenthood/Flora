const request = require('superagent');
// const stringHash = require('string-hash');

let lat;
let lon;

navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
});

const URL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=20key=${process.env.HIKING_API_KEY}`;

module.exports = {
    async get(search, page) {
        page = page || 1;
        search = search || '';

        const response = await request
            .get(URL)
            .query({ page, search });

        return response.body;
    }
};
 // revisit line 23 if issue, it used to be a map 