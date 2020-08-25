const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const SALT_I = 10;


module.exports = (schema) => {

    schema.pre('save', function (next) {
        var user = this;

        console.log(this.collection.find());
        // user.constructor.find( {}, {_id: 1}, (err, data) => {
        //     if(err) return next(err);
        //     console.log('from pre.save ====> ', data);
        // })

        // db.getCollection('test').find().forEach(function (doc) {
        //     db.getCollection('test').remove({ _id : doc._id});
        //     tempId = new NumberLong(doc._id);
        //     doc._id = tempId;
        //     db.getCollection('test').save(doc);
        //     } 
        // );

        if (user.isModified('password')) {
            bcrypt.genSalt(SALT_I, function (err, salt) {
                if (err) return next(err);

                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err) return next(err);

                    user.password = hash;

                    next();
                });
            });
        } else {
            next();
        }
    });

    // schema.post('save', function (next) {
    //     var user = this;
    //     console.log(user);
    //     next();
    // });

    schema.methods.comparePassword = function (candidatePassword, cb) {
        var user = this;
        bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };

    schema.methods.generateToken = function (cb) {
        var user = this;
        var token = jwt.sign(user._id.toHexString(), config.jwt_secret);

        user.access_token = token;
        user.markModified(token);

        user.save(function (err, user) {
            if (err) return cb(err);

            cb(null, user);
        });
        
        // user.update(function (err, user) {
        //     if (err) return cb(err);
        //     console.log(user)
        //     cb(null, user);
        // })
    };

    schema.methods.deleteToken = function (token, cb) {
        var user = this;

        user.constructor.findOneAndUpdate({ _id: user._id },{ $unset: { access_token: 1 } }, {new: true}, (err, user) => {
        // user.updateOne({ $unset: { access_token: 1 } }, (err, user) => {
            // user.update({ $unset: { token: 1 } }, (err, user) => {

            if (err) return cb(err);
            cb(null, user);
        });
    };

    schema.statics.findByToken = function (token, cb) {
        var user = this;

        jwt.verify(token, config.jwt_secret, (err, decode) => {

            if (err) return cb(err);

            user.findOne({ '_id': decode, 'access_token': token }, (err, user) => {
                if (err) return cb(err);
                cb(null, user);
            });
        });
    };

    return schema;
};