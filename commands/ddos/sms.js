const { SlashCommandBuilder, EmbedBuilder, WebhookClient, } = require('discord.js');
const { attack_log } = require('../../config.json');
const webhookURL = attack_log;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    cooldown: 300,
    data: new SlashCommandBuilder()
		.setName('sms')
		.setDescription('spam sms cháy máy đối phương với api siêu mạnh')
        .addStringOption(option => option.setName('phone').setDescription('số đt cần spam').setRequired(true)),
        //.addStringOption(option => option.setName('amount').setDescription('số lần spam').setRequired(true)),
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
                    const sdt = interaction.options.get('phone').value;
                    //const au = interaction.options.get('amount').value;
                    if (sdt === '110'|| sdt === '111'|| sdt === '112'|| sdt === '113'|| sdt === '114'|| sdt === '115'|| sdt === '911') {
                        interaction.editReply('không thể spam sđt này');
                    } else {
                        
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
                        .setDescription('SMS Method')
                        .addFields({ name: '`🧨 Đang spam số:`', value: `\`\`\`css\n[ ${sdt} ]\n\`\`\``, inline: true })
                        .addFields({ name: '`💸 PLAN:`', value: `\`\`\`css\n[ ${row.plan} ]\n\`\`\`` })
                        .setImage(img_url)
                        .setTimestamp()
                        .setFooter({ text: 'Dev by ngọc(ALLEC_VN) xinh gái', iconURL: `${admin_url}` });
                        interaction.user.send({ embeds: [Embed], ephemeral: true });

                        console.log('[sms] đang chạy sms spam');
                        sms_outgiong = sms_outgiong + 1
                        var exec = require('child_process').exec
                        exec(`py sms.py ${sdt} 360`, (error, stdout, stderr) => {  
                            console.log('[sms] đã chạy xong');
                            sms_outgiong = sms_outgiong - 1
                        });
                        /*try {
                            const webhook = new WebhookClient({ url: webhookURL });
                            const Embed = new EmbedBuilder()
                            .setColor(0xFF0000)
                            .setTitle('Attack log')
                            .setDescription('Type: SMS')
                            .addFields({ name: 'BY:', value: `${userId}` })
                            .addFields({ name: 'PHONE:', value: `${sdt}` })
                            //.setImage(img_url)
                            .setTimestamp()
                            .setFooter({ text: 'Dev by ngọc(ALLEC_VN) xinh gái', iconURL: `${admin_url}` });
                            webhook.send({ embeds: [Embed] });
                        } catch (err) {
                            console.error(err);
                        }*/
                    }
                }
            } else {
                interaction.editReply('bạn ko có plan để sử dụng lệnh!');
            }
        });
    }       
}