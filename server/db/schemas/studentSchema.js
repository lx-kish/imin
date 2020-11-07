module.exports = {
	phone: {
		type: String,
		required: [
			true,
			'Required field missing: PHONE NUMBER'
		]
	},
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
	industries: [String],
	events: [String],
	location: {
		type: String
	}
};