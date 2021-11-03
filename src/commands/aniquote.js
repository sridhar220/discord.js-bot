const { MessageEmbed } = require('discord.js');
const axios = require('axios');
module.exports = {
    name: 'aniquote',
    async run(client, message, args){
        axios.get('https://animechan.vercel.app/api/random/')
        .then(response => {
            const quoteData = response['data'];
            const quoteTitle = quoteData['anime'];
            const quote = `*${quoteData['quote']}*\n-***${quoteData['character']}***`;

            const quoteEmbed = new MessageEmbed()
            .setTitle(quoteTitle)
            .setDescription(quote)
            .setColor(client.THEME)
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

            message.channel.send({ embeds: [quoteEmbed] });
        })
        .catch(error => { console.error(error); });
        return;
    }
}