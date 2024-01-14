const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { admin_id } = require('../../config.json');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('delete-user')
		.setDescription('xóa tài khoản khỏi database(chỉ admin)')
    .addUserOption(option => option.setName('user').setDescription('user plan check').setRequired(true)),
      async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const id = user.id;
        const userId = id;
        if (interaction.user.id === admin_id) {
          interaction.reply({ content: `đã xóa ID: ${userId} khỏi database`, ephemeral: true });
            db.run('DELETE FROM users WHERE users_id = ?', [userId], (err) => {
              if (err) {
                  return console.error(err.message);
              }
              console.log(`[sqlite] xóa thành công`);
            });
        } else {
          interaction.reply('bạn ko có quyền sử dụng lệnh này');
        }
    }
}