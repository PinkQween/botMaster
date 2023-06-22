const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const GuildSettings = require('../models/GuildSettings')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('testuserjoin')
		.setDescription('Tests a user joining')
		.addUserOption(option => option
			.setName("member")
			.setDescription("The member you want to test joining")
			.setRequired(true)
		),
	async execute(interaction) {
		const member = interaction.options.getMember("member");
		const guildSettings = await GuildSettings.findOne({ guild_id: member.guild.id });

		if (!guildSettings && !guildSettings.welcome_channel_id) {
			return;
		}

		const newMemberEmbed = new EmbedBuilder()
			.setColor("#27e1a4")
			.setTitle("Member joined")
			.setDescription(`${member.user} has joined the server`)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp();

		member.guild.channels.cache.get(guildSettings.welcome_channel_id).send({
			embeds: [newMemberEmbed] 
		});
	},
};