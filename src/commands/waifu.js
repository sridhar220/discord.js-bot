const { MessageEmbed } = require('discord.js');
const axios = require('axios');
module.exports = {
    name: 'waifu',
    async run(client, message, args){
        axios.get('https://api.waifu.pics/sfw/waifu')
        .then(response => {
            const waifuData = response['data'];
            const imageLink = waifuData['url'];

            const waifuEmbed = new MessageEmbed()
            .setURL(imageLink)
            .setTitle('Here\'s your waifu ')
            .setColor(client.THEME)
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setImage(imageLink);

            message.channel.send({ embeds: [waifuEmbed] });
        })
        .catch(error => { console.error(error); });
        return;
    }
}