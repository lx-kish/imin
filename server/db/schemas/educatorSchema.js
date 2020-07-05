module.exports = {
	phone: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	industries: [String],
	events: [String],
	company: {
		type: String,
		required: true
	},
	website: [String],
	registered: {
		type: Boolean,
		default: false
	},
	approved: {
		type: Boolean,
		default: false
	}
};