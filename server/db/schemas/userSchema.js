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
	tokenSignIn: {
		type: String
	}
};