import "reflect-metadata";
import { Container } from "inversify";
import { Bot, botClientIntents } from "./bot";
import { TYPES } from "./types";
import { Client } from "discord.js";

const container = new Container();
container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client({ intents: botClientIntents }));
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);

export default container;