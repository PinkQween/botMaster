const { SlashCommandBuilder, permissions } = require('discord.js');
const GuildSettings = require("../models/GuildSettings");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setlevelupchannel')
		.setDescription('Sets the level up channel')
		.addChannelOption(option => option
			.setName("channel")
			.setDescription("Sets the channel you want the level up messages to come in from")
			.setRequired(false)
		),
	async execute(interaction) {
		let levelUpChannelId;

		// if (!interaction.member.permissions.has('Administrator')) return interaction.reply(`I'm sorry <@${interaction.member.id}> you don't have permissions to set a goodbye channel`);
		GuildSettings.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.log(err);
				interaction.reply(`I'm sorry <@${interaction.member.id}> there was an error while I was trying to set the goodbye channel`);
				return;
			}

			if (interaction.options.getChannel("channel")) {
				levelUpChannelId = interaction.options.getChannel("channel").id;
			} else {
				levelUpChannelId = interaction.channel.id;
			}

			if (!settings) {
				settings = new GuildSettings({
					guild_id: interaction.guild.id,
					welcome_channel_id: "",
					goodbye_channel_id: levelUpChannelId,
					verification_channel_id: "",
					level_up_channel_id: ""
				});
			} else {
				settings.level_up_channel_id = levelUpChannelId;
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