import { BitFieldResolvable, Client, Intents, IntentsString, TextChannel } from "discord.js";
import { inject, injectable } from "inversify";
import { EventFile, TYPES } from "./types";
import { crawlDirectory } from "./utils";

@injectable()
export class Bot {
	@inject(TYPES.Client) private client: Client;
	@inject(TYPES.Token) private readonly token: string;

	public listen(): Promise<string> {
		crawlDirectory<EventFile>('events', ( { execute, name, once } ) => {
			if ( once ) {
				this.client.once(name, execute);
			} else {
				this.client.on(name, execute);
			}
		});
		// Kludge: Defining here because I can't access client in an event file.
		this.client.once('ready', () => {
			this.client.channels.cache.each((channel) => {
				if (channel.type === "GUILD_TEXT") {
					(channel as TextChannel).send("Bot is online");
				}
			});
		});
		return this.client.login(this.token);
	}
}

export const botClientIntents: BitFieldResolvable<IntentsString, number> = [
	Intents.FLAGS.DIRECT_MESSAGES,
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
];