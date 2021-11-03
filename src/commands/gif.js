const { MessageEmbed } = require('discord.js');
const axios = require('axios');
module.exports = {
    name: 'gif',
    async run(client, message, args){
        const searchQuery = args.join(' ');
        if(!searchQuery){
            axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${client.APIKEYS.GIPHY}`)
            .then(response => {
                const gifData = response['data'];
                const imageLink = gifData['data']['images']['original']['url'];
                const gifEmbed = new MessageEmbed()
                .setURL(imageLink)
                .setTitle('Here\'s your gif!')
                .setColor(client.THEME)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setImage(imageLink);

                message.channel.send({ embeds: [gifEmbed] });
            })
            .catch(error => { console.error(error); });
        }
        else {
            axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${client.APIKEYS.GIPHY}&q=${searchQuery}&limit=50`)
            .then(response => {
                const gifData = response['data'];
                const searchResults = gifData['pagination']['total_count'];
                const searchCount   = gifData['pagination']['count'];

                if(!searchResults || !searchCount) return message.reply('Unfortunately, no results were found.');

                const number = Math.floor(Math.random()*50)
                const imageLink = gifData['data'][number]['images']['original']['url'];
                const gifEmbed = new MessageEmbed()
                .setURL(imageLink)
                .setTitle('Here\'s your gif!')
                .setColor(client.THEME)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setImage(imageLink);

                message.channel.send({ embeds: [gifEmbed] });
            })
            .catch(error => { console.error(error); });
        }
        return;
    }
}