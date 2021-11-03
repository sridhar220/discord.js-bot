const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'serverinfo',
    async run(client, message, args){
        if(!message.guild) return message.channel.send('You can only use this command in a server!');
        const Guild = client.guilds.cache.get(message.guild.id);

        const guildName         = Guild.name;
        const guildOwnerID      = `<@${Guild.ownerId}>`;
        const guildDescription  = `${Guild.description}`;
        const memberCount       = `${Guild.memberCount}`;
        const guildIcon         = Guild.iconURL();
        const textChannelCount  = `${message.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size}`;
        const voiceChannelCount = `${message.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size}`;
        
        const guildEmbed = new MessageEmbed()
        .setDescription('**Server Information**')
        .setColor(client.THEME)
        .addFields(
            { name: 'Server Name'       , value: guildName        , inline: true },
            { name: 'Server Owner'      , value: guildOwnerID     , inline: true },
            { name: 'Server Description', value: guildDescription , inline: true },
            { name: 'Member Count'      , value: memberCount      , inline: true },
            { name: 'Text Channel(s)'   , value: textChannelCount , inline: true },
            { name: 'Voice Channel(s)'  , value: voiceChannelCount, inline: true }
        );
        if(guildIcon){ guildEmbed.setThumbnail(guildIcon); }

        message.channel.send({ embeds: [guildEmbed] });
        return;
    }
}