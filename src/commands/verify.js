const { SlashCommandBuilder, permissions } = require('discord.js');
const GuildSettings = require("../models/GuildSettings");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setverificationchannel')
		.setDescription('Sets the verification channel')
		.addChannelOption(option => option
			.setName("channel")
			.setDescription("Sets the channel you want the verification to happen in")
			.setRequired(false)
		),
	async execute(interaction) {
		let goodbyeChannelId;

		// if (!interaction.member.permissions.has('Administrator')) return interaction.reply(`I'm sorry <@${interaction.member.id}> you don't have permissions to set a verification channel`);
		GuildSettings.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.log(err);
				interaction.reply(`I'm sorry <@${interaction.member.id}> there was an error while I was trying to set the goodbye channel`);
				return;
			}

			if (interaction.options.getChannel("channel")) {
				verificationChannelId = interaction.options.getChannel("channel").id;
			} else {
				verificationChannelId = interaction.channel.id;
			}

			if (!settings) {
				settings = new GuildSettings({
					guild_id: interaction.guild.id,
					welcome_channel_id: "",
					goodbye_channel_id: "",
					verification_channel_id: verificationChannelId,
					level_up_channel_id: ""
				});
			} else {
				settings.verification_channel_id = verificationChannelId;
			}

			settings.save(err => {
				if (err) {
					console.log(err);
					interaction.reply(`I'm sorry <@${interaction.member.id}> there was an error while I was trying to set the verification channel`);
					return;
				}
				
				interaction.reply(`Successfully set verification channel <@${interaction.member.id}>!`)
			})
		})
	},
};