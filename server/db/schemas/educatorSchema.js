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
	profession: {
		type: String
	},
	industries: [String],
	events: [String],
	skills: [String],
	company: {
		type: String,
		required: [
			true,
			'Required field missing: COMPANY NAME'
		]
	},
	website: [String],
	registered: {
		type: Boolean,
		default: false
	},
	approved: {
		type: Boolean,
		default: false
	},
	location: {
		type: String
	}
};