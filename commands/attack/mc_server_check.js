const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const axios = require('axios');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('mc-server-check-java')
	.setDescription('check server minecraft chỉ dành cho server pc(java)')
	//.addStringOption(option => option.setName('ip').setDescription('ip muốn ping').setRequired(true))
    .addStringOption(option => option.setName('host').setDescription('host để check').setRequired(true)),
    //.addIntegerOption(option => option.setName('port').setDescription('port để check').setRequired(false)),
    cooldown: 15,
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true });
        await wait(2000);
        const ip = interaction.options.get('host').value;
        //const port = interaction.options.getInterger('port') ?? 25565;
        const hostLink = /^(\d{1,3}\.){3}\d{1,3}$/;
       /* if (!hostLink.test(ip)) {
            await interaction.editReply({ content: `sai định dạng host, Vd: 10.0.0.6!`, ephemeral: true });
            return;
        } else if {*/
            axios.get(`https://api.mcsrvstat.us/3/${ip}`).then( async(response)  => {
                const data = response.data;
                if (data.online === false) {
                    const Embed = new EmbedBuilder()
                    .setColor(color)
                    .setTitle(namebot)
                    .setThumbnail(`https://api.mcsrvstat.us/icon/${ip}`)
                    .setDescription(`CHECK HOST ${ip}`)
                    .addFields({ name: 'IP: ', value: "`" + `${data.ip}` + "`", inline: true })
                    .addFields({ name: 'PORT: ', value: "`" + `${data.port}`+ "`" , inline: true })
                    .addFields({ name: 'VERSION: ', value: "`" +`offline | offline`  + "`"})
                    .addFields({ name: 'SOFTWARE: ', value:"`" + `offline`+ "`", inline: true })
                    .addFields({ name: 'STATUS PLAYER: ', value:"`" + `0 / 0`+ "`"})
                    .setImage(`http://status.mclive.eu/${data.ip}/${data.ip}/${data.port}/banner.png`)
                    .setTimestamp()
                    .setFooter({ text: names, iconURL: admin_url });
                    interaction.editReply({ embeds: [Embed] });
                } else {
                    const Embed = new EmbedBuilder()
                    .setColor(color)
                    .setTitle(namebot)
                    .setThumbnail(`https://api.mcsrvstat.us/icon/${ip}`)
                    .setDescription(`CHECK HOST ${ip}`)
                    .addFields({ name: 'IP: ', value: "`" + `${data.ip}` + "`", inline: true })
                    .addFields({ name: 'PORT: ', value: "`" + `${data.port}`+ "`" , inline: true })
                    .addFields({ name: 'VERSION: ', value: "`" +`${data.protocol.name} | ${data.protocol.version}`  + "`"})
                    .addFields({ name: 'SOFTWARE: ', value:"`" + `${data.software}`+ "`", inline: true })
                    .addFields({ name: 'STATUS PLAYER: ', value:"`" + `${data.players.online} / ${data.players.max}`+ "`"})
                    .addFields({ name: 'MOTD: ', value:"```" + `${data.motd.clean}`+ "```"})
                    .setImage(`http://status.mclive.eu/${data.ip}/${data.ip}/${data.port}/banner.png`)
                    .setTimestamp()
                    .setFooter({ text: names, iconURL: admin_url });
                    interaction.editReply({ embeds: [Embed] });
                    
                }

            }).catch((error) => {
                console.log(error);
                interaction.editReply("lỗi vui lòng xem lại host có bị tắt ko");
            });
        //}
    }
}