import { Message, TextChannel } from "discord.js";
import { EventFile } from "../types";

module.exports = {
	name: 'messageCreate',
	execute: ( msg: Message ) => {
		if (msg.author.bot) return;
		console.log("[", (msg.channel as TextChannel)?.name, "] ", msg.content);
		const channel = msg.client.channels.cache.get(msg.channel.id) as TextChannel;
		channel.send(`Echo: ${msg.content}`);
	},
} as EventFile;