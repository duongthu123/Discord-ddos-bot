const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const cpuStat = require('cpu-stat');
const Discord = require("discord.js");

module.exports = {
   
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('trạng thái bot'),
    async execute(interaction, client) {
      await interaction.deferReply();
      user = 0;
      client.guilds.cache.forEach((guild) => {
        user += guild.memberCount;
      });
      const uptime = moment
      .duration(interaction.client.uptime)
      .format(" D [ngày], H [giờ], m [phút], s [giây]");
      const totalMemory = os.totalmem() / 1000;
      const freeMemory = os.freemem() / 1000;
      const usedMemory = totalMemory - freeMemory;
      cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
          return console.log(err);
        }
        const Embed = new EmbedBuilder()
        .setColor(color)
        .setTitle(`\`\`\`🔎Số liệu thống kê của ${client.user.username}\n\`\`\``)
        //.setDescription('Thông tin, trạng thái của bot')
        .addFields(
          {
            name: "**`💻 Máy chủ`**",
            value: `\`\`\`css\n[ ${client.guilds.cache.size} ]\n\`\`\``,
            inline: true,
          },
          {
            name: "**`📁 Kênh`**",
            value: `\`\`\`css\n[ ${client.channels.cache.size} ]\n\`\`\``,
            inline: true,
          },
          {
            name: "**`👪 Thành Viên`**",
            value: `\`\`\`css\n[ ${user} ]\n\`\`\``,
            inline: true,
          },
          )
        .addFields(
          {
            name: "**`⌚️ Thời Gian Hoạt Động`**",
            value: `\`\`\`css\n[ ${uptime} ]\n\`\`\``,
            inline: true,
          },
          {
            name: "**`👾 Discord.js`**",
            value: `\`\`\`css\n[ ${Discord.version} ]\n\`\`\``,
            inline: true,
          },
          {
            name: "**`🔰 NodeJS`**",
            value: `\`\`\`css\n[ ${process.version} ]\n\`\`\``,
            inline: true,
          },
        )
        .addFields(
          {
            name: "**`🏓 Ping`**",
            value: `\`\`\`css\n[ ${client.ws.ping} ms ]\n\`\`\``,
            inline: true,
          },
          {
            name: "**`🤖 CPU Đang Dùng`**",
            value: `\`\`\`css\n[ ${percent.toFixed(2)} % ]\n\`\`\``,
            inline: true,
          },
            {
              name: "**`⏳ RAM`**",
              value: `\`\`\`css\n[ ${(usedMemory / (1024 * 1024)).toFixed(5)} / ${(totalMemory / (1024 * 1024)).toFixed(5)} ]\n\`\`\``,
              inline: true,
            },
        )      
        .addFields({
          name: "**`🤖 CPU`**",
          value: `\`\`\`css\n[ ${os.cpus().map((i) => `${i.model}`)[0]} ]\n\`\`\``,
          inline: true,
        },)
          //.setImage(img_url)
        .setTimestamp()
        .setFooter({ text: 'Dev by ngọc(ALLEC_VN) xinh gái', iconURL: `${admin_url}` });
        return interaction.editReply({ embeds: [Embed] });
    })                  
  }
};