const mongoose = require('mongoose');
module.exports = {
	// user_id: {
	// 	type: Number,
	// 	unique: true,
	// 	required: [
	//         true,
	//         'Required field missing: USER_ID'
	//     ],
	// 	default: 1
	// },
	email: {
		type: String,
		unique: true,
		required: [
			true,
			'Required field missing: EMAIL'
		]
	},
	password: {
		type: String,
		required: [
			true,
			'Required field missing: PASSWORD'
		],
		select: false
	},
	passwordConfirm: {
		type: String,
		required: [
			true,
			'Required field missing: PASSWORD CONFIRM'
		],
		validate: {
			// This validator works on CREATE or SAVE only!
			validator: function (el) {
				return el === this.password;
			},
			message: 'Password confirmation should be the same as a password'
		}
	},
	passwordChangedAt: {
		type: Date,
		select: false
	},
	photo: {
		type: String,
		default: 'default.jpg'
	},
	active: {
		type: Boolean,
		default: true,
		select: false
	}
};