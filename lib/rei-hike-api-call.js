const request = require('superagent');


module.exports = {
    async get(req) {
        const { lat } = req.query;
        const { lon } = req.query;
        const URL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=20&maxResults=20&key=${process.env.HIKING_API_KEY}`;
        console.log(URL)

        const response = await request.get(URL);

        const actualResponse = JSON.parse(response.text);

        let responseArray = actualResponse.trails;

        return responseArray;
    }
};
