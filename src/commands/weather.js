const { MessageEmbed } = require('discord.js');
const axios = require('axios');
module.exports = {
    name: 'weather',
    async run(client, message, args){
        const searchLocation = args.join(' ');
        if(!searchLocation) return message.reply('Please mention a location!');

        axios.get(`http://api.openweathermap.org/data/2.5/weather?appid=${client.APIKEYS.WEATHER}&q=${searchLocation}`)
        .then(response => {
            const weatherData = response['data'];
            if(weatherData['cod'] != 200) return message.reply('Could not find the location.');

            const forecastTitle       = `**Weather forecast for ${weatherData['name']}, ${weatherData['sys']['country']}**`;
            const forecastTimeZone    = `UTC ${weatherData['timezone'] / 3600}`;
            const forecastTemperature = `${Math.round(weatherData['main']['temp'] - 273.15)}°`;
            const forecastWindSpeed   = `${Math.round(weatherData['wind']['speed'] * 3.6)} km/h`;
            const forecastHumidity    = `${Math.round(weatherData['main']['humidity'])}%`;
            const forecastPressure    = `${Math.round(weatherData['main']['pressure'])} hPa`;

            const weatherEmbed = new MessageEmbed()
            .setDescription(forecastTitle)
            .setColor(client.THEME)
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setThumbnail(client.THUMBNAILS.WEATHER)
            .addFields(
                { name: 'TimeZone'   , value: forecastTimeZone    , inline: true },
                { name: 'Temperature', value: forecastTemperature , inline: true },
                { name: 'Degree Type', value: 'Celcius'           , inline: true },
                { name: 'Wind Speed' , value: forecastWindSpeed   , inline: true },
                { name: 'Humidity'   , value: forecastHumidity    , inline: true },
                { name: 'Pressure'   , value: forecastPressure    , inline: true },
            );

            message.channel.send({ embeds: [weatherEmbed] });
        })
        .catch(error => { console.error(error); });
        return;
    }
}