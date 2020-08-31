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

    schema.methods.comparePassword = async function (candidatePassword, userPassword) {
        return await bcrypt.compare(candidatePassword, userPassword);
    };

    schema.methods.generateToken = async function (next) {
        let user = this;

        const token = jwt.sign(user._id, config.jwtSecret);

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
    
    schema.methods.changedPasswordAfter = function(JWTTimestamp) {
        if(this.passwordChangedAt) {
            const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    
            return JWTTimestamp < changedTimestamp;
        }
    
        return false;
    };

    schema.statics.findByToken = async function (token) {
        var user = this;

        const decoded = await promisify(jwt.verify)(token, config.jwtSecret);

        console.log(decoded);

        // jwt.verify(token, config.jwtSecret, (err, decode) => {

        //     if (err) return cb(err);

        //     user.findOne({ '_id': decode, 'access_token': token }, (err, user) => {
        //         if (err) return cb(err);
        //         cb(null, user);
        //     });
        // });
    };


    return schema;
};