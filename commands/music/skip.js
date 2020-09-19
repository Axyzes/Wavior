const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    const serverQueue = client.queue.get(message.guild.id);
    if (!message.member.voice.channel) return message.channel.send('You aren\'t connected to a voice channel!');

    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
        return message.channel.send(`You aren\'t in the same channel as me!`);
    };
    
    if(!message.guild.me.voice.channel) return message.channel.send('I\'m not connected to a voice channel!');
    if (!serverQueue) return message.channel.send('There is nothing currently playing.');

    if (!serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
    }
        
    message.channel.send(`**${serverQueue.songs[0].title}** has been skipped!`);
    serverQueue.connection.dispatcher.end();
    return;
};

module.exports.help = {
	name: "skip",
    aliases: ["next"],
};