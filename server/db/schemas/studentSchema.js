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
	events: [String]
};