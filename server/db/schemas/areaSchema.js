module.exports = {
	name: {
		type: String,
		required: [
			true,
			'Required field missing: FIRST NAME'
		]
	},
	location: {
		// GeoJSON
		type: {
			type: String,
		},
		coordinates: [Number],
		address: String,
		description: String
	},
};