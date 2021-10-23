import { Interaction } from "discord.js";
import { CommandableClient, EventFile } from "../types";

module.exports = {
    name: 'interactionCreate',
    execute: async (interaction: Interaction) => {
        const client = interaction.client as CommandableClient;
        console.log(interaction, client.commands);
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction);
        } catch ( e ) {
            console.error(e);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
} as EventFile;