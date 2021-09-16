/**
 * To avoid Naming Collisions, we use Symbol() to convert each type into a unique identifier
 */
import { ClientEvents } from "discord.js";

export const TYPES = {
	Bot: Symbol('Bot'),
	Client: Symbol('Client'),
	Token: Symbol('Token'),
}

export interface EventFile {
	once?: boolean;
	name: keyof ClientEvents;
	execute: ( ...args ) => void;
}
