const { Client, Collection, Intents } = require('discord.js');
const intents = [
	Intents.FLAGS.GUILDS, 
	Intents.FLAGS.GUILD_BANS,
	Intents.FLAGS.GUILD_INVITES,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_WEBHOOKS,
	Intents.FLAGS.GUILD_INTEGRATIONS,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
];
const client = new Client({ intents: intents });
const { CREATOR, TOKEN, PREFIX, THEME, APIKEYS } = require('../config/config.json')

client.commands = new Collection();

client.CREATOR    = CREATOR;
client.THEME      = THEME;
client.APIKEYS    = APIKEYS;
client.THUMBNAILS = require('../config/thumbnails.json');

const fs = require('fs');
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log(`${client.user.username} has connected to Discord!`);
	client.user.setActivity(`${PREFIX}cmdlist`, { type: 'PLAYING' });
});

client.on('warn' , async warning => console.log(warning));
client.on('error', async error => console.error(error));

client.on('messageCreate', async message => {
	if(message.author.bot || message.author.system) return;
	if(!message.content.startsWith(PREFIX)) return;

	if(!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return message.author.send(`I do not have permissions to send **MESSAGES** in <#${message.channel.id}> of ${message.guild.name}. \nTry fixing my permissions or ask someone who has the ability to do so.`);
	if(!message.channel.permissionsFor(client.user).has('EMBED_LINKS')) return message.channel.send('I do not have permissions to send **EMBEDS** in this channel! \nPlease fix my permissions and try again!');

	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if(!client.commands.has(command)){ 
		message.react('❌'); 
		message.reply('Invalid command!');
		return;
	}
	try { client.commands.get(command).run(client, message, args) }
	catch(error){ console.error(error); }
});

client.login(TOKEN);