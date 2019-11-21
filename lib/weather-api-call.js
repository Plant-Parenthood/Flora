const request = require('superagent');

module.exports = {
    async get(req) {
        const { lat } = req.query;
        const { lon } = req.query;
        const URL = `https://api.darksky.net/forecast/${process.env.HIKING_API_KEY}/${lat},${lon}`;

        const response = await request.get(URL);

        const actualResponse = JSON.parse(response.text);

        let responseArray = actualResponse.weather;

        return responseArray;
    }
};