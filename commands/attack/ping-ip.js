const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
check = ''; 


module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping-ip')
	.setDescription('ping host bằng paping')
	.addStringOption(option => option.setName('ip').setDescription('ip muốn ping').setRequired(true))
    .addIntegerOption(option => option.setName('port').setDescription('port muốn ping').setRequired(true)),
    cooldown: 13,
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true });
        const ip = interaction.options.get('ip').value;
        const port = interaction.options.get('port').value;
        const hostLink = /^(\d{1,3}\.){3}\d{1,3}$/;
        check = '';
        
        
        if (!hostLink.test(ip)) {
            await interaction.editReply({ content: `sai định dạng host, Vd: 10.0.0.6!`, ephemeral: true });
            return;
        } else if (port > 65535) {
            interaction.editReply('port phải dưới 65535');
        } else {
            var exec = require('child_process').exec
            exec(`paping ${ip} -p ${port} -c 10`, (error, stdout, stderr) => {
                console.log(`[ip-ping] đang ping ${ip}:${port}`);
                check = stdout;
            });
            await wait(12000);
            const Embed = new EmbedBuilder()
            .setColor(color)
            .setTitle(namebot)
            .setDescription(`PING IP ${ip}`)
            .addFields({ name: 'Results: ', value: "```" + `${check}` + "```"})
            .setTimestamp()
            .setFooter({ text: names, iconURL: admin_url });
            await interaction.editReply({ embeds: [Embed] });
            
        }
    }
}