const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index (request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store (request, response) {
        const { username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({username});

        if(!dev){
            const apiResponse = await axios.get(`http://api.github.com/users/${username}`);
    
            const {name = login, avatar_url, bio} = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [latitude, longitude],
            };
        
            const dev = await Dev.create({
                username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }
    
        return response.json(dev)
    },

    async update() {

    },

    async destroy() {

    },
};