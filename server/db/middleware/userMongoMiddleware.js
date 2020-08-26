const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const AppError = require('../../utils/appError');
const SALT_I = 10;


module.exports = (schema) => {

    schema.pre('save', async function (next) {

        const user = this;

        if (!user.isModified('password')) return next();

        const salt = await bcrypt.genSalt(SALT_I);

        if (!salt) return next(new AppError(`Error occured while password incripting`, 400));

        const hash = await bcrypt.hash(user.password, salt);

        if (!hash) return next(new AppError(`Error occured while password incripting`, 400));

        user.password = hash;

        next();
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

    schema.methods.generateToken = async function (next) {
        let user = this;
        const token = jwt.sign(user._id.toHexString(), config.jwt_secret);

        if (!token) return next(new AppError(`Error occured while generating token`, 400));

        user.access_token = token;
        user.markModified(token);

        return await user.save();
    };

    schema.methods.deleteToken = function (token, cb) {
        var user = this;

        user.constructor.findOneAndUpdate({ _id: user._id }, { $unset: { access_token: 1 } }, { new: true }, (err, user) => {
            // user.updateOne({ $unset: { access_token: 1 } }, (err, user) => {
            // user.update({ $unset: { token: 1 } }, (err, user) => {

            if (err) return cb(err);
            cb(null, user);
        });
    };

    schema.statics.findByToken = async function (token) {
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