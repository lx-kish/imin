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
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: 'Educator',
        required: [
            true,
            'Required field missing: EVENT CREATOR'
        ],
        // validate: {
        //     validator: function (user) {
        //         // this only points to current doc on NEW document creation and NOT on update!!!
        //         return user.role === 'educator';
        //     },
        //     message: "Creator's role ({VALUE.role}) is not educator. Only educators can create events."
        // }
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
    attendees: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Student',
        }
    ],
    // capacity: {
    //     type: Number,
    //     required: [
    //         true,
    //         'Required field missing: CAPACITY'
    //     ]
    // },
    start: {
        type: Date,
        required: [
            true,
            'Required field missing: START DATE'
        ],
        validate: {
            validator: function (startDate) {
                // this only points to current doc on NEW document creation and NOT on update!!!
                return startDate <= Date.now();
            },
            message: "Event start date ({VALUE}) should be future date. Please, provide the correct start date."
        }
    },
    end: {
        type: Date,
        required: [
            true,
            'Required field missing: END DATE'
        ],
        validate: {
            validator: function (endDate) {
                // this only points to current doc on NEW document creation and NOT on update!!!
                return endDate < this.start;
            },
            message: "Event end date ({VALUE}) can not be earlier than the start date. Please, provide the correct end date."        }
    },
    time: {
        type: String,
        required: [
            true,
            'Required field missing: START TIME'
        ]
    },
    area: {
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
    created: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    approved: {
        type: Boolean,
        default: false
    },
    approvedAt: {
        type: Date
    },
    approver: {
        type: mongoose.Schema.ObjectId,
        ref: 'Admin'
    }
};