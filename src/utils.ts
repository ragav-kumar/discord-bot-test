import * as fs from "fs";

/**
 * Helper function to easily crawl a directory which contains modules of some known type T
 */
export const crawlDirectory = <T extends unknown>(dir:string, callback:(module:T) => void) => {
	// Get filename from dist, since that's where we're executing from... gotta refactor to run from src instead
	const filenames = fs.readdirSync(`./dist/${dir}`).filter(file => file.endsWith('.js'));
	for ( const file of filenames ) {
		// Import specific module and execute as appropriate
		const module:T = require(`./${dir}/${file}`);
		callback(module);
	}
}