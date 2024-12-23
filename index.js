console.log('')
console.log('\x1b[31m █████╗  ██████╗███████╗██████╗     ██████╗  ██████╗ ████████╗')
console.log('\x1b[31m██╔══██╗██╔════╝██╔════╝██╔══██╗    ██╔══██╗██╔═══██╗╚══██╔══╝')
console.log('\x1b[31m███████║██║     █████╗  ██████╔╝    ██████╔╝██║   ██║   ██║   ')
console.log('\x1b[31m██╔══██║██║     ██╔══╝  ██╔══██╗    ██╔══██╗██║   ██║   ██║   ')
console.log('\x1b[31m██║  ██║╚██████╗███████╗██║  ██║    ██████╔╝╚██████╔╝   ██║   ')
console.log('\x1b[31m╚═╝  ╚═╝ ╚═════╝╚══════╝╚═╝  ╚═╝    ╚═════╝  ╚═════╝    ╚═╝   ')
console.log('\x1b[32m                                      developer by allec_vn')
console.log('\x1b[32m                                              version 2.8.0')
console.log('\x1b[0m[database] database check...')

//img_url = 'https://i.imgur.com/3eQDiB2.png';
img_url = 'https://i.imgur.com/HXVHqpU.png';
admin_url = 'https://avatars.githubusercontent.com/u/147155395?s=400&u=fcc692fc429ed03c77e1b8bca14b354af1ac2f12&v=4';
join = '';
names = 'Dev by @kotomari_vn#0 | @allec_vn#0';
namebot = 'AS CNC';
sms_outgiong = 0;
color = '#FFFFFF';

const sqlite3 = require('sqlite3').verbose();
const moment = require('moment');
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ActivityType, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');
const db = new sqlite3.Database('database.db');
const key = new sqlite3.Database('data_key.db');

const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
	GatewayIntentBits.MessageContent,
] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
client.cooldowns = new Collection();

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	const { cooldowns } = client;
	if (!cooldowns.has(command.data.name)) {
		cooldowns.set(command.data.name, new Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.data.name);
	const defaultCooldownDuration = 3;
	const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;
	if (timestamps.has(interaction.user.id)) {
		const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

		if (now < expirationTime) {
			const expiredTimestamp = Math.round(expirationTime / 1000);
			return interaction.reply({ content: `lệnh \`${command.data.name}\`. có thể sử dụng lại sau <t:${expiredTimestamp}:R>.`, ephemeral: true });
		}
	}
	timestamps.set(interaction.user.id, now);
	setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
	
	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'BOT đang bảo trì phần lệnh!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'BOT đang bảo trì phần lệnh!', ephemeral: true });
		}
	}
});

let activities  = [
	{ name: 'Discord.js v14', type: ActivityType.Competing },
	{ name: 'AS CNC' },
	{ name: 'https://dsc.gg/acerscloud vn',type: ActivityType.Watching },
 	{ name: 'Kotomari_vn',type: ActivityType.Listening },
	{ name: 'allec_vn',type: ActivityType.Listening },
	{ name: `NCT`,type: ActivityType.Listening },
//	{ name: `TOI BAN NCT ĐÂY!`,type: ActivityType.Listening },
//	{ name: `BULU ĐANG COI SẼ TRONG VPS ADMIN!`,type: ActivityType.Listening },
]

const status = [
	'online',
	'dnd',
	'idle',
];

function act(){
	let i = 0;
    setInterval(() => {
	    if(i >= activities.length) i = 0;
	        client.user.setActivity(activities[i]);
	    i++;
    }, 5000);

    let s = 0;
    setInterval(() => {
	    if(s >= activities.length) s = 0;
	        client.user.setStatus(status[s]);
	    s++;
    }, 30000);
}

