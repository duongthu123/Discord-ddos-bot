const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const moment = require('moment');
const sqlite3 = require('sqlite3').verbose();
const data = new sqlite3.Database('data_key.db');
const db = new sqlite3.Database('database.db');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
    .setName('key')
	.setDescription('nhập key')
	.addStringOption(option => option.setName('key').setDescription('nhập key vừa lấy vào').setRequired(true)),
    cooldown: 15,
    async execute(interaction, client) {
        const key = interaction.options.get('key').value;

        const user_id = `${interaction.user.id}`;
        const users_id = `${interaction.user.id}`;
        const expirationTime = moment().add(1, 'hour');       
        const ongiong = 1;
        const attack_time = 60;
        const plan = 'FREE';
        const currentTime = new Date();
        const nextDay = moment(currentTime).add(1, 'hour');
        const exp = nextDay.format('HH:mm DD/MM/YYYY');
        data.get('SELECT id, key, exp FROM key WHERE id = ?', [user_id], async (err, row) => {
            if (err) {
                throw err;
            }
            if (row) {
                if (key === row.key) {
                    db.run('INSERT INTO users (user_id, users_id, expire_time, plan, exp, ongiong, attack_time) VALUES (?, ?, ?, ?, ?, ?, ?)', [users_id ,user_id, expirationTime.unix(), plan, exp, ongiong, attack_time],async (err) => {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log(`[sqlite] nhập thành công`);
                        await interaction.deferReply({ ephemeral: true });
		                await wait(4000);
                        const embed = new EmbedBuilder()
                        .setColor(color)
                        .setTitle('GET KEY')
                        .setDescription('```'+ `ansi
                        [ [2;32m[2;36m  nhập thành công![0m[2;32m[0m ]`+ '```')
                        .setTimestamp()
                        .setFooter({ text: names, iconURL: `${admin_url}` });
                        await interaction.editReply({ embeds: [embed] , ephemeral: true });
                    });
                    data.run('DELETE FROM key WHERE id = ?', [user_id], (err) => {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log(`[sqlite] xóa key thành công`);
                    });
                } else {
                    await interaction.reply({ content: 'key sai!', ephemeral: true });
                }
            } else {
                await interaction.reply({ content: 'Key hết hạn hoặc bạn chưa getkey!', ephemeral: true });
            }
            
        });
    }
}