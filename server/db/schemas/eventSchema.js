module.exports = {
    hoster: {
		type: [String],
		required: [
            true,
            'Required field missing: EVENT HOSTER'
        ]
	},
	name: {
		type: String,
		required: [
            true,
            'Required field missing: EVENT NAME'
        ]
    },
	industry: {
        type: String,
        required: [
            true,
            'Required field missing: INDUSTRY(ES)'
        ]
    },
	skill: {
		type: String,
		required: [
            true,
            'Required field missing: SKILL(S)'
        ]
    },
    capacity: {
		type: Number,
		required: [
            true,
            'Required field missing: CAPACITY'
        ]
    },
    start: {
        type: Date,
        required: [
            true,
            'Required field missing: START DATE'
        ]
    },
    end: {
        type: Date,
        required: [
            true,
            'Required field missing: END DATE'
        ]
    },
    time: {
        type: String, 
        required: [
            true,
            'Required field missing: START TIME'
        ]
    },
	city: {
        type: String,
        required: [
            true,
            'Required field missing: CITY'
        ]
    },
	address: {
		type: String,
		required: [
            true,
            'Required field missing: ADDRESS'
        ]
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