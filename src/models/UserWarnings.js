const mongoose = require('mongoose');
const internal = require('stream');

const UserWarningsSchema = new mongoose.Schema({
    user_id: String,
	warnings: Number
});

module.exports = mongoose.model("UserWarnings", UserWarningsSchema);