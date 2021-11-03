const { MessageEmbed } = require('discord.js');
const axios = require('axios');
module.exports = {
    name: 'dadjoke',
    async run(client, message, args){
        axios.get('https://icanhazdadjoke.com/slack', { headers: { 'User-Agent': 'axios 0.21.1' } })
        .then(response => {
            const jokeData = response['data'];
            const joke = jokeData['attachments'][0]['text'];

            const jokeEmbed = new MessageEmbed()
            .setTitle('Here\'s your dad joke!')
            .setDescription(joke)
            .setColor(client.THEME)
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setThumbnail(client.THUMBNAILS.DADJOKE);

            message.channel.send({ embeds: [jokeEmbed] });
        })
        .catch(error => { console.error(error); })
        return;
    }
}