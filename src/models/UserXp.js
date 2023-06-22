const mongoose = require('mongoose');
const internal = require('stream');

const UserXpSchema = new mongoose.Schema({
    user_id: String,
	xp: Number,
    levels: Number
});

module.exports = mongoose.model("UserXp", UserXpSchema);