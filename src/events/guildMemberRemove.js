const { EmbedBuilder } = require('discord.js');
const GuildSettings = require('../models/GuildSettings');

module.exports = {
	name: "guildMemberRemove",
	async execute(member) {
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
                
        console.log(guildSettings.welcome_channel_id);
    
        member.guild.channels.cache.get(guildSettings.goodbye_channel_id).send({
            embeds: [newMemberEmbed] 
        });
    }
}