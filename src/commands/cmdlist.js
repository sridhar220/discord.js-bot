const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'cmdlist',
    async run(client, message, args){
        const cmdListEmbed = new MessageEmbed()
        .setColor(client.THEME)
        .setThumbnail(client.THUMBNAILS.CMDLIST)
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: 'General Commands', value: '`profilepic` `serverinfo` `weather`'       },
            { name: 'Fun Commands'    , value: '`geekmeter` `ppmeter` `dadjoke` `gif`'     },
            { name: 'Anime Commands'  , value: '`waifu` `anipic` `aniquote` `animesearch`' }
        );

        message.channel.send({ embeds: [cmdListEmbed] });
        return;
    }
}