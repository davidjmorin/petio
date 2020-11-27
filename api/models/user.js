const mongoose = require('mongoose');

const FriendSchema = mongoose.Schema(
	{
		_id: String,
		title: String,
		username: String,
		email: String,
		recommendationsPlaylistId: String,
		thumb: String,
		Server: Array,
	},
	{ collection: 'friends' }
);

module.exports = mongoose.model('Friend', FriendSchema);

// ratingKey