const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
		.setName('banking')
		.setDescription('nạp tiền vào bot qua banking'),
        async execute(interaction) {
            await interaction.deferReply();
            await wait(1000);
            interaction.editReply('Chưa được tích hợp');
    }
}