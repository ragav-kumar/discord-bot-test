import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandFile } from '../types';
import { BaseCommandInteraction } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping test'),
    execute: (interaction:BaseCommandInteraction) => interaction.reply('Pong'),
} as CommandFile;