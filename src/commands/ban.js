const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans a user')
        .addUserOption(option => option
			.setName("member")
			.setDescription("The member you want to ban")
			.setRequired(true)
		),
    execute(interaction) {
        const member = interaction.options.getMember("member");
        member.ban().then((member) => interaction.reply(`successfully banned <@${member.id}>, <@${interaction.member.id}>`)).catch((err) => interaction.reply(`<@${interaction.author.id}>, I'm sorry there was an error banning <@${interaction.author.id}>`))
    }
}