const { MessageEmbed } = require('discord.js');
const axios = require('axios');
module.exports = {
    name: 'anipic',
    async run(client, message, args){
        const picQuery = args.join(' ').toLowerCase();
        const picList = ['poke','neko','shinobu','megumin','bully','cuddle','cry','hug','awoo','kiss','lick','pat','smug','bonk','yeet','blush','smile','wave','highfive','handhold','nom','bite','glomp','slap','kill','happy','wink','dance','cringe'];
        const listLength = picList.length;

        const picEmbed = new MessageEmbed()
        .setTitle('Here\'s your anime picture!')
        .setColor(client.THEME)
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

        async function process(type){
            axios.get(`https://api.waifu.pics/sfw/${type}`)
            .then(response => {
                const picData = response['data'];
                const imageLink = picData['url'];
                picEmbed.setURL(imageLink).setImage(imageLink);
                message.channel.send({ embeds: [picEmbed] });
            })
            .catch(error => { console.error(error); });
        }

        const number = Math.floor(Math.random()*listLength);

        if(!picQuery){ process(picList[number]); }
        else {
            for(var i=0; i<=listLength; i++){ if(picList[i] == picQuery){ var category = picList[i]; } }
            if(!category) return message.reply('Invalid category!');
            process(category);
        }
        return;
    }
}