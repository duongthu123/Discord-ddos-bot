const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('attack-server')
	.setDescription('attack server status'),
    cooldown: 15,
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true });
		await wait(1000);
        const Embed = new EmbedBuilder()
            .setColor(color)
            .setTitle(namebot)
            .setDescription('SERVER STATUS')
            .addFields({ name: '`🔰 NODE FREE:`', value: `\`\`\`css\n FREE01: 0/1 \n FREE02: 0/1 \n FREE03: 0/1\n\`\`\`` })
            .addFields({ name: '`🔰 NODE VIP:`', value: `\`\`\`css\n VIP01: 0/1 \n VIP02: 0/1\n\`\`\`` })
            .addFields({ name: '`🔰 NODE SMS:`', value: `\`\`\`css\n RUNNING: 0/5 \n\`\`\`` })
            .addFields({ name: '`🔰 CNC NODE:`', value: `\`\`\`css\n RUNNING: 0/3\n\`\`\`` })
            .addFields({ name: '`🔰 BOTNET NODE:`', value: `\`\`\`css\n RUNNING: 0/10\n\`\`\`` })
            .setTimestamp()
            .setFooter({ text: names, iconURL: `${admin_url}` });
        await interaction.editReply({ embeds: [Embed], ephemeral: true });
    }
}