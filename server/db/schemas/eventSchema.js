const mongoose = require('mongoose');
module.exports = {
    organizers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Educator',
            required: [
                true,
                'Required field missing: EVENT ORGANIZERS'
            ]
        }
    ],
    name: {
        type: String,
        required: [
            true,
            'Required field missing: EVENT NAME'
        ]
    },
    summary: {
        type: String,
        trim: true,
        required: [
            true,
            'Required field missing: SUMMARY'
        ]
    },
    description: {
        type: String,
        trim: true,
        required: [
            true,
            'Required field missing: DESCRIPTION'
        ]
    },
    industries: [
        {
            type: String,
            required: [
                true,
                'Required field missing: INDUSTRY(ES)'
            ]
        }
    ],
    skills: [
        {
            type: String,
            required: [
                true,
                'Required field missing: SKILL(S)'
            ]
        }
    ],
    attendees: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Student',
        }
    ],
    capacity: {
        type: Number,
        required: [
            true,
            'Required field missing: CAPACITY'
        ]
    },
    startDate: {
        type: Date,
        required: [
            true,
            'Required field missing: START DATE'
        ],
        validate: {
            validator: function (value) {
                // this only points to current doc on NEW document creation and NOT on update!!!
                return value > Date.now();
            },
            message: "Event start date ({VALUE}) should be future date. Please, provide the correct start date."
        }
    },
    endDate: {
        type: Date,
        required: [
            true,
            'Required field missing: END DATE'
        ],
        validate: {
            validator: function (value) {
                // this only points to current doc on NEW document creation and NOT on update!!!
                return value > this.startDate;
            },
            message: "Event end date ({VALUE}) can not be earlier than the start date. Please, provide the correct end date."
        }
    },
    time: {
        type: String,
        required: [
            true,
            'Required field missing: START TIME'
        ]
    },
    area: {
        type: mongoose.Schema.ObjectId,
        ref: 'Area',
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
    photo: {
		type: String,
		default: ''
	},
    // created: {
    //     type: Boolean,
    //     default: false
    // },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'Educator',
        required: [
            true,
            'Required field missing: EVENT CREATOR'
        ]
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    approved: {
        type: Boolean,
        default: false
    },
    approvalDate: {
        type: Date
    },
    approvedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'Admin'
    }
};