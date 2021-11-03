module.exports = {
    name: 'test',
    async run(client, message, args){
        if(message.author.id == client.CREATOR.ID) message.reply('Test was successful!');
        else { message.reply('You do not have access to this command!'); }
        return;
    }
}