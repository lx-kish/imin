module.exports = {
	email: {
		type: String,
		unique: true,
		required: true
    },
    password: {
		type: String,
		required: true
    },
	access_token: {
		type: String
	}
};