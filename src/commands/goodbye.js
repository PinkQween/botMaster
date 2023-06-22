const { SlashCommandBuilder, permissions } = require('discord.js');
const GuildSettings = require("../models/GuildSettings");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setgoodbyechannel')
		.setDescription('Sets the goodbye channel')
		.addChannelOption(option => option
			.setName("channel")
			.setDescription("Sets the channel you want the goodbye messages to come in from")
			.setRequired(false)
		),
	async execute(interaction) {
		let goodbyeChannelId;

		// if (!interaction.member.permissions.has('Administrator')) return interaction.reply(`I'm sorry <@${interaction.member.id}> you don't have permissions to set a goodbye channel`);
		GuildSettings.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.log(err);
				interaction.reply(`I'm sorry <@${interaction.member.id}> there was an error while I was trying to set the goodbye channel`);
				return;
			}

			if (interaction.options.getChannel("channel")) {
				goodbyeChannelId = interaction.options.getChannel("channel").id;
			} else {
				goodbyeChannelId = interaction.channel.id;
			}

			if (!settings) {
				settings = new GuildSettings({
					guild_id: interaction.guild.id,
					welcome_channel_id: "",
					goodbye_channel_id: goodbyeChannelId,
					verification_channel_id: "",
					level_up_channel_id: ""
				});
			} else {
				settings.goodbye_channel_id = goodbyeChannelId;
			}

			settings.save(err => {
				if (err) {
					console.log(err);
					interaction.reply(`I'm sorry <@${interaction.member.id}> there was an error while I was trying to set the goodbye channel`);
					return;
				}
				
				interaction.reply(`Successfully set goodbye channel <@${interaction.member.id}>!`)
			})
		})
	},
};