const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data_point.db');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('xem lệnh sử dụng bot'),
        async execute(interaction) {
            await interaction.deferReply();
            await wait(1000);
            const Embed = new EmbedBuilder()
            .setColor(color)
            .setTitle(namebot)
            .setDescription('lệnh cơ bản')
            .addFields({ name: "**`lệnh DDoS:`**",value: `\`\`\`css\n /start-l4, /start-l7\n\`\`\``,inline: false })
            .addFields({ name: "**`lệnh SmS:`**",value: `\`\`\`css\n /sms \n\`\`\``,inline: false })
            .addFields({ name: "**`lệnh GEOIP:`**",value: `\`\`\`css\n /geo-ip \n\`\`\``,inline: false })
            .addFields({ name: "**`lệnh xem Plan:`**",value: `\`\`\`css\n /plan-user \n\`\`\``,inline: false })
            .setTimestamp()
            .setFooter({ text: 'Dev by ngọc(ALLEC_VN)', iconURL: `${admin_url}` });
            interaction.editReply({ embeds: [Embed] });
    }
}