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

const links = ['https://twitter.com/', 'https://mobile.twitter.com/', 'https://x.com/']


const isTwitterVideo = (message) => {
	if (
		channelIDs.includes(message.channel.id) &&
		links.some((link) => message.content.includes(link)) &&
		message.embeds.length
	) {
		if (message.embeds[0].video) return true;
	};
	return false;
};

const replaceLink = (message) => {
	let content = message.content
	for (const link of links) {
		content = content.replace(link, 'https://vxtwitter.com/')
	}
	return content
}

const postFixedLink = (message) => {
	const retardWarning = `<@${message.author.id}> post vxtwitter link retard`;
	const fixedLink = replaceLink(message)
	message.channel.send(`${retardWarning}\n${fixedLink}`);
	message.delete();
};

bot.on('messageCreate', ((message) => {
	if (isTwitterVideo(message)) postFixedLink(message);
}));

bot.on('messageUpdate', ((_old, message) => {
	if (isTwitterVideo(message)) postFixedLink(message);
}));
