const { SlashCommandBuilder, permissions } = require('discord.js');
const GuildSettings = require("../models/GuildSettings");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setwelcomechannel')
		.setDescription('Sets the welcome channel')
		.addChannelOption(option => option
			.setName("channel")
			.setDescription("Sets the channel you want welcome messages to come in from")
			.setRequired(false)
		),
	async execute(interaction) {
		let welcomeChannelId;

		// if (!interaction.member.permissions.has('Administrator')) return interaction.reply(`I'm sorry <@${interaction.member.id}> you don't have permissions to set a welcome channel`);
		GuildSettings.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.log(err);
				interaction.reply(`I'm sorry <@${interaction.member.id}> there was an error while I was trying to set the welcome channel`);
				return;
			}

			if (interaction.options.getChannel("channel")) {
				welcomeChannelId = interaction.options.getChannel("channel").id;
			} else {
				welcomeChannelId = interaction.channel.id;
				console.log(welcomeChannelId);
			}

			if (!settings) {
				settings = new GuildSettings({
					guild_id: interaction.guild.id,
					welcome_channel_id: welcomeChannelId,
					goodbye_channel_id: "",
					verification_channel_id: "",
					level_up_channel_id: ""
				});
			} else {
				settings.welcome_channel_id = welcomeChannelId;
			}

			settings.save(err => {
				if (err) {
					console.log(err);
					interaction.reply(`I'm sorry <@${interaction.member.id}> there was an error while I was trying to set the welcome channel`);
					return;
				}
				
				interaction.reply(`Successfully set welcome channel <@${interaction.member.id}>!`)
			});
		})
	},
};