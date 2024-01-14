const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const moment = require('moment');
const { admin_id } = require('../../config.json');
const sqlite3 = require('sqlite3').verbose();
const data = new sqlite3.Database('data_point.db');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('edit-point')
		.setDescription('sửa lại số point(chỉ admin)')
        .addStringOption(option => option.setName('id').setDescription('id discord').setRequired(true))
        .addIntegerOption(option => option.setName('point').setDescription('số point cần sửa').setRequired(true)),
    async execute(interaction) {
        const id = interaction.options.get('id').value;
        const point = interaction.options.get('point').value;
        if (interaction.user.id === admin_id) {
                
                data.run('UPDATE data SET point = ? WHERE id = ?', [point, id], (err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log(`[sqlite] nhập thành công`);
                });
            interaction.reply(`edit thành công \npoint: ${point} \nID:  ${id}`);
            
        }
    }
}