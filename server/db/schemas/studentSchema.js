module.exports = {
	email: {
		type: String,
		unique: true,
		required: true
    },
    password: {
		type: String,
		unique: true,
		required: true
    },
    contactNumber: {
        type: String,
        unique: false,
        required: true
    },
    firstName: {
		type: String,
		unique: false,
		required: true
    },
    lastName: {
		type: String,
		unique: false,
		required: true
	},
	tokenSignIn: {
		type: String,
		unique: true
	}
};