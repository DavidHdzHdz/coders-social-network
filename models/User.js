const mongoose = require('mongoose');
// User schema - it do not need validations because endpoints will use express-validator
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});
// User model
const User = mongoose.model('User', userSchema);

module.exports = User;
