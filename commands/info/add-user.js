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
        .addIntegerOption(option => option.setName('ongiong').setDescription('số conn sử dụng(non = 1)').setRequired(false))
        .addIntegerOption(option => option.setName('attack-time').setDescription('max time attack(non = 60s)').setRequired(false)),
        async execute(interaction) {
            const user = interaction.options.getUser('user') || interaction.user;
            const id = user.id;
            const avatarURL = user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
            const hour = interaction.options.getInteger('hour');
            const plan = interaction.options.get('plan').value;
            const ongiong = interaction.options.getInteger('ongiong') ?? 1;
            const attack_time = interaction.options.getInteger('attack-time') ?? 60;
            if (interaction.user.id === admin_id) {
                if (hour > 24) {
                    interaction.reply(`số giờ phải dưới 24`);
                } else {
                    const users_id = `${id}`;
                    const user_id = `${id}`;
                    const expirationTime = moment().add(hour, 'hour');       

                    const currentTime = new Date();
                    const nextDay = moment(currentTime).add(hour, 'hour');
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
                        .addFields({ name: '`🕛 Hour:`', value: `\`\`\`css\n[ ${hour} ]\n\`\`\`` })
                        .addFields({ name: '`💸 Plan:`', value: `\`\`\`css\n[ ${plan} ]\n\`\`\`` })
                        .addFields({ name: '`🔰 Ongiong:`', value: `\`\`\`css\n[ ${ongiong} ]\n\`\`\`` })
                        .addFields({ name: '`💥 Attack time:`', value: `\`\`\`css\n[ ${attack_time} ]\n\`\`\`` })
                        //.setImage(img_url)
                        .setTimestamp()
                        .setFooter({ text: 'Dev by ngọc(ALLEC_VN)', iconURL: `${admin_url}` });
                interaction.reply({ embeds: [Embed], ephemeral: true });
            }
        } else {
            interaction.reply('bạn ko có quyền sài lệnh này');
        }
    }
}