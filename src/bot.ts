import { BitFieldResolvable, Intents, IntentsString, TextChannel } from "discord.js";
import { inject, injectable } from "inversify";
import { CommandableClient, CommandFile, EventFile, TYPES } from "./types";
import { crawlDirectory } from "./utils";
import { REST } from '@discordjs/rest';

@injectable()
export class Bot {
	@inject(TYPES.Client) private client: CommandableClient;
	@inject(TYPES.Token) private readonly token: string;
	@inject(TYPES.SteamWebToken) private readonly steamWebToken: string;

	public listen = async ():Promise<string> => {
		await this.registerCommands();
		this.registerEvents();

		// Kludge: Defining here because I can't easily access client in this particular event file.
		this.client.once('ready', () => {
			this.client.channels.cache.each((channel) => {
				if (channel.type === "GUILD_TEXT") {
					(channel as TextChannel).send("Bot is online");
				}
			});
		});

		return this.client.login(this.token);
	}

	private registerEvents = () => {
		crawlDirectory<EventFile>('events', ( { execute, name, once } ) => {
			if ( once ) {
				this.client.once(name, execute);
			} else {
				this.client.on(name, execute);
			}
		});
	}

	private registerCommands = async () => {
		// Attach list of all commands to the client, makes it accessible everywhere the client is accessible
		crawlDirectory<CommandFile>('commands', (command) => {
			this.client.commands.set(command.data.name, command);
		});
		/*const rest = new REST({ version: '9' }).setToken(this.token);
		try {
			console.log('Started refreshing Slash (/) commands');
			await rest.put(
				Routes.applicationGuildCommands('', '');
			);
		}*/
	};
}

export const botClientIntents: BitFieldResolvable<IntentsString, number> = [
	Intents.FLAGS.DIRECT_MESSAGES,
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
];