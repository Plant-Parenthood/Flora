const request = require('superagent');

module.exports = {
    async get(req) {
        const { lat } = req.query;
        const { lon } = req.query;
        const URL = `https://www.hikingproject.com/data/get-campgrounds?lat=${lat}&lon=${lon}&maxDistance=20&maxResults=20&key=${process.env.HIKING_API_KEY}`;

        const response = await request.get(URL);

        const actualResponse = JSON.parse(response.text);

        let responseArray = actualResponse.campgrounds;

        return responseArray;
    }
<<<<<<< HEAD
}; 
=======
};
>>>>>>> c16731a24edf3342f6edcc2ea7943428f67a0213
