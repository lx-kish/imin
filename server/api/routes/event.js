const { Router } = require('express');
const logger = require('../../loaders/logger')();

const eventMiddleware = require('../middleware/events');

const route = Router();

module.exports = function (app) {
    app.use('/event', route);

    route.post(
        '/create',
        eventMiddleware.create,
        (req, res, next) => {
            try {
                logger.info(`Event ${req.event} has been successfully created`);
                // res.cookie('access_token', req.user.access_token, { 'SameSite': 'None' });//, { domain: 'localhost' });
                res.status(200).json({ event: req.event._id, name: req.event.name });

            } catch (e) {
                logger.error('🔥 error %o', e);
                return next(e);
            }
        });

    route.post(
        '/update',
        // eventMiddleware.update,
        (req, res, next) => {
            try {
                logger.info(`User ${req.user._id} has been successfully saved into the db and logged in`);

                // // Set the new style cookie
                // res.cookie('access_token', req.user.access_token, {
                //     // domain: 'http://localhost:3000/signup',
                //     sameSite: 'none',
                //     httpOnly: true,
                //     secure: true
                // });

                // res.status(200).json({ post: true, userId: req.user._id, token: req.user.access_token });

            } catch (e) {
                logger.error('🔥 Error attaching user to req: %o', e);
                return next(e);
            }
        }
    );

    // route.post(
    //     '/signin',
    //     userMiddleware.signIn,
    //     (req, res, next) => {

    //         try {

    //             logger.info(`User ${req.user._id} has been successfully logged in`);
    //             res.status(200).cookie('access_token', req.user.access_token, {
    //                 // domain: 'http://localhost:3000/signup',
    //                 sameSite: 'none',
    //                 httpOnly: true,
    //                 secure: true
    //             }).send('ok');

    //         } catch (e) {
    //             logger.error('🔥 error: %o', e);
    //             return next(e);
    //         }
    //     }
    // );

    // /**
    //  * @TODO Let's leave this as a place holder for now
    //  * The reason for a logout route could be deleting a 'push notification token'
    //  * so the device stops receiving push notifications after logout.
    //  *
    //  * Another use case for advance/enterprise apps, you can store a record of the jwt token
    //  * emitted for the session and add it to a black list.
    //  * It's really annoying to develop that but if you had to, please use Redis as your data store
    //  */
    // route.post(
    //     '/logout',
    //     userMiddleware.isAuth,
    //     userMiddleware.logOut,
    //     (req, res, next) => {
    //         try {
    //             logger.info(`User ${req.user._id} has been successfully logged out`);
    //             res.status(200).cookie('access_token', '', {
    //                 sameSite: 'none',
    //                 httpOnly: true,
    //                 secure: true
    //             }).send('ok');
    //         } catch (e) {
    //             logger.error('🔥 error %o', e);
    //             return next(e);
    //         }
    //     }
    // );

    return app;
};