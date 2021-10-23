/**
 * To avoid Naming Collisions, we use Symbol() to convert each type into a unique identifier
 */
import { BaseCommandInteraction, Client, ClientEvents, Collection } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';

export const TYPES = {
	Bot: Symbol('Bot'),
	Client: Symbol('CommandableClient'),
	Token: Symbol('Token'),
	SteamWebToken: Symbol('SteamWebToken'),
	ClientId: Symbol('ClientId'),
	GuildId: Symbol('GuildId'),
	BotChannelId: Symbol('BotChannelId'),
}

export interface EventFile {
	once?: boolean;
	name: keyof ClientEvents;
	execute: ( ...args ) => void;
}

export interface CommandFile {
	data: SlashCommandBuilder;
	execute: (interaction:BaseCommandInteraction) => Promise<void>;
}

export type CommandableClient = Client & { commands: Collection<string, CommandFile> };