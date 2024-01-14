const { Events, ActivityType } = require('discord.js');

let status = [
	{ name: 'Discord.js v14.14.1', type: ActivityType.Competing },
	{ name: 'ASPS CHANNEL' },
	{ name: 'DDoS bot Free',type: ActivityType.Watching },
	{ name: 'SMS SPAMER Free',type: ActivityType.Watching },
	{ name: 'allec_vn',type: ActivityType.Listening },
	{ name: `NCT`,type: ActivityType.Listening },
	
];

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`[bot] chạy thành công`);
        setInterval(() => {
            let random = Math.floor(Math.random() * status.length);
            client.user.setActivity(status[random]);
        }, 5000);
	},
};