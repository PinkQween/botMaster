const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const GuildSettings = require('../models/GuildSettings')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('testuserleave')
		.setDescription('Tests a user leaving')
		.addUserOption(option => option
			.setName("member")
			.setDescription("The member you want to test leaving")
			.setRequired(true)
		),
	async execute(interaction) {
		const member = interaction.options.getMember("member");
		const guildSettings = await GuildSettings.findOne({ guild_id: member.guild.id });

		if (!guildSettings && !guildSettings.goodbye_channel_id) {
			return;
		}

		const newMemberEmbed = new EmbedBuilder()
			.setColor("#d81e5b")
			.setTitle("Member left")
			.setDescription(`${member.user} has left the server`)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp();

		member.guild.channels.cache.get(guildSettings.goodbye_channel_id).send({
			embeds: [newMemberEmbed] 
		});
	},
};