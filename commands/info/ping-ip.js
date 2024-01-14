const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
check = '';

module.exports = {
    data: new SlashCommandBuilder()
		.setName('ping-ip')
		.setDescription('ping xem có timeout ko bằng paping')
		.addStringOption(option => option.setName('ip').setDescription('ip muốn ping').setRequired(true))
        .addStringOption(option => option.setName('port').setDescription('port muốn ping').setRequired(true)),
        async execute(interaction) {
            const ip = interaction.options.get('ip').value;
            const port = interaction.options.get('port').value;
            if (port > 65535) {
                interaction.editReply('port phải dưới 65535');
            } else {
                var exec = require('child_process').exec
                exec(`paping ${ip} -p ${port} -c 10`, (error, stdout, stderr) => {
                console.log(`[ip-ping]: đang ping ${ip}:${port}`);
                check = stdout;
            });
                await interaction.deferReply();
                await wait(15000);
                const Embed = new EmbedBuilder()
                .setColor(color)
                .setTitle(namebot)
                .setDescription(`PING IP ${ip}`)
                .addFields({ name: 'Results: ', value: "```" + `${check}` + "```"})
                .setTimestamp()
                .setFooter({ text: 'Dev by ngọc(ALLEC_VN) xinh gái', iconURL: 'https://cdn.discordapp.com/avatars/852068519406731294/6fb01608b607216bf2e6993db6336645.webp?size=100' });
                interaction.editReply({ embeds: [Embed] });
        }
    }
}