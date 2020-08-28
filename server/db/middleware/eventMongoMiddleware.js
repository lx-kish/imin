const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const SALT_I = 10;


module.exports = (schema) => {

    schema.statics.findEvent = function (id, cb) {
        var event = this;

        jwt.verify(token, config.jwtSecret, (err, decode) => {

            if (err) return cb(err);

            user.findOne({ '_id': decode, 'access_token': token }, (err, user) => {
                if (err) return cb(err);
                cb(null, user);
            });
        });
    };

    return schema;
};