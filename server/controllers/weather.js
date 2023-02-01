const axios = require('axios');
const redis = require('../lib/redis');

const DEFAULT_CITIES = ['Islamabad', 'Karachi', 'Quetta', 'Lahore', 'Peshawar'];

async function fetchWeatherFromAPi(city) {
    data = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a9c099905c6714859cdf784df4ac3257`
    ).then((resp) => {
        console.log("APi data=>", resp.data)
        redis.set(city, JSON.stringify(resp.data));
        return resp.data;
    }).catch((error) => {
        console.log(error.response);
    })
}

async function getCitiesWeather(cities) {
    // console.log('inside city', cities);
    cities = cities?.length ? cities : DEFAULT_CITIES;
    const citiesWeatherData = [];

    for (const city of cities) {
        let data = await redis.get(city);
        if (data) {
            data = JSON.parse(data);
            data.main.temp -= 273.15;
        } else {
            fetchWeatherFromAPi(city)
        }
        citiesWeatherData.push(data);
    }

    return citiesWeatherData;
}


module.exports = getCitiesWeather


