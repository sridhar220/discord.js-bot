const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'geekmeter',
    async run(client, message, args){
        const target = message.mentions.users.first() || message.author;
        if(target.bot) return message.reply('Bots are not geeks!');

        const percent = Math.floor(Math.random()*101);
        const geekEmbed = new MessageEmbed()
        .setTitle('GeekMeter')
        .setDescription(`${target.username}'s Reading: \`${percent}%\``)
        .setColor(client.THEME)
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

        message.channel.send({ embeds: [geekEmbed] });
        return;
    }
}