const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('plan-user')
		.setDescription('xem plan')
        .addUserOption(option => option.setName('user').setDescription('user plan check').setRequired(false)),
        async execute (interaction, client) {
        const user = interaction.options.getUser('user') || interaction.user;
        const userId = user.id;
        const avatarURL = user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
        db.get('SELECT users_id, plan, exp, ongiong, attack_time FROM users WHERE users_id = ?', [userId], (err, row) => {
            if (err) {
              throw err;
            }
            if (row) {
                const Embed = new EmbedBuilder()
                .setColor(color)
                .setTitle(namebot)
                .setThumbnail(avatarURL)
                .setDescription("`" + `✨ Plan của ${user.displayName}:` + "`")
                .addFields({ name: '`💸 Plan:`', value: `${row.plan}` })
                .addFields({ name: '`🕛 Time:`', value: `${row.exp}`})
               // .addFields({ name: '`🔰 Ongiong:`', value: `${row.ongiong}` })
                .addFields({ name: '`💥 Attack time:`', value: `${row.attack_time}` })
                .setTimestamp()
                .setFooter({ text: 'Dev by ngọc(ALLEC_VN)', iconURL: `${admin_url}` });
                interaction.reply({ embeds: [Embed] });
            } else if (!row) {
                const Embed = new EmbedBuilder()
                .setColor(color)
                .setTitle(namebot)
                .setThumbnail(avatarURL)
                .setDescription("`" + `✨ Plan của ${user.displayName}` + "`")
                .addFields({ name: '`💸 Plan:`', value: `ko có` })
                .addFields({ name: '`🕛 time:`', value: `ko có` })
               // .addFields({ name: '`🔰 Ongiong:`', value: `0` })
                .addFields({ name: '`💥 Attack time:`', value: `0` })
                .setTimestamp()
                .setFooter({ text: 'Dev by ngọc(ALLEC_VN)', iconURL: `${admin_url}` });
                interaction.reply({ embeds: [Embed] });
            }
              
        });
    }
};