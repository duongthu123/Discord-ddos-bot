const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
var axios = require("axios");
const { tsr_api_key, tsr_api_setr } = require('../../config.json');
const sqlite3 = require('sqlite3').verbose();
const data = new sqlite3.Database('database.db');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('nap-the')
		.setDescription('nạp tiền vào bot qua thẻ cào')
        .addStringOption(option => option.setName('loai_the').setDescription('loại thẻ nạp vào').setRequired(true).addChoices(
            { name: 'VIETTEL', value: 'viettel' },
            { name: 'VINAPHONE', value: 'vinaphone' },
            { name: 'MOBIFONE', value: 'mobifone' },
            { name: 'VIETNAMOBILE', value: 'vietnamobile' },
            ))
        .addIntegerOption(option => option.setName('menh_gia').setDescription('mệnh giá thẻ').setRequired(true).addChoices(
            { name: '10 000', value: 10000 },
            { name: '20 000', value: 20000 },
            { name: '50 000', value: 50000 },
            { name: '100 000', value: 100000 },
            { name: '200 000', value: 200000 },
            { name: '300 000', value: 300000 },
            { name: '500 000', value: 500000 },
            ))
        .addStringOption(option => option.setName('ma_the').setDescription('mã thẻ').setRequired(true))
        .addStringOption(option => option.setName('so_seri').setDescription('số seri').setRequired(true)),
        async execute(interaction) {
            await interaction.deferReply();
            await wait(1000);
            const loai_the = interaction.options.get('loai_the').value;
            const menh_gia = interaction.options.get('menh_gia').value;
            const ma_the = interaction.options.get('ma_the').value;
            const so_seri = interaction.options.get('so_seri').value;
            const userId = interaction.user.id;

            const Embed = new EmbedBuilder()
            .setColor(color)
            .setTitle(namebot)
            .setDescription('Nạp thành công')
            .addFields({ name: "**`✨ số tiền:`**",value: `\`\`\`css\n[ ${menh_gia} ]\n\`\`\``,inline: false })
            .addFields({ name: "**`✨ loại thẻ:`**",value: `\`\`\`css\n[ ${loai_the} ]\n\`\`\``,inline: false })
            .addFields({ name: "**`✨ mã thẻ:`**",value: `\`\`\`css\n[ ${ma_the} ]\n\`\`\``,inline: false })
            .addFields({ name: "**`✨ số seri:`**",value: `\`\`\`css\n[ ${so_seri} ]\n\`\`\``,inline: false })
            .addFields({ name: "**`✨ trạng thái:`**",value: `\`\`\`css\n[ undefine ]\n\`\`\``,inline: false })
            .setTimestamp()
            .setFooter({ text: 'Dev by ngọc(ALLEC_VN)', iconURL: `${admin_url}` });
            interaction.editReply({ embeds: [Embed] });
            try {
                const webhook = new WebhookClient({ url: webhookURL });
                const Embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('NẠP THẺ LOG')
                //.setDescription('')
                .addFields({ name: 'BY:', value: `${userId}` })
                .addFields({ name: 'LOẠI THẺ:', value: `${loai_the}` })
                .addFields({ name: 'SỐ TIỀN:', value: `${menh_gia}` })
                .addFields({ name: 'MÃ THẺ:', value: `${ma_the}` })
                .addFields({ name: 'SỐ SERI:', value: `${so_seri}` })
                .addFields({ name: 'trạng thái:', value: `` })
                //.setImage(img_url)
                .setTimestamp()
                .setFooter({ text: 'Dev by ngọc(ALLEC_VN) xinh gái', iconURL: `${admin_url}` });
                webhook.send({ embeds: [Embed] });
            } catch (err) {
                console.error(err);
            }
            axios.get(api)
            .then(async (response) => {

            })
           // interaction.editReply('Chưa được tích hợp');
    }
}