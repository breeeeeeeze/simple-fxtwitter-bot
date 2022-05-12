require('dotenv').config();
const { channelIDs } = require('./config.json')

const { Client, Intents: { FLAGS } } = require('discord.js');
const bot = new Client({
	intents: [
		FLAGS.GUILDS,
		FLAGS.GUILD_MESSAGES,
	],
});
bot.login(process.env.BOT_TOKEN);

bot.on('ready', (() => {
	console.log('Ready!');
}));

const isTwitterVideo = (message) => {
	if (
		channelIDs.includes(message.channel.id) &&
		message.content.includes('https://twitter.com/') &&
		message.embeds.length
	) {
		if (message.embeds[0].video) return true;
	};
	return false;
};

const postFixedLink = (message) => {
	const retardWarning = `<@${message.author.id}> post fxtwitter link retard`;
	const fixedLink = message.content.replace('https://twitter.com/', 'https://fxtwitter.com/');
	message.channel.send(`${retardWarning}\n${fixedLink}`);
	message.delete();
};

bot.on('messageCreate', ((message) => {
	if (isTwitterVideo(message)) postFixedLink(message);
}));

bot.on('messageUpdate', ((_old, message) => {
	if (isTwitterVideo(message)) postFixedLink(message);
}));
