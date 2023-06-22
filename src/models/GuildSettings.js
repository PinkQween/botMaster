const mongoose = require('mongoose');

const GuildSettingsSchema = new mongoose.Schema({
	guild_id: String,
	welcome_channel_id: String,
	goodbye_channel_id: String,
	verification_channel_id: String,
	level_up_channel_id: String
});

module.exports = mongoose.model("GuildSettings", GuildSettingsSchema);