client.once(Events.ClientReady,async () => {
	setInterval(deleteExpiredUsers, 500);
	setInterval(delete_key, 500);
	console.log('[database] đã kết nối thành công');
	//console.log('[proxy] đang load proxy');
	//setInterval(proxy, 5 * 60 * 60 * 1000);
	//console.log('[proxy] load thành công');
    await command();
	console.log('[bot] đã chạy')
	act();
	/*const channel = client.channels.cache.get('1248119534729171035');
	
	const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle(namebot)
      .setDescription('nhắn .verify để nhận role!')
      .setTimestamp()
      .setFooter({ text: names, iconURL: admin_url });
	 
    channel.send({ embeds: [embed] });*/
});


// database
async function deleteExpiredUsers() {
	const currentTime = moment().unix();
	db.all('SELECT users_id FROM users WHERE expire_time <= ?', [currentTime], (err, rows) => {
		if (err) {
		  throw err;
		}
		rows.forEach(async (row) => {
			const user = row.users_id
			db.run('DELETE FROM users WHERE users_id = ?', [user], (err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`[sqlite] xóa thành công`);
            });
		});
	});
}
async function delete_key() {
	const currentTime = moment().unix();
	key.all('SELECT id FROM key WHERE exp <= ?', [currentTime], (err, rows) => {
		if (err) {
		  throw err;
		}
		rows.forEach(async (row) => {
			const user = row.id
			key.run('DELETE FROM key WHERE id = ?', [user], (err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`[sqlite] xóa thành công`);
            });
		});
	});
}/*
// proxy
async function proxy() {
	console.log('[proxy] đang reload lại proxy');
	var exec = require('child_process').exec
	exec(`py proxy.py`, (error, stdout, stderr) => {  
		console.log('[proxy] đã load xong');
	});
}*/
//commands
async function command() {
	console.log('[commands] đang reload lại commands');
	var exec = require('child_process').exec
	exec(`node commands_load.js`, (error, stdout, stderr) => {  
		console.log('[commands] đã load xong');
	});
}

client.login(token);

client.on('guildMemberAdd', member => {
    const channel = client.channels.cache.get('1187994180765630505');
    if (!channel) return;
	const avatar = member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
	const embed = new EmbedBuilder()
      .setColor(color)
	  .setThumbnail(avatar)
      .setTitle(namebot)
      .setDescription('Chào bạn tới Acer Network!')
	  .addFields({ name: 'Tên:', value: `${member}` })
	  .addFields({ name: 'Msg:', value: `> vào chat để nói chuyện với người khác nha\n> vào #verify để xát thực\n> luật là admin!` })
      .setTimestamp()
	  .setImage(`https://i.pinimg.com/736x/d6/2c/81/d62c81b34399c3ae63622b90fb15f84e.jpg`)
      .setFooter({ text: names, iconURL: admin_url });

    channel.send({ embeds: [embed] });
});

client.on('guildMemberRemove', member => {
    const channel = client.channels.cache.get('1187994180765630505');
    if (!channel) return;
    channel.send(`Bye ${member.user.tag}!`);
});


//client.users.send('1185926728124747859', 'IP: node.hutaomc.fun:3383/ \n username: administrator \n pasword: Huu13120609@');

/*
client.on('guildMemberAdd', member => {
    const channel = client.channels.cache.get('1215186496009666580');
    if (!channel) return;
	const avatar = member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
	const embed = new EmbedBuilder()
      .setColor(color)
	  .setThumbnail(avatar)
      .setTitle(namebot)
      .setDescription('Chào bạn tới Argon Studio!')
	  .addFields({ name: 'Tên:', value: `${member}` })
	  .addFields({ name: 'Msg:', value: `> vào chat để nói chuyện với người khác nha\n> vào #verify để xát thực\n> luật là admin!` })
      .setTimestamp()
	  .setImage(`https://i.pinimg.com/736x/d6/2c/81/d62c81b34399c3ae63622b90fb15f84e.jpg`)
      .setFooter({ text: names, iconURL: admin_url });

    channel.send({ embeds: [embed] });
});

client.on('guildMemberRemove', member => {
    const channel = client.channels.cache.get('1215186496009666580');
    if (!channel) return;
    channel.send(`Bye ${member.user.tag}!`);
});*/ 