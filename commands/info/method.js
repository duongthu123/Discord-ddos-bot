const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
		.setName('methods')
		.setDescription('xem method ddos'),
        async execute(interaction) {
            const Embed = new EmbedBuilder()
            .setColor(color)
            .setTitle(namebot)
            .setDescription('HELP METHODS')
            .addFields({ name: 'Layer 4:', value: 'TCP: ddos tcp khoản 20gbps tối đa\nUDP: ddos udp nhưng cao hơn là 80gbps tối đa' })
            .addFields({ name: 'Layer 7:', value: 'CF-TLS: ddos cloudflare tls\nTLS: ddos tls thông thường\n FLOODER: flood ddos\nHTTPS: https ddos\nUPDATE...' })
            .setTimestamp()
            .setFooter({ text: 'Dev by ngọc(ALLEC_VN) xinh gái', iconURL: `${admin_url}` });
            interaction.reply({ embeds: [Embed] });
    }
}