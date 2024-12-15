const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const moment = require('moment');
const { admin_id } = require('../../config.json');
const sqlite3 = require('sqlite3').verbose();
const data = new sqlite3.Database('database.db');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('add-user')
    .setDescription('add id(chỉ admin)')
    .addUserOption(option => option.setName('user').setDescription('user plan check').setRequired(true))
    .addStringOption(option => option.setName('plan').setDescription('plan muốn cho').setRequired(true).addChoices(
        { name: 'FREE', value: 'FREE' },
        { name: 'VIP', value: 'VIP' },
        { name: 'ADMIN', value: 'ADMIN' },))
    .addIntegerOption(option => option.setName('hour').setDescription('số giờ sử dụng').setRequired(true))
    .addIntegerOption(option => option.setName('day').setDescription('số ngày sử dụng').setRequired(true))
    .addIntegerOption(option => option.setName('ongiong').setDescription('số conn sử dụng(non = 1)').setRequired(false))
    .addIntegerOption(option => option.setName('attack-time').setDescription('max time attack(non = 60s)').setRequired(false)),
    cooldown: 5,
    async execute(interaction, client) {
        const user = interaction.options.getUser('user') || interaction.user;
        const id = user.id;
        const avatarURL = user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
        const hour = interaction.options.getInteger('hour');
        const plan = interaction.options.get('plan').value;
        const day = interaction.options.get('day').value;
        const ongiong = interaction.options.getInteger('ongiong') ?? 1;
        const attack_time = interaction.options.getInteger('attack-time') ?? 60;
        if (interaction.user.id === admin_id) {
            data.get('SELECT users_id, plan, exp FROM users WHERE users_id = ?', [id],async (err, row) => {
                if (err) {
                  throw err;
                }
                if (row) {
                    interaction.reply({ content: 'users is plans', ephemeral: true });
                } else {
                    if (hour > 24) {
                        interaction.reply(`số giờ phải dưới 24`);
                    } else {
                        const users_id = `${id}`;
                        const user_id = `${id}`;
                        const expirationTime = moment().add(hour, 'hour').add(day, 'days');       

                        const currentTime = new Date();
                        const nextDay = moment(currentTime).add(hour, 'hour').add(day, 'days');
                        const exp = nextDay.format('HH:mm DD/MM/YYYY');
                        data.run('INSERT INTO users (user_id, users_id, expire_time, plan, exp, ongiong, attack_time) VALUES (?, ?, ?, ?, ?, ?, ?)', [users_id ,user_id, expirationTime.unix(), plan, exp, ongiong, attack_time], (err) => {
                        if (err) {
                            return console.error(err.message);
                        }
                            console.log(`[sqlite] nhập thành công`);
                        });
                        const Embed = new EmbedBuilder()
                            .setColor(color)
                            .setTitle(namebot)
                            .setDescription('ADD USER')
                            .setThumbnail(avatarURL)
                            .addFields({ name: '`👪 User:`', value: `\`\`\`css\n[ ${user.displayName} ]\n\`\`\`` })
                            .addFields({ name: '`🕛 Day:`', value: `\`\`\`css\n[ ${day} ]\n\`\`\`` })
                            .addFields({ name: '`🕛 Hour:`', value: `\`\`\`css\n[ ${hour} ]\n\`\`\`` })
                            .addFields({ name: '`💸 Plan:`', value: `\`\`\`css\n[ ${plan} ]\n\`\`\`` })
                            .addFields({ name: '`🔰 Ongiong:`', value: `\`\`\`css\n[ ${ongiong} ]\n\`\`\`` })
                            .addFields({ name: '`💥 Attack time:`', value: `\`\`\`css\n[ ${attack_time} ]\n\`\`\`` })
                            //.setImage(img_url)
                            .setTimestamp()
                            .setFooter({ text: names, iconURL: `${admin_url}` });
                        interaction.reply({ embeds: [Embed], ephemeral: true });

                        const embed = new EmbedBuilder()
                            .setColor(color)
                            .setTitle(namebot)
                            .setDescription('ADD USER')
                            .setThumbnail(avatarURL)
                            .addFields({ name: '`👪 User:`', value: `\`\`\`css\n[ ${user.displayName} ]\n\`\`\`` })
                            .addFields({ name: '`🕛 Day:`', value: `\`\`\`css\n[ ${day} ]\n\`\`\`` })
                            .addFields({ name: '`🕛 Hour:`', value: `\`\`\`css\n[ ${hour} ]\n\`\`\`` })
                            .addFields({ name: '`💸 Plan:`', value: `\`\`\`css\n[ ${plan} ]\n\`\`\`` })
                            .addFields({ name: '`🔰 Ongiong:`', value: `\`\`\`css\n[ ${ongiong} ]\n\`\`\`` })
                            .addFields({ name: '`💥 Attack time:`', value: `\`\`\`css\n[ ${attack_time} ]\n\`\`\`` })
                            .setImage('https://i.imgur.com/YYkx9xj.jpeg')
                            .setTimestamp()
                            .setFooter({ text: names, iconURL: `${admin_url}` });
                        await interaction.user.send({ embeds: [embed] });
                    }
                }
            });
        } else {
            interaction.reply({ content: 'bạn ko có quyền sử dụng lệnh này', ephemeral: true });
        }  
    }
}