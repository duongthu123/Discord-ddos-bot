const { SlashCommandBuilder, WebhookClient, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const { link_1s, key_log } = require('../../config.json');
const webhookURL = key_log 
const wait = require('node:timers/promises').setTimeout;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const moment = require('moment');
link = '';

module.exports = {
    data: new SlashCommandBuilder()
    .setName('get-key')
	.setDescription('lấy key ddos và sms'),
    cooldown: 3600,
    async execute(interaction, client) {
        const userId = interaction.user.id;
    db.get('SELECT users_id, plan, exp FROM users WHERE users_id = ?', [userId], async (err, row) => {
      if (err) {
        throw err;
      }
      if (row) {
        interaction.reply('bạn chưa hết plan nên ko thể getkey đc');
      } else {
      function generateRandomCode(length) {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let code = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          code += charset[randomIndex];
        }
        return code;
      }

      const randomCode = generateRandomCode(8);
      web_key = randomCode;
      console.log(`[key] NEW-KEY: ${randomCode}`);
      const apiUrl = `https://link1s.com/api?api=${link_1s}&url=https://hutaomc.fun/?key=${randomCode}`;
      axios.get(apiUrl)
      .then( response => {
        const response_json = response.data;
        if ('shortenedUrl' in response_json) {
          const url_key = response_json['shortenedUrl'];
          console.log(`[key] ${url_key}`);
          link = url_key
          const expirationTime = moment().add(1, 'hour');       

          const currentTime = new Date();
          const nextDay = moment(currentTime).add(1, 'hour');
          const exp = nextDay.format('HH:mm DD/MM/YYYY');
          const data = new sqlite3.Database('data_key.db');
          data.run('INSERT INTO key (id, key, exp) VALUES (?, ?, ?)', [userId, randomCode, expirationTime.unix()], (err) => {
            if (err) {
              return console.error(err.message);
          }
          console.log(`[sqlite] nhập thành công`);
          })
          try {
            const webhook = new WebhookClient({ url: webhookURL });
            const Embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle('Key log')
            .setDescription('Type: GETKEY')
            .addFields({ name: 'BY:', value: `${userId}` })
            .addFields({ name: 'KEY:', value: `${randomCode}` })
            .addFields({ name: 'LINK:', value: `${url_key}` })
            //.setImage(img_url)
            .setTimestamp()
            .setFooter({ text: names, iconURL: `${admin_url}` });
            webhook.send({ embeds: [Embed] });
          } catch (err) {
            console.error(err);
          }
        } else {
          const url_key = "";
          console.log(`[key] err`);
        }
      })
      
      .catch(error => {
        const url_key = "";
        console.error(error);
      });


      await interaction.deferReply({ ephemeral: true });
		  await wait(4000);
      const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle('GET KEY')
      .setDescription('```'+ `ansi
      [ [2;32m[2;36m  KEY ĐÃ ĐƯỢC TẠO[0m[2;32m[0m ]`+ '```')
      .setTimestamp()
      .setFooter({ text: names, iconURL: `${admin_url}` });
      await interaction.editReply({ embeds: [embed] , ephemeral: true });


      const Embed = new EmbedBuilder()
      .setColor(color)
      .setTitle('ẤN VÀO ĐỂ LẤY KEY')
      .setDescription('sau khi lấy thì /key nhập key')
      .addFields({ name: 'chịu khó vược link nha', value: `\n! lưu ý mỗi key chỉ sài đc cho 1 người\nkey chỉ có hạn sử dụng là 1 giờ quá 1 giờ xóa key\nsau khi vược và nhập key thành công thì khi hết plan có thể getkey sài tiếp` })
      .setURL(`${link}`)
      .setTimestamp()
      .setFooter({ text: names, iconURL: `${admin_url}` });
      await interaction.user.send({ embeds: [Embed] });
    }
    });
    }
}