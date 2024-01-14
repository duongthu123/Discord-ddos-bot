const { Collection, Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(client, interaction) {
		const { cooldowns } = interaction.client;
		//const client = interaction.client;
		client.cooldowns = new Collection();
        if (!interaction.isChatInputCommand()) return;
	    const command = client.commands.get(interaction.commandName);
	    if (!command) return;
	    //const { cooldowns } = client;
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
			    return interaction.reply({ content: `lệnh \`${command.data.name}\`. có thể sài lại sau <t:${expiredTimestamp}:R>.`, ephemeral: true });
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
    }
};