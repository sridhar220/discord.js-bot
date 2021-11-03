const { MessageEmbed } = require('discord.js');
const axios = require('axios');
module.exports = {
    name: 'animesearch',
    async run(client, message, args){
        const searchQuery = args.join(' ');
        if(!searchQuery) return message.reply('Please enter a search query!');

        axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${searchQuery}`)
        .then(response => {
            const animeData = response['data'];
            if(animeData['meta']['count'] == 0) return message.reply('Unfortunately, no results were found.');

            const animeId          = animeData['data'][0]['id'];
            const animeURL         = 'https://kitsu.io/anime/' + animeId;
            const animeTitle       = animeData['data'][0]['attributes']['titles']['en_jp'];
            const animeThumbnail   = animeData['data'][0]['attributes']['posterImage']['large'];
            const animeDescription = animeData['data'][0]['attributes']['synopsis'];
            const animeEpisodes    = `${animeData['data'][0]['attributes']['episodeCount']}`;
            const animePopularity  = `${animeData['data'][0]['attributes']['popularityRank']}`;
            const animeRatings     = animeData['data'][0]['attributes']['averageRating'];
            const animeAirDate     = animeData['data'][0]['attributes']['startDate'];
            const animeEndDate     = animeData['data'][0]['attributes']['endDate'];
            const ageRating        = animeData['data'][0]['attributes']['ageRating'];

            const animeEmbed = new MessageEmbed()
            .setURL(animeURL)
            .setTitle(animeTitle)
            .setDescription(animeDescription)
            .setColor(client.THEME)
            .setThumbnail(animeThumbnail)
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Total Episodes' , value: animeEpisodes   , inline: true },
                { name: 'Popularity Rank', value: animePopularity , inline: true },
                { name: 'Ratings'        , value: animeRatings    , inline: true },
                { name: 'Air Date'       , value: animeAirDate    , inline: true },
                { name: 'End Date'       , value: animeEndDate    , inline: true },
                { name: 'Age Rating'     , value: ageRating       , inline: true }
            );

            message.channel.send({ embeds: [animeEmbed] });
        })
        .catch(error => { console.error(error); });
        return;
    }
}