const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const moment = require('moment');
const { admin_id } = require('../../config.json');
const sqlite3 = require('sqlite3').verbose();
const data = new sqlite3.Database('data_point.db');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('set-point')
		.setDescription('add point(chỉ admin)')
        .addStringOption(option => option.setName('id').setDescription('id discord').setRequired(true))
        .addIntegerOption(option => option.setName('point').setDescription('số point add').setRequired(true)),
    async execute(interaction) {
        const id = interaction.options.get('id').value;
        const point = interaction.options.get('point').value;
        if (interaction.user.id === admin_id) {
                const users_id = `${id}`;
                data.run('INSERT INTO data (id, point) VALUES (?, ?)', [users_id , point], (err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log(`[sqlite] nhập thành công`);
                });
            interaction.reply(`add thành công \npoint: ${point} \nID:  ${id}`);
            
        }
    }
}