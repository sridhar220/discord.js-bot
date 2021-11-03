const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'profilepic',
    async run(client, message, args){
        const target = message.mentions.users.first() || message.author;
        const imageLink = target.displayAvatarURL({ size: 256, dynamic: true });

        const profileEmbed = new MessageEmbed()
        .setURL(imageLink)
        .setTitle(`${target.username}'s Profile Picture`)
        .setColor(client.THEME)
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setImage(imageLink);

        message.channel.send({ embeds: [profileEmbed] });
        return;
    }
}