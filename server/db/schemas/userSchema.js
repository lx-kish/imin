const mongoose = require('mongoose');
module.exports = {
	user_id: {
		type: Number,
		unique: true,
		required: [
            true,
            'Required field missing: USER_ID'
        ],
		default: 1
	},
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
	access_token: {
		type: String
	},
	select: false
};