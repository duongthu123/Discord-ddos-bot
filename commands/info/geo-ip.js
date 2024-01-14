const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('geo-ip')
		.setDescription('kiểm tra ip')
        .addStringOption(option => option.setName('ip').setDescription('ip cần kiểm tra').setRequired(true)),
        async execute(interaction) {
            const ip = interaction.options.get('ip').value;
            axios
             .get(`http://ip-api.com/json/${ip}`)
             .then((response)  => {
             const data = response.data;
             
            const Embed = new EmbedBuilder()
            .setColor(color)
            .setTitle(namebot)
            .setDescription(`CHECK IP ${ip}`)
            .addFields({ name: 'Results: ', value: "```" + `${data.query}\n${data.country}\n${data.countryCode}\n${data.regionName}, ${data.region}\nCity: ${data.city}\nISP: ${data.isp}\nOrganization: ${data.org}\nASN: ${data.as}` + "```"})
            .setTimestamp()
            .setFooter({ text: 'Dev by ngọc(ALLEC_VN) xinh gái', iconURL: admin_url });
            interaction.reply({ embeds: [Embed] });
            })
            .catch((error) => {
            console.log(error);
            interaction.reply("lỗi vui lòng xem lại ip");
            });
        }
}