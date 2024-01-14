const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { admin_id } = require('../../config.json');

module.exports = {
    cooldown: 300,
    data: new SlashCommandBuilder()
		.setName('off')
		.setDescription('tắt bot'),
        //.addStringOption(option => option.setName('ip').setDescription('ip cần kiểm tra').setRequired(true)),
        async execute(interaction) {
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