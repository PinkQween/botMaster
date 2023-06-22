const { EmbedBuilder } = require('discord.js');
const GuildSettings = require('../models/GuildSettings');

module.exports = {
	name: "guildMemberAdd",
	async execute(member) {
        const guildSettings = await GuildSettings.findOne({ guild_id: member.guild.id });

        if (!guildSettings && !guildSettings.goodbye_channel_id) {
                return;
        }
    
        const newMemberEmbed = new EmbedBuilder()
            .setColor("#27e1a4")
            .setTitle("Member joined")
            .setDescription(`${member.user} has joined the server`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp();
                
        console.log(guildSettings.welcome_channel_id);
    
        member.guild.channels.cache.get(guildSettings.welcome_channel_id).send({
            embeds: [newMemberEmbed] 
        });
    }
}