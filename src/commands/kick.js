const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicks a user')
        .addUserOption(option => option
			.setName("member")
			.setDescription("The member you want to kick")
			.setRequired(true)
		),
    execute(interaction) {
        const member = interaction.options.getMember("member");
        member.kick().then((member) => interaction.reply(`successfully kicked <@${member.id}>, <@${interaction.member.id}>`)).catch((err) => interaction.reply(`<@${interaction.author.id}>, I'm sorry there was an error kicking <@${interaction.author.id}>`))
    }
}