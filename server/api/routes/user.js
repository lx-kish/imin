const router = require('express').Router();

const logger = require('../../loaders/logger')();
const authController = require('../controllers/authController');

module.exports = function (app) {

    app.use('/users', router);

    router.get('/auth', authController.isAuth);

    router.post('/signup', authController.signUp);//,

    router.post(
        '/signin',
        authController.signIn,
        (req, res, next) => {

            try {

                logger.info(`User ${req.user._id} has been successfully logged in`);
                res.status(200).cookie('access_token', req.user.access_token, {
                    // domain: 'http://localhost:3000/signup',
                    sameSite: 'none',
                    httpOnly: true,
                    secure: true
                }).send('ok');

            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        }
    );

    /**
     * @TODO Let's leave this as a place holder for now
     * The reason for a logout route could be deleting a 'push notification token'
     * so the device stops receiving push notifications after logout.
     *
     * Another use case for advance/enterprise apps, you can store a record of the jwt token
     * emitted for the session and add it to a black list.
     * It's really annoying to develop that but if you had to, please use Redis as your data store
     */
    router.post(
        '/logout',
        authController.isAuth,
        authController.logOut//,
        // (req, res, next) => {
        //     try {
        //         logger.info(`User ${req.user._id} has been successfully logged out`);
        //         res.status(200).cookie('access_token', '', {
        //             sameSite: 'none',
        //             httpOnly: true,
        //             secure: true
        //         }).send('ok');
        //     } catch (e) {
        //         logger.error('🔥 error %o', e);
        //         return next(e);
        //     }
        // }
    );

    return app;
};