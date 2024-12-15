const { SlashCommandBuilder, EmbedBuilder, WebhookClient, } = require('discord.js');
const { attack_log, api_sms_free, api_sms_vip } = require('../../config.json');
const webhookURL = attack_log;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const wait = require('node:timers/promises').setTimeout;
var axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('sms')
	.setDescription('spam sms cháy máy đối phương')
    .addStringOption(option => option.setName('methods').setDescription('methods spam').setRequired(true).addChoices(
        { name: 'SMS(FREE)', value: 'SMS' },
        { name: 'SMS-FIRE(VIP)', value: 'SMS-FIRE' },
    ))
    .addStringOption(option => option.setName('phone').setDescription('số đt cần spam').setRequired(true)),
    cooldown: 300,
    async execute(interaction, client) {
        const userId = interaction.user.id;
        await interaction.deferReply({ ephemeral: true });
		await wait(1000);
        db.get('SELECT users_id, plan, exp FROM users WHERE users_id = ?', [userId],async (err, row) => {
            
            if (err) {
              throw err;
            }
            if (row) {
                if (`${row.plan}` === 'VIP', 'FREE', 'ADMIN', 'SMS') {
                    const sdt = interaction.options.get('phone').value;
                    const method = interaction.options.get('methods').value;
                    const check = /^\d{10}$/;
                    if (!check.test(sdt)) {
                        await interaction.editReply({ content: `sai định dạng sđt, Vd: 0123456789!`, ephemeral: true });
                        return;
                    } else {
                    //const au = interaction.options.get('amount').value;
                        if (sdt === '110'|| sdt === '111'|| sdt === '112'|| sdt === '113'|| sdt === '114'|| sdt === '115'|| sdt === '911' || sdt === '0365494577' || sdt === "0123456789") {
                            interaction.editReply({ content: 'bạn không thể spam nhữ số này!', ephemeral: true });
                        } else {
                            console.log('[sms] đang chạy sms spam');
                            const free = api_sms_free.replace('[phone]', sdt);
                            const vip = api_sms_vip.replace('[phone]', sdt);
                            if (row.plan === 'FREE') {
                                if (method === 'SMS') {
                                    const embed = new EmbedBuilder()
                                    .setColor(color)
                                    .setTitle(namebot)
                                    .setDescription('```'+ `Attack Sent Check DMS` + '```')
                                    .setTimestamp()
                                    .setFooter({ text: names, iconURL: `${admin_url}` });
                                    await interaction.editReply({ embeds: [embed] , ephemeral: true });

                                    const Embed = new EmbedBuilder()
                                    .setColor(color)
                                    .setTitle(namebot)
                                    .setDescription('SMS Method')
                                    .addFields({ name: '`🧨 Đang spam số:`', value: `\`\`\`css\n[ ${sdt} ]\n\`\`\``, inline: true })
                                    .addFields({ name: '`🔰 Method:`', value: `\`\`\`css\n[ ${method} ]\n\`\`\``, inline: true })
                                    .addFields({ name: '`💸 Plan:`', value: `\`\`\`css\n[ ${row.plan} ]\n\`\`\`` })
                                    .setImage(img_url)
                                    .setTimestamp()
                                    .setFooter({ text: names, iconURL: `${admin_url}` });
                                    interaction.user.send({ embeds: [Embed], ephemeral: true });
                                    axios.get(free)
                                    .then(async (response) => {
                                        if (response.status === 200) {
                                            console.log('[axios] Kết quả thành công:', response.data);
                                        } else if (response.status === 429) {
                                        console.log('[axios] err:', response.status);
                                        } else {
                                            console.log('[axios] timeout:', response.status);
                                        }
                                    }).catch(async (error) => {
                                        console.error('[axios] Lỗi kết nối:', error.message);
                                    });

                                } else {
                                    interaction.user.send({ content: 'bạn ko có plan để sử dụng methods này!', ephemeral: true });
                                }
                            } else if (row.plan === 'VIP' || row.plan === 'ADMIN') {
                                if (method === 'SMS-FIRE' || method === 'SMS') {
                                    const embed = new EmbedBuilder()
                                    .setColor(color)
                                    .setTitle(namebot)
                                    .setDescription('```'+ `Attack Sent Check DMS` + '```')
                                    .setTimestamp()
                                    .setFooter({ text: names, iconURL: `${admin_url}` });
                                    await interaction.editReply({ embeds: [embed] , ephemeral: true });
                                
                                    const Embed = new EmbedBuilder()
                                    .setColor(color)
                                    .setTitle(namebot)
                                    .setDescription('SMS Method')
                                    .addFields({ name: '`🧨 Đang spam số:`', value: `\`\`\`css\n[ ${sdt} ]\n\`\`\``, inline: true })
                                    .addFields({ name: '`🔰 Method:`', value: `\`\`\`css\n[ ${method} ]\n\`\`\``, inline: true })
                                    .addFields({ name: '`💸 Plan:`', value: `\`\`\`css\n[ ${row.plan} ]\n\`\`\`` })
                                    .setImage(img_url)
                                    .setTimestamp()
                                    .setFooter({ text: names, iconURL: `${admin_url}` });
                                    interaction.user.send({ embeds: [Embed], ephemeral: true });
                                    axios.get(vip)
                                    .then(async (response) => {
                                        if (response.status === 200) {
                                            console.log('[axios] Kết quả thành công:', response.data);
                                        } else if (response.status === 429) {
                                            console.log('[axios] err:', response.status);
                                        } else {
                                            console.log('[axios] timeout:', response.status);
                                        }
                                    }).catch(async (error) => {
                                        console.error('[axios] Lỗi kết nối:', error.message);
                                    });
                                } 
                            } else {
                                interaction.editReply({ content: 'bạn ko có plan để sử dụng methods này!', ephemeral: true });
                            }
                        }
                    }
                }
            } else {
                interaction.editReply('bạn ko có plan để sử dụng lệnh!');
            }
        });
    }
}