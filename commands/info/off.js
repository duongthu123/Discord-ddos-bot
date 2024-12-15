const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { admin_id } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('off')
    .setDescription('tắt bot'),
    cooldown: 5,
    async execute(interaction, client) {
        if (interaction.user.id === admin_id) {
            var exec = require('child_process').exec
                exec(`taskkill /f /im node.exe`, (error, stdout, stderr) => {
            });
            interaction.reply(`dừng thành công`);
        } else {
            interaction.reply(`bạn ko có quyền sử dụng`);
        }
    }
}