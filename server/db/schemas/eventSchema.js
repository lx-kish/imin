module.exports = {
    hoster: {
		type: [String],
		required: true
	},
	name: {
		type: String,
		required: true
    },
	industry: {
        type: String,
        required: true
    },
	skill: {
		type: String,
		required: true
    },
    capacity: {
		type: Number,
		required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    time: {
        type: String, 
        required: true
    },
	city: {
        type: String,
        required: true
    },
	address: {
		type: String,
		required: true
	},
	registered: {
		type: Boolean,
		default: false
	},
	approved: {
		type: Boolean,
		default: false
    },
    approver: {
		type: String,
		default: ''
	}
};