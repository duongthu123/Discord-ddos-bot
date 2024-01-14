const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data_point.db');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('point')
		.setDescription('số tiền đang có trong bot')
        .addUserOption(option => option.setName('user').setDescription('user plan check').setRequired(false)),
        async execute(interaction) {
            await interaction.deferReply();
            await wait(1000);
            const user = interaction.options.getUser('user') || interaction.user;
            const userId = user.id;
            const avatarURL = user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
            db.get('SELECT id, point FROM data WHERE id = ?', [userId], (err, row) => {
                if (err) {
                    throw err;
                }
                if (row) {
                    const Embed = new EmbedBuilder()
                    .setColor(color)
                    .setTitle(namebot)
                    .addFields({ name: "**`✨ point:`**",value: `\`\`\`css\n[ ${row.point} ]\n\`\`\``,inline: false })
                    .setTimestamp()
                    .setFooter({ text: 'Dev by ngọc(ALLEC_VN) xinh gái', iconURL: `${admin_url}` });
                    interaction.editReply({ embeds: [Embed] });
                }
                if (!row) {
                    const Embed = new EmbedBuilder()
                    .setColor(color)
                    .setTitle(namebot)
                    .addFields({ name: "**`✨ point:`**",value: `\`\`\`css\n[ 0 ]\n\`\`\``,inline: false })
                    .setTimestamp()
                    .setFooter({ text: 'Dev by ngọc(ALLEC_VN) xinh gái', iconURL: `${admin_url}` });
                    interaction.editReply({ embeds: [Embed] });
                }
            })
    }
}