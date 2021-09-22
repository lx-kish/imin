module.exports = {
	name: {
		type: String,
		required: [
			true,
			'Required field missing: FIRST NAME'
		]
	},
	surname: {
		type: String,
		required: [
			true,
			'Required field missing: LAST NAME'
		]
	},
	phone: {
		type: String,
		required: [
			true,
			'Required field missing: PHONE NUMBER'
		]
	},
};