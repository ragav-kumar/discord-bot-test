import "reflect-metadata";
import { Container } from "inversify";
import { Bot, botClientIntents } from "./bot";
import { CommandableClient, CommandFile, TYPES } from "./types";
import { Client, Collection } from "discord.js";

const container = new Container();
container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();

// This is a very verbose and convoluted approach to attaching a collection of commands to the client...
const client = new Client({ intents: botClientIntents });
const commandable = client as CommandableClient;
commandable.commands = new Collection<string, CommandFile>();

container.bind<CommandableClient>(TYPES.Client).toConstantValue(commandable);
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<string>(TYPES.SteamWebToken).toConstantValue(process.env.STEAM_KEY);
container.bind<string>(TYPES.ClientId).toConstantValue(process.env.CLIENT_ID);
container.bind<string>(TYPES.GuildId).toConstantValue(process.env.GUILD_ID);
container.bind<string>(TYPES.BotChannelId).toConstantValue(process.env.BOT_CHANNEL_ID);

export default container;