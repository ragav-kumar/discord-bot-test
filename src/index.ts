require('dotenv').config();

import container from "./inversify.config";
import { TYPES } from "./types";
import { Bot } from "./bot";

const bot = container.get<Bot>(TYPES.Bot);
(async () => {
	try {
		await bot.listen();
		console.log("Logged  In");
	} catch ( e ) {
		console.log("Error", e);
	}
})();