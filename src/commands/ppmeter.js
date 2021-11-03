const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'ppmeter',
    async run(client, message, args){
        const target = message.mentions.users.first() || message.author;
        if(target.bot) return message.reply('Bots do not have a pp!');
        if(target.id == client.CREATOR.ID) return message.reply('Too huge!');

        const number = Math.floor(Math.random()*10) + 1;
        let pp = '8';
        for(let i=0; i<=number; i++){ pp += '='; }
        pp += 'D';
        const ppEmbed = new MessageEmbed()
        .setTitle('PP Meter')
        .setDescription(`${target.username}'s Reading: \`${pp}\``)
        .setColor(client.THEME)
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

        message.channel.send({ embeds: [ppEmbed] });
        return;
    }
}