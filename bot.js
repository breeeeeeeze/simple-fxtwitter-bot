require('dotenv').config();


const { Client, Intents } = require('discord.js');
const bot = new Client({
	intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS],
});

bot.login(process.env.BOT_TOKEN);

bot.on('messageCreate', (message => {
	if (message.channel.id !== process.env.CHANNEL_ID) return;
	if (!message.content.includes('https://twitter.com/')) return;
	if (!message.embeds[0].video) return;
	message.channel.send(message.content.replace('twitter','fxtwitter'))
		.then(() => {
			message.channel.send(`/mute ${message.author.id} 1m`);
		})
	message.delete();
}));